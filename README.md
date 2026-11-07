# SP10 Construction

## Project administration

The portfolio at `/projects` can be managed at `/admin`. Sign in at `/login`
with an authorized Firebase email/password account. The editor supports adding,
editing, and removing projects, uploading images, choosing a cover, and removing
gallery items. Existing videos remain in the gallery unless removed. The home
page's illustrative concepts are separate and are not edited here.

### Firebase setup

1. Create a Firebase project and register a web app. Enable Email/Password in
   Authentication, create a Cloud Firestore database and a Storage bucket.
2. Copy the web app configuration to `.env.local` (and to the deployment
   environment before building):

   ```text
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket-name
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

   These web configuration values are public, not service account credentials.
   Never put a Firebase service account key in a `NEXT_PUBLIC_` variable.
3. Deploy the rules in `firestore.rules` and `storage.rules` to the same Firebase
   project, using the Firebase console or `firebase deploy --only firestore:rules,storage`
   with the Firebase CLI and the correct project selected. These files define the complete
   rules for this app; merge them carefully if the Firebase project already has
   other applications. Storage rules use Firestore's default database; enable
   cross-service access if the console prompts for it.
4. Create each administrator in Firebase Authentication. In the Firestore
   console, create a document at `admins/<Firebase Authentication UID>` for
   each authorized account (an empty document is sufficient). Only operators
   with Firebase console access should be able to modify this allowlist. Remove
   the document to revoke admin access; revoke the user's Firebase sessions or
   disable the account as appropriate. Do not enable public account registration.
5. Restart the development server or redeploy after changing environment
   variables. Test with both an authorized and an unauthorized account before
   going live. Security rules, not the client-side redirect, protect the data.

The original portfolio is built into the app. Firestore documents in `projects`
override those projects or add new ones; deletion writes a tombstone so a
removed original project does not reappear. Without Firebase configuration the
original portfolio remains visible, but administration is unavailable. When a
configured database cannot be reached, the portfolio displays an error instead
of claiming its displayed data is current.

Uploaded images are public and have public download URLs. Removing an image or
project from the editor does not delete the Storage object, and an interrupted
save can leave unused uploads. An operator can remove unused objects from the
Firebase console after checking that no project references them.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
