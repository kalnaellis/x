import { useState } from 'react';
import { CanvasBG } from './components/CanvasBG';
import { CTAButton } from './components/CTAButton';
import { FileUpload } from './components/FileUpload';
import { IntakeModal } from './components/IntakeModal';
import { ScrollType } from './components/ScrollType';
import { useAppState } from './lib/state';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const ctaState = useAppState((s) => s.ctaState);
  const setCTAState = useAppState((s) => s.setCTAState);

  const onCTA = () => {
    if (ctaState === 'armed') {
      setCTAState('form_open');
      setModalOpen(true);
      return;
    }

    if (ctaState === 'upload_ready') {
      document.querySelector('.upload-box')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main>
      <CanvasBG />
      <ScrollType />
      <div className="floating-cta">
        <CTAButton onClick={onCTA} />
      </div>
      <FileUpload />
      <IntakeModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
