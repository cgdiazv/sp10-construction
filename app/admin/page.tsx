"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebase, isFirebaseConfigured } from "@/lib/firebase";
import { type Project } from "@/lib/projects";
import { useProjects } from "@/lib/use-projects";

const blankProject = (): Project => ({
  id: crypto.randomUUID(),
  division: "residential",
  divisionLabel: "RESIDENTIAL",
  title: "",
  subtitle: "",
  location: "",
  description: "",
  scopeItems: "",
  scopeNote: "",
  coverImage: "",
  media: [],
});

const inputClass = "mt-2 w-full border border-[#d4d8de] p-3 font-normal";
const buttonClass = "bg-[#8b4513] text-white px-5 py-3 font-semibold disabled:opacity-50";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [authError, setAuthError] = useState(() => isFirebaseConfigured() ? "" : "Firebase is not configured. See the project README for setup.");
  const [editing, setEditing] = useState<Project | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const { projects, error, loaded } = useProjects();

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    let active = true;
    Promise.resolve().then(() => {
      const { auth, db } = getFirebase();
      if (!active) return;
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        setAuthorized(false);
        if (!user) {
          router.replace("/login");
          return;
        }
        try {
          const admin = await getDoc(doc(db, "admins", user.uid));
          if (!active || auth.currentUser?.uid !== user.uid) return;
          if (!admin.exists()) {
            await signOut(auth);
            router.replace("/login");
            return;
          }
          setAuthorized(true);
        } catch (cause) {
          console.error("Could not verify admin access:", cause);
          if (active) setAuthError("Could not verify access. Check your connection and reload the page.");
        }
      });
    }).catch((cause) => {
      console.error("Could not initialize Firebase:", cause);
      if (active) setAuthError(cause instanceof Error ? cause.message : "Could not initialize Firebase.");
    });
    let unsubscribe: (() => void) | undefined;
    return () => { active = false; unsubscribe?.(); };
  }, [router]);

  function update(field: keyof Project, value: string) {
    setEditing((current) => current ? { ...current, [field]: value } : current);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    if (files.some((file) => !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 10 * 1024 * 1024)) {
      setMessage("Images must be JPEG, PNG, WebP or GIF files no larger than 10 MB each.");
      return;
    }
    if (!editing.media.some((item) => item.type === "image") && files.length === 0) {
      setMessage("Add at least one image to the project.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const { db, storage } = getFirebase();
      const uploaded = [];
      for (const file of files) {
        const imageRef = ref(storage, `projects/${editing.id}/${crypto.randomUUID()}`);
        await uploadBytes(imageRef, file, { contentType: file.type });
        uploaded.push({ type: "image" as const, url: await getDownloadURL(imageRef), alt: editing.title });
      }
      const media = [...editing.media, ...uploaded];
      const coverImage = media.some((item) => item.type === "image" && item.url === editing.coverImage)
        ? editing.coverImage
        : media.find((item) => item.type === "image")!.url;
      await setDoc(doc(db, "projects", editing.id), {
        ...editing,
        divisionLabel: editing.division.toUpperCase(),
        media,
        coverImage,
      });
      setEditing(null);
      setFiles([]);
      setMessage("Project saved.");
    } catch (cause) {
      console.error("Could not save project:", cause);
      setMessage("Could not save the project. Check your connection and permissions, then try again.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(project: Project) {
    if (!window.confirm(`Delete "${project.title}" from the portfolio?`)) return;
    setBusy(true);
    setMessage("");
    try {
      await setDoc(doc(getFirebase().db, "projects", project.id), { deleted: true });
      if (editing?.id === project.id) setEditing(null);
      setMessage("Project deleted.");
    } catch (cause) {
      console.error("Could not delete project:", cause);
      setMessage("Could not delete the project. Check your connection and permissions, then try again.");
    } finally {
      setBusy(false);
    }
  }

  if (authError) return <main className="p-8"><p role="alert">{authError}</p><Link className="underline" href="/login">Go to sign in</Link></main>;
  if (!authorized) return <main className="p-8">Checking access...</main>;

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-[#0f172a]">
      <header className="bg-[#1e2229] text-white px-6 py-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-xs font-bold tracking-wider text-[#bfc5ce]">SP10 CONSTRUCTION</p><h1 className="font-oswald text-3xl uppercase">Manage projects</h1></div>
          <div className="flex items-center gap-5 text-sm"><Link href="/projects" className="underline">View portfolio</Link><button onClick={async () => { try { await signOut(getFirebase().auth); router.replace("/login"); } catch (cause) { console.error("Sign out failed:", cause); setMessage("Could not sign out. Please try again."); } }} className="underline">Sign out</button></div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto p-6 sm:py-10">
        {error && <p role="alert" className="mb-4 text-red-700">{error}</p>}
        {message && <p role="status" className="mb-4 text-[#73390f]">{message}</p>}
        {!loaded && !error && <p className="mb-4">Loading projects...</p>}
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <section className="bg-white p-6 self-start">
            <div className="flex justify-between items-center gap-3"><h2 className="font-oswald text-2xl uppercase">Projects</h2><button disabled={!loaded || busy} className={buttonClass} onClick={() => { setEditing(blankProject()); setFiles([]); setMessage(""); }}>Add project</button></div>
            <ul className="mt-5 divide-y divide-[#e8ebef]">
              {projects.map((project) => <li key={project.id} className="py-4">
                <p className="font-semibold">{project.title}</p><p className="text-sm text-[#5e6671]">{project.location}</p>
                <div className="flex gap-4 mt-2 text-sm"><button disabled={!loaded || busy} className="underline text-[#8b4513]" onClick={() => { setEditing({ ...project, media: [...project.media] }); setFiles([]); setMessage(""); }}>Edit</button><button disabled={!loaded || busy} className="underline text-red-700" onClick={() => remove(project)}>Delete</button></div>
              </li>)}
            </ul>
          </section>
          <section className="bg-white p-6 sm:p-8">
            {!editing ? <p className="text-[#5e6671]">Select a project to edit or add a new project.</p> :
              <form onSubmit={save} className="flex flex-col gap-5">
                <h2 className="font-oswald text-2xl uppercase">Project details</h2>
                <label className="text-sm font-semibold">Title<input required maxLength={150} className={inputClass} value={editing.title} onChange={(e) => update("title", e.target.value)} /></label>
                <label className="text-sm font-semibold">Division<select className={inputClass} value={editing.division} onChange={(e) => update("division", e.target.value)}><option value="residential">Residential</option><option value="commercial">Commercial</option></select></label>
                <label className="text-sm font-semibold">Subtitle<input required maxLength={200} className={inputClass} value={editing.subtitle} onChange={(e) => update("subtitle", e.target.value)} /></label>
                <label className="text-sm font-semibold">Location<input required maxLength={150} className={inputClass} value={editing.location} onChange={(e) => update("location", e.target.value)} /></label>
                <label className="text-sm font-semibold">Description<textarea required maxLength={3000} rows={4} className={inputClass} value={editing.description} onChange={(e) => update("description", e.target.value)} /></label>
                <label className="text-sm font-semibold">Scope and trades<input required maxLength={1000} className={inputClass} value={editing.scopeItems} onChange={(e) => update("scopeItems", e.target.value)} /></label>
                <label className="text-sm font-semibold">Scope note<textarea required maxLength={1000} rows={2} className={inputClass} value={editing.scopeNote} onChange={(e) => update("scopeNote", e.target.value)} /></label>
                <fieldset className="border border-[#d4d8de] p-4"><legend className="font-semibold text-sm px-1">Gallery</legend>
                  <p className="text-sm text-[#5e6671] mb-3">Choose a cover image and remove unwanted items. Existing videos are retained. Upload JPEG, PNG, WebP or GIF images up to 10 MB each.</p>
                  {editing.media.map((item, index) => <div key={`${item.url}-${index}`} className="flex flex-wrap items-center gap-3 py-2 border-b border-[#e8ebef] text-sm">
                    <span className="flex-1 break-all">{item.alt || item.url} ({item.type})</span>
                    {item.type === "image" && <label><input type="radio" name="cover" checked={editing.coverImage === item.url} onChange={() => update("coverImage", item.url)} /> Cover</label>}
                    <button type="button" className="text-red-700 underline" onClick={() => setEditing({ ...editing, media: editing.media.filter((_, i) => i !== index) })}>Remove</button>
                  </div>)}
                  <label className="block mt-4 text-sm font-semibold">Add images<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="block mt-2 w-full font-normal" onChange={(e) => setFiles(Array.from(e.target.files ?? []))} /></label>
                </fieldset>
                <div className="flex gap-4"><button className={buttonClass} disabled={busy || !loaded}>{busy ? "Saving..." : "Save project"}</button><button type="button" disabled={busy} className="underline" onClick={() => { setEditing(null); setFiles([]); }}>Cancel</button></div>
              </form>}
          </section>
        </div>
      </div>
    </main>
  );
}
