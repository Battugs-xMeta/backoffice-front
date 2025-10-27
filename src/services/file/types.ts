export interface FileRecord {
  path: any;
}

export interface StorageFile {
  path: string;
  created_at: string;
  size: number;
}

export interface SingleFileUpload {
  file: any;
  onUploadProgress?: (progressEvent: any) => void;
}

export interface SplashFileUpload {
  file: any;
  onUploadProgress?: (progressEvent: any) => void;
}

export interface MultiFileUpload {
  names: string[];
  files: any[];
  onUploadProgress?: (progressEvent: any) => void;
}

export interface FileInterface {
  id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  original_name: string;
  physical_path: string;
  extention: string;
  file_size: number;
}
