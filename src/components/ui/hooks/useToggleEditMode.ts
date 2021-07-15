import { Dispatch, SetStateAction, useCallback } from 'react';
import { EditModes } from '../../../util/types';

export default function useToggleEditMode(
  setMode: Dispatch<SetStateAction<EditModes>>,
): () => void {
  return useCallback(() => (
    setMode((state) => (state === 'edit' ? 'display' : 'edit'))
  ), [setMode]);
}
