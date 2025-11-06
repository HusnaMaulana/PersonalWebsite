export const BLOB_BASE_URL =
	process.env.NEXT_PUBLIC_BLOB_BASE_URL ??
	"https://8sek8cisv0zouv0y.public.blob.vercel-storage.com";

export function blob(path: string): string {
	if (!path.startsWith("/")) path = `/${path}`;
	return `${BLOB_BASE_URL}${path}`;
}
