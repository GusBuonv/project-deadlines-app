import { ChangeEventHandler, Dispatch, SetStateAction, useCallback } from 'react';

export default function useHandleDeadlineChange<T extends { deadline: string; }>(
  setInvalidState: (state: boolean) => void,
  setDraft: Dispatch<SetStateAction<T>>,
): ChangeEventHandler<HTMLInputElement> {
  return useCallback((e) => {
    setInvalidState(false);
    setDraft((state) => ({
      ...state,
      deadline: e.target.value,
    }));
  }, [setDraft, setInvalidState]);
}
