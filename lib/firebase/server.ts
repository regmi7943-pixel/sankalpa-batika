import "server-only";
import { initializeApp, getApps, cert, getApp, ServiceAccount } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { getAuth } from "firebase-admin/auth";

// Database URL - must be set for Realtime Database
// Database URL - check both public and private env vars
const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL;

// Parse the service account key from environment variable
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

let serviceAccount: ServiceAccount | undefined;
if (serviceAccountKey) {
    try {
        serviceAccount = JSON.parse(serviceAccountKey);
    } catch (error) {
        console.error("Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:", error);
    }
}

// Initialize Firebase Admin
if (!getApps().length) {
    if (serviceAccount && databaseURL) {
        initializeApp({
            credential: cert(serviceAccount),
            databaseURL: databaseURL,
        });
        console.log("Firebase Admin initialized with credentials");
    } else {
        // Fallback for build time or missing credentials
        console.warn("Firebase Admin: Missing credentials or databaseURL");
        console.warn("FIREBASE_SERVICE_ACCOUNT_KEY:", serviceAccountKey ? "SET" : "NOT SET");
        console.warn("DATABASE_URL:", databaseURL ? "SET" : "NOT SET");
        initializeApp({
            databaseURL: databaseURL
        });
    }
}

const adminApp = getApp();
export const adminAuth = getAuth(adminApp);
export const adminDb = getDatabase(adminApp);

