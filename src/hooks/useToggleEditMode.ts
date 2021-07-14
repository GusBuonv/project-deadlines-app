import { Dispatch, SetStateAction, useCallback } from 'react';

export default function useToggleEditMode(setMode: Dispatch<SetStateAction<'edit' | 'display'>>): () => void {
  return useCallback(() => (
    setMode((state) => (state === 'edit' ? 'display' : 'edit'))
  ), [setMode]);
}
