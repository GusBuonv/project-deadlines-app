import { EntityId } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { AppDispatch } from '../../../store/store';
import { updateProjectListDisplay } from '../slices/projectListDisplaySlice';

export default function useSetProjectListTitle(
  dispatch: AppDispatch,
  projectListDisplayId: EntityId,
): (text: string) => void {
  return useCallback((text: string) => {
    dispatch(updateProjectListDisplay({ id: projectListDisplayId, changes: { title: text } }));
  }, [dispatch, projectListDisplayId]);
}
