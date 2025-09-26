import {
  sendContactConfirmationEmail,
  sendContactFormEmail,
} from '@/lib/email/sendEmail';
import { ContactFormSchema } from '@/lib/services/services.schema';
import {
  checkRateLimit,
  validateContactForm,
} from '@/lib/validation/formGuards';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limiting (5 requests per 15 minutes per IP)
    const rateLimitResult = checkRateLimit(clientIP, 5, 15 * 60 * 1000);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: rateLimitResult.resetTime,
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Basic validation with our custom validator
    const validation = validateContactForm(body);

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Additional Zod validation
    try {
      ContactFormSchema.parse(body);
    } catch (zodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details:
            zodError instanceof Error ? zodError.message : 'Validation error',
        },
        { status: 400 }
      );
    }

    // Extract form data
    const { name, email, phone, service, message } = body;

    // Send email to company
    const emailResult = await sendContactFormEmail({
      name,
      email,
      phone,
      service,
      message,
    });

    if (!emailResult.success) {
      console.error('Failed to send contact email:', emailResult.error);
      // Don't expose internal errors to client
      return NextResponse.json(
        {
          success: false,
          error:
            'Failed to send message. Please try again or contact us directly.',
        },
        { status: 500 }
      );
    }

    // Send confirmation email to customer (optional - don't fail if this fails)
    try {
      await sendContactConfirmationEmail({
        name,
        email,
        phone,
        service,
        message,
      });
    } catch (confirmationError) {
      // Log but don't fail the main request
      console.warn('Failed to send confirmation email:', confirmationError);
    }

    // Log successful contact (for analytics/monitoring)
    console.log('Contact form submission:', {
      name,
      email: email.replace(/(.{2}).*(@.*)/, '$1***$2'), // Partial email for privacy
      service: service || 'General inquiry',
      timestamp: new Date().toISOString(),
      ip: clientIP,
    });

    return NextResponse.json({
      success: true,
      message:
        "Message sent successfully! We'll get back to you within 24 hours.",
    });
  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
