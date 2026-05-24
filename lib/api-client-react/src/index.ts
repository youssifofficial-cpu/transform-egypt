export { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BASE = import.meta.env?.VITE_API_BASE_URL ?? "";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, init);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export { apiFetch };
