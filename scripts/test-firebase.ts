/**
 * Simple Firebase Connection Test
 * This script tests basic Firebase connectivity
 */

import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase/config';

async function testFirebaseConnection() {
  try {
    console.log('Testing Firebase connection...');

    // Test 1: Try to add a simple document
    console.log('Test 1: Adding a simple test document...');
    const testRef = collection(db, 'test');
    const testDoc = await addDoc(testRef, {
      message: 'Hello Firebase!',
      timestamp: new Date(),
      number: 42,
      boolean: true,
    });
    console.log('✅ Test document added with ID:', testDoc.id);

    // Test 2: Try to read documents
    console.log('Test 2: Reading test collection...');
    const snapshot = await getDocs(testRef);
    console.log('✅ Found', snapshot.size, 'documents in test collection');

    console.log('🎉 Firebase connection successful!');
    console.log('Your Firebase configuration is working correctly.');
  } catch (error: any) {
    console.error('❌ Firebase connection failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);

    if (error.code === 'permission-denied') {
      console.log('💡 This might be due to Firestore security rules.');
      console.log(
        'Make sure your Firestore is in test mode or rules allow writes.'
      );
    }

    process.exit(1);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testFirebaseConnection();
}

export default testFirebaseConnection;
