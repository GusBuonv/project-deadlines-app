import { useCallback } from 'react';

export interface ToggleAndNotifyChangesDependencies {
  notifyProjectChanges: () => boolean;
  toggleEditMode: () => void;
  setIsDraftDeadlineInvalid: (value: boolean) => void;
}
export default function useToggleAndNotifyChanges({
  notifyProjectChanges,
  toggleEditMode,
  setIsDraftDeadlineInvalid,
}: ToggleAndNotifyChangesDependencies): () => void {
  return useCallback(() => {
    if (!notifyProjectChanges()) setIsDraftDeadlineInvalid(false);
    toggleEditMode();
  }, [notifyProjectChanges, setIsDraftDeadlineInvalid, toggleEditMode]);
}
