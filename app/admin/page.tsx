"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebase, isFirebaseConfigured } from "@/lib/firebase";
import { type Project } from "@/lib/projects";
import { useProjects } from "@/lib/use-projects";
import { getSavedCover } from "@/lib/project-editor";
import ProjectEditor, { type PendingImage } from "@/components/ProjectEditor";

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

const buttonClass = "bg-[#8b4513] text-white px-5 py-3 font-semibold disabled:opacity-50";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [authError, setAuthError] = useState(() => isFirebaseConfigured() ? "" : "Firebase is not configured. See the project README for setup.");
  const [section, setSection] = useState<"projects" | "pages">("projects");
  const [editing, setEditing] = useState<Project | null>(null);
  const [files, setFiles] = useState<PendingImage[]>([]);
  const filesRef = useRef<PendingImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const { projects, error, loaded } = useProjects();

  useEffect(() => () => {
    filesRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
  }, []);

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

  function clearFiles() {
    filesRef.current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    filesRef.current = [];
    setFiles([]);
  }

  function addFiles(selected: File[]) {
    if (selected.some((file) => !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 10 * 1024 * 1024)) {
      setMessage("Images must be JPEG, PNG, WebP or GIF files no larger than 10 MB each.");
      return;
    }
    const added: PendingImage[] = [];
    try {
      selected.forEach((file) => added.push({ file, previewUrl: URL.createObjectURL(file) }));
    } catch (cause) {
      added.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      console.error("Could not preview images:", cause);
      setMessage("Could not preview the selected images. Please try again.");
      return;
    }
    filesRef.current = [...filesRef.current, ...added];
    setFiles(filesRef.current);
    setMessage("");
  }

  function removeFile(previewUrl: string) {
    URL.revokeObjectURL(previewUrl);
    filesRef.current = filesRef.current.filter((item) => item.previewUrl !== previewUrl);
    setFiles(filesRef.current);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    if (!editing.media.some((item) => item.type === "image") && files.length === 0) {
      setMessage("Add at least one image to the project.");
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const { db, storage } = getFirebase();
      const uploaded = [];
      for (const { file } of files) {
        const imageRef = ref(storage, `projects/${editing.id}/${crypto.randomUUID()}`);
        await uploadBytes(imageRef, file, { contentType: file.type });
        uploaded.push({ type: "image" as const, url: await getDownloadURL(imageRef), alt: editing.title });
      }
      const media = [...editing.media, ...uploaded];
      const coverImage = getSavedCover(editing.media, editing.coverImage, files.map((item) => item.previewUrl), uploaded.map((item) => item.url));
      await setDoc(doc(db, "projects", editing.id), {
        ...editing,
        divisionLabel: editing.division.toUpperCase(),
        media,
        coverImage,
      });
      setEditing(null);
      clearFiles();
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
      if (editing?.id === project.id) {
        setEditing(null);
        clearFiles();
      }
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-xs font-bold tracking-wider text-[#bfc5ce]">SP10 CONSTRUCTION</p><h1 className="font-oswald text-3xl uppercase">Admin Panel</h1></div>
          <div className="flex items-center gap-5 text-sm"><Link href="/projects" className="underline">View portfolio</Link><button onClick={async () => { try { await signOut(getFirebase().auth); router.replace("/login"); } catch (cause) { console.error("Sign out failed:", cause); setMessage("Could not sign out. Please try again."); } }} className="underline">Sign out</button></div>
        </div>
      </header>
      <div className="w-full px-6 py-6 sm:py-10">
        {section === "projects" && error && <p role="alert" className="mb-4 text-red-700">{error}</p>}
        {message && <p role="status" className="mb-4 text-[#73390f]">{message}</p>}
        {section === "projects" && !loaded && !error && <p className="mb-4">Loading projects...</p>}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
          <aside className="bg-white p-6 self-start">
            <nav aria-label="Admin sections" className="flex flex-col items-start gap-4 text-sm font-semibold">
              <button type="button" disabled={busy} aria-current={section === "projects" ? "page" : undefined} onClick={() => setSection("projects")} className={section === "projects" ? "text-[#8b4513] underline" : "text-[#5e6671] hover:text-[#8b4513]"}>Projects</button>
              <button type="button" disabled={busy} aria-current={section === "pages" ? "page" : undefined} onClick={() => setSection("pages")} className={section === "pages" ? "text-[#8b4513] underline" : "text-[#5e6671] hover:text-[#8b4513]"}>Pages</button>
            </nav>
          </aside>
          <section className="min-w-0 bg-white p-6 sm:p-8">
            {section === "pages" ? <><h2 className="font-oswald text-2xl uppercase">Pages</h2><p className="mt-4 text-[#5e6671]">Page management is not available yet.</p></> : editing ?
              <ProjectEditor project={editing} files={files} busy={busy} loaded={loaded} onUpdate={update} onRemoveMedia={(index) => setEditing((current) => current ? { ...current, media: current.media.filter((_, i) => i !== index) } : current)} onAddFiles={addFiles} onRemoveFile={removeFile} onSave={save} onCancel={() => { setEditing(null); clearFiles(); }} /> :
              <>
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <h2 className="font-oswald text-2xl uppercase">Projects</h2>
                  <button disabled={!loaded || busy} className={buttonClass} onClick={() => { setEditing(blankProject()); clearFiles(); setMessage(""); }}>Add project</button>
                </div>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-[#d4d8de] text-[#5e6671]">
                      <tr><th scope="col" className="px-3 py-3">Project</th><th scope="col" className="px-3 py-3">Location</th><th scope="col" className="px-3 py-3">Division</th><th scope="col" className="px-3 py-3">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-[#e8ebef]">
                      {projects.map((project) => <tr key={project.id}>
                        <th scope="row" className="px-3 py-4 font-semibold">{project.title}</th>
                        <td className="px-3 py-4">{project.location}</td>
                        <td className="px-3 py-4 capitalize">{project.division}</td>
                        <td className="px-3 py-4"><div className="flex gap-4">
                          <button disabled={!loaded || busy} className="underline text-[#8b4513] disabled:opacity-50" onClick={() => { setEditing({ ...project, media: [...project.media] }); clearFiles(); setMessage(""); }} aria-label={`Edit ${project.title}`}>Edit</button>
                          <button disabled={!loaded || busy} className="underline text-red-700 disabled:opacity-50" onClick={() => remove(project)} aria-label={`Delete ${project.title}`}>Delete</button>
                        </div></td>
                      </tr>)}
                      {loaded && projects.length === 0 && <tr><td colSpan={4} className="px-3 py-4 text-[#5e6671]">No projects yet. Add a project to get started.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </>}
          </section>
        </div>
      </div>
    </main>
  );
}
