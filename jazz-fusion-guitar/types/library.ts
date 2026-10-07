// Tipus per a la biblioteca de fitxers

export type FileType = "pdf" | "audio" | "tab" | "doc" | "image" | "other";

export type LibraryItem = {
  id: string; // path relatiu desde /public/library
  filename: string;
  type: FileType;
  size: number; // bytes
  title?: string; // extret del nom
  artist?: string;
  category?: string; // subcarpeta d'origen
  tags?: string[];
  description?: string;
};

export type LibraryFolder = {
  id: string;
  name: string;
  description?: string;
  itemCount: number;
  totalSize: number;
  children?: LibraryFolder[];
  items?: LibraryItem[];
};

// Determina el tipus de fitxer per l'extensió
export function getFileType(filename: string): FileType {
  const ext = filename.toLowerCase().split(".").pop() || "";
  if (ext === "pdf") return "pdf";
  if (["mp3", "wav", "m4a", "ogg", "flac", "aac"].includes(ext)) return "audio";
  if (["gp3", "gp4", "gp5", "gp6", "gp7", "gpif", "gtp", "gp"].includes(ext)) return "tab";
  if (["doc", "docx", "odt", "txt", "md"].includes(ext)) return "doc";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "image";
  return "other";
}

// Extreu títol net d'un nom de fitxer
export function getCleanTitle(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "") // extensio
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Converteix bytes a mida llegible
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
