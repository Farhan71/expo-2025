// Email sending utility - stub implementation
// In production, replace with actual email service (Resend, Postmark, etc.)

export interface EmailData {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function sendEmail(
  emailData: EmailData
): Promise<{ success: boolean; error?: string }> {
  try {
    // If Resend is configured in production, use it
    if (process.env.RESEND_API_KEY && process.env.NODE_ENV === 'production') {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const result = await resend.emails.send({
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
      });

      console.log('Email sent successfully via Resend:', result.data?.id);
      return { success: true };
    }

    // STUB: Log email data in development
    console.log('📧 Email would be sent (development mode):', {
      to: emailData.to,
      from: emailData.from,
      subject: emailData.subject,
      preview:
        emailData.text?.substring(0, 100) + '...' ||
        emailData.html.substring(0, 100) + '...',
    });

    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 100));

    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function sendContactFormEmail(
  data: ContactEmailData
): Promise<{ success: boolean; error?: string }> {
  const emailHtml = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: #2563eb; margin: 0;">New Contact Form Submission</h1>
        <p style="color: #64748b; margin: 5px 0 0 0;">From EXPO 2025 Construction website</p>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h2 style="color: #0f172a; margin-top: 0;">Contact Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 120px;">Name:</td>
            <td style="padding: 8px 0; color: #0f172a;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0; color: #0f172a;">
              <a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a>
            </td>
          </tr>
          ${
            data.phone
              ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0; color: #0f172a;">
              <a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a>
            </td>
          </tr>
          `
              : ''
          }
          ${
            data.service
              ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Service:</td>
            <td style="padding: 8px 0; color: #0f172a;">${data.service}</td>
          </tr>
          `
              : ''
          }
        </table>
        
        <h3 style="color: #0f172a; margin-top: 20px; margin-bottom: 10px;">Message</h3>
        <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
          <p style="margin: 0; color: #0f172a; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #64748b; font-size: 14px;">
          This email was sent from the EXPO 2025 Construction contact form.
        </p>
      </div>
    </div>
  `;

  const emailText = `
New Contact Form Submission - EXPO 2025 Construction

Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.service ? `Service: ${data.service}` : ''}

Message:
${data.message}

---
This email was sent from the EXPO 2025 Construction contact form.
  `;

  return sendEmail({
    to: process.env.EMAIL_TO || 'info@expo2025construction.com',
    from: process.env.EMAIL_FROM || 'noreply@expo2025construction.com',
    subject: `New Contact Form - ${data.name} ${data.service ? `(${data.service})` : ''}`,
    html: emailHtml,
    text: emailText,
  });
}

// Auto-reply email to the customer
export async function sendContactConfirmationEmail(
  data: ContactEmailData
): Promise<{ success: boolean; error?: string }> {
  const emailHtml = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <div style="background: #2563eb; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Thank You for Contacting Us!</h1>
        <p style="color: #bfdbfe; margin: 5px 0 0 0;">EXPO 2025 Construction Inc</p>
      </div>
      
      <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h2 style="color: #0f172a; margin-top: 0;">Hi ${data.name},</h2>
        <p style="color: #374151; line-height: 1.6;">
          Thank you for reaching out to EXPO 2025 Construction Inc! We've received your message and will get back to you within 24 hours.
        </p>
        
        <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #0f172a; margin-top: 0; margin-bottom: 10px;">Your Message</h3>
          <p style="color: #64748b; margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <p style="color: #374151; line-height: 1.6;">
          In the meantime, feel free to call us directly for urgent matters:
        </p>
        
        <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0; color: #0f172a;">
            <strong>Nouros:</strong> <a href="tel:3474209759" style="color: #2563eb;">(347) 420-9759</a><br>
            <strong>Hossain:</strong> <a href="tel:7188256465" style="color: #2563eb;">(718) 825-6465</a>
          </p>
        </div>
        
        <p style="color: #374151; line-height: 1.6;">
          We look forward to working with you!
        </p>
        
        <p style="color: #374151; line-height: 1.6;">
          Best regards,<br>
          <strong>The EXPO 2025 Construction Team</strong>
        </p>
      </div>
    </div>
  `;

  const emailText = `
Thank You for Contacting EXPO 2025 Construction Inc!

Hi ${data.name},

Thank you for reaching out to EXPO 2025 Construction Inc! We've received your message and will get back to you within 24 hours.

Your Message:
${data.message}

In the meantime, feel free to call us directly for urgent matters:
Nouros: (347) 420-9759
Hossain: (718) 825-6465

We look forward to working with you!

Best regards,
The EXPO 2025 Construction Team
  `;

  return sendEmail({
    to: data.email,
    from: process.env.EMAIL_FROM || 'noreply@expo2025construction.com',
    subject: 'Thank you for contacting EXPO 2025 Construction Inc',
    html: emailHtml,
    text: emailText,
  });
}
