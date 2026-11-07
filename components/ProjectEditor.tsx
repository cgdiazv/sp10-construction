"use client";

import Image from "next/image";
import { Images, Play } from "lucide-react";
import type { FormEvent } from "react";
import type { Project } from "@/lib/projects";
import { getPreviewCover } from "@/lib/project-editor";

export interface PendingImage {
  file: File;
  previewUrl: string;
}

interface ProjectEditorProps {
  project: Project;
  files: PendingImage[];
  busy: boolean;
  loaded: boolean;
  onUpdate: (field: keyof Project, value: string) => void;
  onRemoveMedia: (index: number) => void;
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (previewUrl: string) => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const inputClass = "mt-2 w-full border border-[#d4d8de] p-3 font-normal";

function MediaThumbnail({ url, alt }: { url: string; alt: string }) {
  return <Image src={url} alt={alt} fill sizes="(max-width: 640px) 50vw, 180px" unoptimized={url.startsWith("https://") || url.startsWith("blob:")} className="object-cover" />;
}

export default function ProjectEditor({ project, files, busy, loaded, onUpdate, onRemoveMedia, onAddFiles, onRemoveFile, onSave, onCancel }: ProjectEditorProps) {
  const cover = getPreviewCover(project.media, project.coverImage, files.map((item) => item.previewUrl));
  const gallery = [
    ...project.media.map((item) => ({ type: item.type, url: item.url, alt: item.alt || project.title || "Project image" })),
    ...files.map((item) => ({ type: "image" as const, url: item.previewUrl, alt: item.file.name })),
  ];
  const photoCount = gallery.filter((item) => item.type === "image").length;
  const videoCount = gallery.length - photoCount;

  return (
    <form onSubmit={onSave} className="flex flex-col gap-6">
      <div>
        <h2 className="font-oswald text-2xl uppercase">Project details</h2>
        <p className="mt-1 text-sm text-[#5e6671]">Edit the details and preview the project below. Changes are published when you save.</p>
      </div>
      <fieldset disabled={busy} className="min-w-0">
        <div className="grid gap-8 xl:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-6">
            <section className="flex flex-col gap-4">
              <h3 className="font-oswald text-xl uppercase">Project information</h3>
              <label className="text-sm font-semibold">Title<input required maxLength={150} className={inputClass} value={project.title} onChange={(e) => onUpdate("title", e.target.value)} /></label>
              <label className="text-sm font-semibold">Division<select className={inputClass} value={project.division} onChange={(e) => onUpdate("division", e.target.value)}><option value="residential">Residential</option><option value="commercial">Commercial</option></select></label>
              <label className="text-sm font-semibold">Subtitle<input required maxLength={200} className={inputClass} value={project.subtitle} onChange={(e) => onUpdate("subtitle", e.target.value)} /></label>
              <label className="text-sm font-semibold">Location<input required maxLength={150} className={inputClass} value={project.location} onChange={(e) => onUpdate("location", e.target.value)} /></label>
              <label className="text-sm font-semibold">Description<textarea required maxLength={3000} rows={4} className={inputClass} value={project.description} onChange={(e) => onUpdate("description", e.target.value)} /></label>
            </section>
            <section className="flex flex-col gap-4">
              <h3 className="font-oswald text-xl uppercase">Scope and trades</h3>
              <label className="text-sm font-semibold">Scope and trades<input required maxLength={1000} className={inputClass} value={project.scopeItems} onChange={(e) => onUpdate("scopeItems", e.target.value)} /></label>
              <label className="text-sm font-semibold">Scope note<textarea required maxLength={1000} rows={2} className={inputClass} value={project.scopeNote} onChange={(e) => onUpdate("scopeNote", e.target.value)} /></label>
            </section>
          </div>

          <section aria-label="Live project preview" className="min-w-0">
            <h3 className="font-oswald text-xl uppercase">Live preview</h3>
            <p className="mt-1 mb-4 text-sm text-[#5e6671]">A preview of the project card on the portfolio page.</p>
            <div className="border border-[#d4d8de] bg-white">
              <div className="relative h-60 bg-[#e8ebef] flex items-center justify-center">
                {cover ? <MediaThumbnail url={cover} alt={project.title || "Project cover preview"} /> : <span className="text-sm text-[#5e6671]">Add an image to preview the cover</span>}
                <span className="absolute top-4 left-4 bg-[#1e2229]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">{project.division}</span>
                <div className="absolute top-4 right-4 flex gap-1.5">
                  {photoCount > 0 && <span className="flex items-center gap-1 bg-[#1e2229]/85 px-2.5 py-1 text-[11px] text-white"><Images className="h-3 w-3" />{photoCount} {photoCount === 1 ? "photo" : "photos"}</span>}
                  {videoCount > 0 && <span className="flex items-center gap-1 bg-[#8b4513] px-2 py-1 text-[11px] text-white"><Play className="h-3 w-3" />{videoCount} {videoCount === 1 ? "video" : "videos"}</span>}
                </div>
              </div>
              {gallery.length > 1 && <div className="grid grid-cols-4 gap-1 border-b border-[#e8ebef] bg-[#f4f5f7] p-2">
                {gallery.slice(0, 4).map((item, index) => <div key={`${item.url}-${index}`} className="relative h-16 overflow-hidden bg-[#1e2229]">
                  {item.type === "image" ? <MediaThumbnail url={item.url} alt={item.alt} /> : <div className="flex h-full items-center justify-center text-white"><Play className="h-5 w-5" /></div>}
                  {index === 3 && gallery.length > 4 && <span className="absolute inset-0 flex items-center justify-center bg-[#0f172a]/75 text-xs font-bold text-white">+{gallery.length - 4}</span>}
                </div>)}
              </div>}
              <div className="flex flex-col gap-4 p-6">
                <div className="flex justify-between gap-3 text-[11px] font-semibold uppercase"><span className="border border-[#8b4513] px-2.5 py-0.5 text-[#8b4513]">{project.division}</span><span className="text-[#5e6671]">{project.location || "Location"}</span></div>
                <div><h4 className="font-oswald text-[28px] uppercase break-words">{project.title || "Project title"}</h4><p className="text-xs uppercase tracking-wider text-[#5e6671] break-words">{project.subtitle || "Project subtitle"}</p></div>
                <p className="text-sm text-[#5e6671] whitespace-pre-wrap break-words">{project.description || "Project description"}</p>
                <div className="border-t border-[#e8ebef] pt-4 text-sm text-[#5e6671] break-words"><p className="text-[11px] font-bold uppercase text-[#0f172a]">Project scope &amp; trades</p><p>{project.scopeItems || "Scope and trades"}</p><p className="whitespace-pre-wrap">{project.scopeNote || "Scope note"}</p></div>
                <p className="border-t border-[#e8ebef] pt-4 text-[13px] font-semibold text-[#8b4513]">Explore Gallery ({gallery.length} items)</p>
              </div>
            </div>
          </section>
        </div>

        <fieldset className="mt-8 border border-[#d4d8de] p-4">
          <legend className="px-1 text-sm font-semibold">Gallery</legend>
          <p className="mb-4 text-sm text-[#5e6671]">Choose a cover and remove unwanted items. Existing videos are retained unless removed. Add JPEG, PNG, WebP or GIF images up to 10 MB each.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {project.media.map((item, index) => <div key={`${item.url}-${index}`} className="min-w-0 border border-[#d4d8de]">
              <div className="relative h-32 bg-[#1e2229]">
                {item.type === "image" ? <MediaThumbnail url={item.url} alt={item.alt || `Project image ${index + 1}`} /> : <div className="flex h-full items-center justify-center gap-2 text-sm text-white"><Play className="h-5 w-5" /> Video</div>}
              </div>
              <div className="flex flex-col gap-2 p-3 text-sm">
                <span className="break-words">{item.alt || (item.type === "video" ? `Video ${index + 1}` : `Image ${index + 1}`)}</span>
                {item.type === "image" && <label><input type="radio" name="cover" checked={cover === item.url} onChange={() => onUpdate("coverImage", item.url)} /> Cover</label>}
                <button type="button" className="self-start text-red-700 underline" onClick={() => onRemoveMedia(index)} aria-label={`Remove ${item.alt || `${item.type} ${index + 1}`}`}>Remove</button>
              </div>
            </div>)}
            {files.map((item) => <div key={item.previewUrl} className="min-w-0 border border-[#d4d8de]">
              <div className="relative h-32 bg-[#e8ebef]"><MediaThumbnail url={item.previewUrl} alt={item.file.name} /></div>
              <div className="flex flex-col gap-2 p-3 text-sm">
                <span className="break-all">{item.file.name} <span className="text-[#5e6671]">(new)</span></span>
                <label><input type="radio" name="cover" checked={cover === item.previewUrl} onChange={() => onUpdate("coverImage", item.previewUrl)} /> Cover</label>
                <button type="button" className="self-start text-red-700 underline" onClick={() => onRemoveFile(item.previewUrl)} aria-label={`Remove ${item.file.name}`}>Remove</button>
              </div>
            </div>)}
          </div>
          <label className="mt-4 block text-sm font-semibold">Add images<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="mt-2 block w-full font-normal" onChange={(e) => { onAddFiles(Array.from(e.target.files ?? [])); e.target.value = ""; }} /></label>
        </fieldset>
      </fieldset>
      <div className="flex gap-4"><button className="bg-[#8b4513] px-5 py-3 font-semibold text-white disabled:opacity-50" disabled={busy || !loaded}>{busy ? "Saving..." : "Save project"}</button><button type="button" disabled={busy} className="underline" onClick={onCancel}>Cancel</button></div>
    </form>
  );
}
