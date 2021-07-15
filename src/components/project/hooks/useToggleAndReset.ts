import { useCallback } from 'react';

interface ToggleAndResetDependencies {
  setDraftDeadline: (value: string) => void;
  deadline: string;
  setDraftTitle: (value: string) => void;
  title: string;
  toggleEditMode: () => void;
}
export default function useToggleAndReset({
  setDraftDeadline,
  deadline,
  setDraftTitle,
  title,
  toggleEditMode,
}: ToggleAndResetDependencies): () => void {
  return useCallback(() => {
    setDraftDeadline(new Date(deadline).toLocaleString());
    setDraftTitle(title);
    toggleEditMode();
  }, [setDraftDeadline, deadline, setDraftTitle, title, toggleEditMode]);
}
