import { Dispatch, SetStateAction, useCallback, RefObject } from 'react';

interface LockTitleHeightAndToggleDependencies {
  headerRef: RefObject<HTMLHeadingElement>;
  setHeaderInputHeight: Dispatch<SetStateAction<number | undefined>>;
  toggleEditMode: () => void;
}

export default function useLockTitleHeightAndToggle({
  headerRef,
  setHeaderInputHeight,
  toggleEditMode,
}: LockTitleHeightAndToggleDependencies): () => void {
  return useCallback(() => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      setHeaderInputHeight(rect.height || (rect.bottom - rect.top));
    }
    toggleEditMode();
  }, [headerRef, setHeaderInputHeight, toggleEditMode]);
}
