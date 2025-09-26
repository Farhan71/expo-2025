# ⚠️ IMPORTANT: Serverless Deployment Limitation

## Current Status: Demo Mode

Your website is deployed on Vercel (serverless), which means:

- ✅ **Website works perfectly** - All public pages are fully functional
- ✅ **Admin interface works** - You can edit, create, delete services
- ⚠️ **Changes are temporary** - Edits reset when the server restarts

## Why This Happens:

Vercel is a **serverless platform** where:

- Files are read-only in production
- No persistent file system for writing data
- Perfect for static sites and APIs, but not for file-based databases

## Solutions for Persistent Data:

### Option 1: Add Database (Recommended for Production)

- **Vercel Postgres** (free tier available)
- **PlanetScale** (free MySQL)
- **Supabase** (free PostgreSQL)

### Option 2: Use Vercel KV Storage

- Key-value storage specifically for Vercel
- Small free tier available

### Option 3: Use External File Storage

- **AWS S3** with API
- **Google Drive API**
- **GitHub as database**

## For Now:

The client can use the admin interface to **preview** how content management works. When they're ready for production with persistent data, we can implement one of the above solutions.

## Demo URLs:

- **Website**: https://expo-2025-iota.vercel.app
- **Admin**: https://expo-2025-iota.vercel.app/admin
- **Password**: `expo2025admin123`

The admin interface demonstrates all functionality - it just doesn't persist between server restarts.
