import { useState } from 'react';
import { EditModes } from '../../../util/types';
import useToggleEditMode from './useToggleEditMode';

export default function useEditMode(initialMode: EditModes): [EditModes, () => void] {
  const [mode, setMode] = useState<EditModes>(initialMode);
  const toggleEditMode = useToggleEditMode(setMode);
  return [mode, toggleEditMode];
}
