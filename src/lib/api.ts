const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://example-backend.com';

export type CreateCaseReq = {
  name: string;
  email: string;
  consent: boolean;
  consentVersion: string;
};

export type CreateCaseRes = {
  caseId: string;
  folderId: string;
  folderUrl: string;
};

export async function createCase(payload: CreateCaseReq): Promise<CreateCaseRes> {
  const res = await fetch(`${API_BASE_URL}/case`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create case');
  }

  return res.json();
}

export async function uploadFiles(payload: {
  caseId: string;
  folderId: string;
  files: File[];
}): Promise<{ uploaded: Array<{ name: string; fileId: string; url: string }>; status: string }> {
  const formData = new FormData();
  formData.append('caseId', payload.caseId);
  formData.append('folderId', payload.folderId);
  payload.files.forEach((file) => formData.append('files', file));

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Failed to upload file(s)');
  }

  return res.json();
}
