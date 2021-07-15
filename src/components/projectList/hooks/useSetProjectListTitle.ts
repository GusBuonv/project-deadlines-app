import { EntityId } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { AppDispatch } from '../../../store/store';
import { updateProjectListDisplay } from '../slices/projectListDisplaySlice';

export default function useSetProjectListTitle(
  dispatch: AppDispatch,
  projectListId: EntityId,
): (text: string) => void {
  return useCallback((text: string) => {
    dispatch(updateProjectListDisplay({ id: projectListId, changes: { title: text } }));
  }, [dispatch, projectListId]);
}
