# Admin Authentication Setup

This document explains how the admin-only authentication system works in BEUexamprep.

## Overview

**Only administrators can sign in** to the BEUexamprep platform. There is no regular user authentication - this is an admin-only system for managing educational content.

## Features

- **Admin-Only Access**: Only accounts in the `Admin` table can sign in
- **Secret Code Protection**: Creating admin accounts requires a secret code
- **Secure Authentication**: JWT-based authentication with 7-day token expiration
- **Protected Routes**: Dashboard and upload functionality restricted to authenticated admins

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/beuexamprep"

# JWT Secret (use a strong random string in production)
JWT_SECRET="your-secure-jwt-secret-key"

# Admin Secret Code (required to create admin accounts)
ADMIN_SECRET_CODE="BEU2024ADMIN"

# Cloudinary for file uploads
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## Creating the First Admin Account

### Method 1: Using the Signup Page (Recommended)

1. Navigate to `/signup` in your browser
2. Fill in the form:
   - **Name**: Your name
   - **Email**: Your email address
   - **Password**: At least 6 characters
   - **Admin Secret Code**: The code from `ADMIN_SECRET_CODE` env variable (default: `BEU2024ADMIN`)
3. Click "Create Admin Account"
4. After successful creation, navigate to `/signin` to log in

### Method 2: Using the create-admin.js Script

Run the script directly:

```bash
node scripts/create-admin.js
```

Follow the prompts to enter:
- Name
- Email
- Password

The script will create the admin account directly in the database.

## Signing In

1. Navigate to `/signin`
2. Enter your admin email and password
3. Click "Admin Sign In"
4. You'll be redirected to `/dashboard` upon successful authentication

## Authentication Flow

### Sign Up (`/api/auth/signup`)
1. Validates all required fields (name, email, password, secretCode)
2. Verifies the secret code matches `ADMIN_SECRET_CODE`
3. Checks if email already exists
4. Hashes password with bcrypt
5. Creates admin account in database
6. Returns success message

### Sign In (`/api/auth/signin`)
1. Validates email and password
2. Checks if admin exists in `Admin` table only
3. Verifies password with bcrypt
4. Creates JWT token with admin data (id, email, name)
5. Returns token and admin info
6. Token is stored in localStorage and cookies

### Protected Routes
All admin API routes (`/api/admin/*`) require:
- Valid JWT token in Authorization header or cookie
- Token verification using `verifyAuth()` helper
- Returns 401 Unauthorized if not authenticated

## Security Features

1. **Password Hashing**: All passwords are hashed with bcrypt (10 rounds)
2. **JWT Tokens**: Signed with secret key, expire after 7 days
3. **Secret Code**: Prevents unauthorized admin account creation
4. **Email Validation**: Enforced on signup
5. **Duplicate Prevention**: Cannot create multiple admins with same email
6. **Token Verification**: All protected routes verify JWT validity

## Middleware Protection

The middleware (`middleware.ts`) automatically:
- Redirects unauthenticated users from `/dashboard` to `/signin`
- Redirects authenticated users from `/signin` to `/dashboard`
- Allows public access to root pages
- Bypasses API routes (handled by route-level auth)

## Admin Dashboard Features

Once authenticated, admins can:
- Upload study materials (PDFs, DOC, DOCX, TXT)
- View upload statistics by branch and semester
- See recent uploads
- Manage educational content

## Troubleshooting

### "Admin not found" Error
- Make sure you're using an email that exists in the Admin table
- Regular users cannot sign in - this is admin-only

### "Invalid secret code" Error
- Check that `ADMIN_SECRET_CODE` in `.env` matches what you're entering
- Default code is `BEU2024ADMIN`

### Token Expired
- Tokens expire after 7 days
- Simply sign in again to get a new token

### Cannot Access Dashboard
- Ensure you're signed in
- Check browser console for token errors
- Try clearing localStorage and signing in again

## Database Schema

The Admin model:
```prisma
model Admin {
  id        String   @id @default(uuid())
  name      String?
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create admin account (requires secret code)
- `POST /api/auth/signin` - Admin sign in
- `POST /api/auth/logout` - Sign out

### Protected Admin Routes (require authentication)
- `GET /api/admin/dashboard` - Get dashboard statistics
- `POST /api/admin/uploads` - Upload new file
- `GET /api/admin/uploads` - List uploads with pagination
- `DELETE /api/admin/uploads?id=<id>` - Delete upload

### Public Routes
- `GET /api/files` - Get files (filtered by branch, semester, subject)

## Best Practices

1. **Change Default Secret Code**: Update `ADMIN_SECRET_CODE` in production
2. **Use Strong JWT Secret**: Generate a random string for `JWT_SECRET`
3. **Secure Environment Variables**: Never commit `.env` file to git
4. **Regular Password Changes**: Encourage admins to use strong passwords
5. **Monitor Access**: Check admin creation logs regularly
