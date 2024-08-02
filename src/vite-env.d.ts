/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

interface ImportMetaEnv {
	readonly VITE_API_PREFIX: string
	readonly VITE_BASE_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
