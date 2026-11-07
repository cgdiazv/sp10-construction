"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { getFirebase, isFirebaseConfigured } from "@/lib/firebase";
import { defaultProjects, mergeProjects, type Project } from "@/lib/projects";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;

    return onSnapshot(collection(getFirebase().db, "projects"), { includeMetadataChanges: true }, (snapshot) => {
      try {
        setProjects(mergeProjects(snapshot.docs.map((document) => ({ id: document.id, data: document.data() }))));
        setError("");
        setLoaded(!snapshot.metadata.fromCache && !snapshot.metadata.hasPendingWrites);
      } catch (cause) {
        console.error("Invalid project data in Firebase:", cause);
        setError("Project data is invalid. Contact the site administrator.");
        setLoaded(false);
      }
    }, (cause) => {
      console.error("Could not load projects from Firebase:", cause);
      setError("Could not load the latest projects. Please check your connection and try again.");
      setLoaded(false);
    });
  }, []);

  return { projects, error, loaded };
}
