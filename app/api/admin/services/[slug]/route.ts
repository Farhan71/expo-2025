import {
  deleteService,
  updateService,
} from '@/lib/services/services.fileStorage.vercel';
import { ServiceUpdateSchema } from '@/lib/services/services.schema';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Check admin authentication
async function checkAdminAuth() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('admin-auth');
  return adminAuth?.value === 'authenticated';
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = params.slug;
    const body = await request.json();

    // Validate the request body
    const validatedData = ServiceUpdateSchema.parse(body);

    // Update the service using file storage
    const updatedService = await updateService(slug, validatedData);

    return NextResponse.json({
      success: true,
      message: 'Service updated successfully',
      service: updatedService,
    });
  } catch (error: any) {
    console.error('Error updating service:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle service not found error
    if (error.message === 'Service not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // Check authentication
    if (!(await checkAdminAuth())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const slug = params.slug;

    // Delete the service using file storage
    await deleteService(slug);

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting service:', error);

    // Handle service not found error
    if (error.message === 'Service not found') {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
