# 🔧 Firebase Connection Troubleshooting

## Issue Identified

You're getting "Invalid resource field value in the request" error, which typically means there's a mismatch between your Firebase configuration and the actual Firebase project.

## Quick Fix Steps

### Step 1: Verify Project ID

From your screenshot, your Firebase project is named `expo-services-2025`. But sometimes the **Project ID** is different from the **Project Name**.

1. Go to your Firebase Console: https://console.firebase.google.com/project/expo-services-2025/settings/general
2. Look for **Project ID** (not Project Name)
3. Copy the exact **Project ID** value

### Step 2: Double-Check Firebase Config

In your Firebase Console:

1. Go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click on your web app
4. Copy the **exact config object**

It should look like:

```javascript
const firebaseConfig = {
  apiKey: 'AIzaSyD...',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-exact-project-id',
  storageBucket: 'your-project-id.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:abcdef',
};
```

### Step 3: Update Your .env.local

Replace your current Firebase config in `.env.local` with the **exact values** from Step 2:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_exact_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_exact_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_exact_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_exact_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_exact_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_exact_app_id
```

### Step 4: Verify Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Make sure it says **"Native mode"** (not Datastore mode)
3. Verify the database is in **test mode** (rules allow read/write)

### Step 5: Test Again

```bash
npm run test-firebase
```

## Common Issues:

1. **Project ID Mismatch**: Project name vs Project ID are different
2. **Wrong Storage Bucket**: Should end with `.appspot.com`
3. **Datastore Mode**: Make sure you created Firestore in Native mode
4. **Wrong Region**: Database created in different region than expected

## If Still Not Working:

1. **Delete and recreate** the Firestore database in Native mode
2. **Create a new Firebase project** with a simpler name like `expo-services`
3. **Check Firestore Rules** - make sure they allow writes:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

The most common fix is **Step 1-3** - making sure the Project ID is exactly correct!
