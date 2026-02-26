import { create } from 'zustand';

export type CTAState =
  | 'idle'
  | 'armed'
  | 'form_open'
  | 'submitting'
  | 'form_success'
  | 'upload_ready'
  | 'uploading'
  | 'complete';

type AppState = {
  ctaState: CTAState;
  caseId?: string;
  folderId?: string;
  folderUrl?: string;
  setCTAState: (state: CTAState) => void;
  setCaseData: (data: { caseId: string; folderId: string; folderUrl: string }) => void;
};

export const useAppState = create<AppState>((set) => ({
  ctaState: 'idle',
  setCTAState: (ctaState) => set({ ctaState }),
  setCaseData: ({ caseId, folderId, folderUrl }) => set({ caseId, folderId, folderUrl }),
}));
