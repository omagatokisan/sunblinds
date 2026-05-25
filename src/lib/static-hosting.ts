/** Statický hosting (Webglobe FTP) — formuláře místo Next API volají PHP skripty. */
export function isStaticHosting(): boolean {
  return process.env.NEXT_PUBLIC_STATIC_HOSTING === "1";
}

export function apiEndpoint(path: string): string {
  if (isStaticHosting()) {
    return path.endsWith(".php") ? path : `${path}.php`;
  }
  return path;
}
