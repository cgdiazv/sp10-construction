"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirebase } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { auth, db } = getFirebase();
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const admin = await getDoc(doc(db, "admins", credential.user.uid));
      if (!admin.exists()) {
        await signOut(auth);
        setError("This account is not authorized to access the admin area.");
        return;
      }
      router.replace("/admin");
    } catch (cause) {
      console.error("Admin sign-in failed:", cause);
      setError(cause instanceof Error && cause.message.startsWith("Firebase is not configured")
        ? cause.message
        : "Unable to sign in or verify access. Check your credentials and connection.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#1e2229] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-white p-8 sm:p-10">
        <Link href="/" className="text-sm font-bold text-[#8b4513]">SP10 CONSTRUCTION</Link>
        <h1 className="font-oswald text-4xl uppercase mt-6">Admin sign in</h1>
        <p className="text-sm text-[#5e6671] mt-2">Sign in with your authorized account to manage content.</p>
        <form onSubmit={login} className="mt-8 flex flex-col gap-5">
          <label className="text-sm font-semibold">Email
            <input className="mt-2 w-full border border-[#d4d8de] p-3" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="text-sm font-semibold">Password
            <input className="mt-2 w-full border border-[#d4d8de] p-3" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button disabled={busy} className="bg-[#8b4513] text-white py-3 font-semibold disabled:opacity-50">{busy ? "Signing in..." : "Sign in"}</button>
        </form>
        <Link href="/" className="inline-block mt-6 text-sm text-[#5e6671] underline">Back to website</Link>
      </div>
    </main>
  );
}
