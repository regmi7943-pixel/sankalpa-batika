# Sankalpa Batika School Website

A modern, full-stack school website built with Next.js 14+, Firebase, and Cloudinary.

## Features

- **Public Portal**: Home, About, Admissions, Notices, Events, Gallery, Contact.
- **Admin Dashboard**: Secure management of notices, events, and gallery items.
- **Authentication**: Single super-admin access via Firebase Auth.
- **CMS**: Real-time content updates using Firebase Realtime Database.
- **Media**: Image and PDF uploads via Cloudinary.
- **SEO**: Dynamic metadata, sitemap, and robots.txt.

## Tech Stack

- **Framework**: Next.js 14 (App Router, Server Actions)
- **Styling**: Tailwind CSS
- **Database**: Firebase Realtime Database
- **Auth**: Firebase Authentication (Client/Server)
- **Storage**: Cloudinary

## Prerequisites

1.  **Node.js** (v18+)
2.  **Firebase Project**: Create a project at [console.firebase.google.com](https://console.firebase.google.com).
3.  **Cloudinary Account**: Create an account at [cloudinary.com](https://cloudinary.com).

## Setup Instructions

1.  **Environment Variables**:
    - Rename `env-example.txt` to `.env.local`.
    - Fill in the values:
        - `NEXT_PUBLIC_ADMIN_EMAIL`: The email address you will use to login as admin.
        - `NEXT_PUBLIC_FIREBASE_*`: Your Firebase Web App configuration.
        - `FIREBASE_SERVICE_ACCOUNT_KEY`: Generate a private key in Project Settings > Service Accounts, download the JSON, remove newlines (minify it), and paste it as a string.
        - `NEXT_PUBLIC_CLOUDINARY_*` & `CLOUDINARY_*`: API credentials from Cloudinary Dashboard.

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000`.

## Admin Access

1.  Go to `/login` (or `/admin`, which redirects to login).
2.  Log in using **any** authentication method you enabled in Firebase (e.g., Email/Password).
3.  **IMPORTANT**: The email you use to log in MUST match the `NEXT_PUBLIC_ADMIN_EMAIL` set in `.env.local`. If they don't match, you will be denied access.

## Deployment

-   **Vercel**: Recommended. Connect your GitHub repository and add the environment variables in Vercel settings.
-   **Security Rules**: In Firebase Realtime Database Rules, set:
    ```json
    {
      "rules": {
        ".read": true,
        ".write": "auth != null", 
         // For stricter production rules, you can verify admin email in rules too if you sync it to DB
      }
    }
    ```
