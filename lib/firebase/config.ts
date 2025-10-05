// Load environment variables for Node.js scripts
if (typeof window === 'undefined') {
  require('dotenv').config({ path: '.env.local' });
}

// Firebase configuration for Expo Services
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Debug Firebase configuration
console.log('🔥 Firebase Configuration Status:');
console.log('- API Key:', firebaseConfig.apiKey ? '✅ Present' : '❌ Missing');
console.log(
  '- Auth Domain:',
  firebaseConfig.authDomain ? '✅ Present' : '❌ Missing'
);
console.log(
  '- Project ID:',
  firebaseConfig.projectId ? '✅ Present' : '❌ Missing'
);
console.log(
  '- Storage Bucket:',
  firebaseConfig.storageBucket ? '✅ Present' : '❌ Missing'
);
console.log(
  '- Messaging Sender ID:',
  firebaseConfig.messagingSenderId ? '✅ Present' : '❌ Missing'
);
console.log('- App ID:', firebaseConfig.appId ? '✅ Present' : '❌ Missing');

// Check if all required config values are present
const missingConfig = Object.entries(firebaseConfig).filter(
  ([key, value]) => !value
);
if (missingConfig.length > 0) {
  console.error(
    '❌ Missing Firebase configuration:',
    missingConfig.map(([key]) => key)
  );
  throw new Error(
    'Firebase configuration is incomplete. Missing: ' +
      missingConfig.map(([key]) => key).join(', ')
  );
}

// Initialize Firebase
let app: any;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized successfully');
  } else {
    app = getApps()[0];
    console.log('✅ Firebase app already exists, reusing');
  }
} catch (error) {
  console.error('❌ Failed to initialize Firebase app:', error);
  throw error;
}

// Initialize Firestore
let db: any;
try {
  db = getFirestore(app);
  console.log('✅ Firestore initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Firestore:', error);
  throw error;
}

export { db };
export default app;
