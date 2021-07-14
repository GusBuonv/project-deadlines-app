import { ChangeEventHandler, Dispatch, SetStateAction, useCallback } from 'react';

export default function useHandleTitleChange<T extends { title: string }>(
  setDraft: Dispatch<SetStateAction<T>>,
): ChangeEventHandler<HTMLInputElement> {
  return useCallback((e) => {
    setDraft((state) => ({
      ...state,
      title: e.target.value,
    }));
  }, [setDraft]);
}
