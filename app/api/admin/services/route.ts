import {
  createService,
  getAllServices,
} from '@/lib/services/services.fileStorage.vercel';
import { ServiceCreateSchema } from '@/lib/services/services.schema';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Check admin authentication
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('admin-auth');
  return adminAuth?.value === 'authenticated';
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate the request body
    const validatedData = ServiceCreateSchema.parse(body);

    // Create the service using file storage
    const newService = await createService(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: 'Service created successfully',
        service: newService,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating service:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle duplicate slug error
    if (error.message === 'Service with this slug already exists') {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all services from file storage
    const services = await getAllServices();

    return NextResponse.json({
      success: true,
      services,
    });
  } catch (error: any) {
    console.error('Error fetching services:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
