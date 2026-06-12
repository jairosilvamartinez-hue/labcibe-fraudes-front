/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  readonly VITE_REPORTS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
