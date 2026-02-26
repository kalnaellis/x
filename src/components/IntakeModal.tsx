import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createCase } from '../lib/api';
import { CONSENT_VERSION } from '../lib/constants';
import { useAppState } from '../lib/state';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  consent: z.boolean().refine((v) => v, 'Consent required'),
});

type FormInput = z.infer<typeof schema>;

export function IntakeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const setCTAState = useAppState((s) => s.setCTAState);
  const setCaseData = useAppState((s) => s.setCaseData);

  const { register, handleSubmit, formState } = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', consent: false },
  });

  if (!open) {
    return null;
  }

  const onSubmit = handleSubmit(async (data) => {
    setCTAState('submitting');
    try {
      const result = await createCase({ ...data, consentVersion: CONSENT_VERSION });
      setCaseData(result);
      setCTAState('upload_ready');
      onClose();
    } catch {
      setCTAState('armed');
    }
  });

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <form className="modal" onSubmit={onSubmit}>
        <h3>Open your case</h3>
        <input placeholder="Name" {...register('name')} />
        <input placeholder="Email" {...register('email')} />
        <label>
          <input type="checkbox" {...register('consent')} />
          I consent to data processing under privacy policy.
        </label>
        <button type="submit" disabled={formState.isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
