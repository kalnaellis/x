import { useAppState } from '../lib/state';

type Props = {
  onClick: () => void;
};

const labels = {
  idle: 'Seal your case',
  armed: 'Seal your case in one click',
  form_open: 'Share your details',
  submitting: 'Submitting...',
  form_success: 'Case created',
  upload_ready: 'Upload files',
  uploading: 'Uploading...',
  complete: 'Case sealed',
};

export function CTAButton({ onClick }: Props) {
  const ctaState = useAppState((s) => s.ctaState);
  const disabled = ctaState === 'idle' || ctaState === 'submitting' || ctaState === 'uploading';

  return (
    <button className="cta-button" disabled={disabled} onClick={onClick}>
      {labels[ctaState]}
    </button>
  );
}
