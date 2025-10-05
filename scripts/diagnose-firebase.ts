/**
 * Detailed Firebase Diagnostic Script
 * This script performs comprehensive Firebase connectivity tests
 */

import { db } from '../lib/firebase/config';

async function diagnosticFirebase() {
  try {
    console.log('🔍 Starting comprehensive Firebase diagnostics...\n');

    // Test 1: Check Firebase configuration
    console.log('Test 1: Firebase Configuration');
    console.log(
      'API Key:',
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing'
    );
    console.log(
      'Auth Domain:',
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing'
    );
    console.log(
      'Project ID:',
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing'
    );
    console.log(
      'Storage Bucket:',
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing'
    );
    console.log(
      'App ID:',
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅ Set' : '❌ Missing'
    );
    console.log('');

    // Test 2: Check database object
    console.log('Test 2: Database Object');
    console.log('Database object exists:', db ? '✅ Yes' : '❌ No');
    console.log('Database app:', db?.app ? '✅ Connected' : '❌ Not connected');
    console.log('');

    // Test 3: Basic environment check
    console.log('Test 3: Environment Variables');
    console.log(
      'Project ID value:',
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    );
    console.log(
      'Auth Domain value:',
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    );
    console.log(
      'Storage Bucket value:',
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    );

    // Test 4: Try a simple document reference (without writing)
    console.log('');
    console.log('Test 4: Document Reference Test');
    const { doc } = await import('firebase/firestore');

    try {
      const docRef = doc(db, 'test', 'test-doc');
      console.log('✅ Document reference created:', docRef.id);
    } catch (error: any) {
      console.log('❌ Document reference failed:', error.message);
    }

    // Test 5: Collection reference test
    console.log('');
    console.log('Test 5: Collection Reference Test');
    const { collection } = await import('firebase/firestore');

    try {
      const colRef = collection(db, 'test');
      console.log('✅ Collection reference created');
    } catch (error: any) {
      console.log('❌ Collection reference failed:', error.message);
    }
  } catch (error: any) {
    console.error('❌ Diagnostic failed:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack?.split('\n')[0],
    });
  }
}

// Run diagnostic if this file is executed directly
if (require.main === module) {
  diagnosticFirebase();
}

export default diagnosticFirebase;
