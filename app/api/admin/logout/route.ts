import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
  // Clear the admin authentication cookie
  const cookieStore = await cookies();
  cookieStore.delete('admin-auth');

  // Redirect to admin login page
  redirect('/admin');
}
