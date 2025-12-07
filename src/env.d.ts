/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KINDE_CLIENT_ID: string;
  readonly VITE_KINDE_ISSUER_URL: string;
  readonly VITE_KINDE_SITE_URL: string;
  readonly VITE_KINDE_POST_LOGOUT_REDIRECT_URL: string;
  readonly VITE_KINDE_POST_LOGIN_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
