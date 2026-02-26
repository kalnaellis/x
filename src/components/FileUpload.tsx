import { useState } from 'react';
import { uploadFiles } from '../lib/api';
import { useAppState } from '../lib/state';

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const { caseId, folderId, ctaState, setCTAState } = useAppState();

  if (ctaState !== 'upload_ready' && ctaState !== 'uploading' && ctaState !== 'complete') {
    return null;
  }

  const onUpload = async () => {
    if (!caseId || !folderId || files.length === 0) {
      return;
    }

    setCTAState('uploading');
    try {
      await uploadFiles({ caseId, folderId, files });
      setCTAState('complete');
    } catch {
      setCTAState('upload_ready');
    }
  };

  return (
    <div className="upload-box">
      <input type="file" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []))} />
      <button onClick={onUpload} disabled={ctaState === 'uploading'}>
        Upload files
      </button>
    </div>
  );
}
