import { EntityId } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import removeProjectInList from '../../../store/deadlines/actions/removeProjectInList';
import { AppDispatch } from '../../../store/store';

interface DeleteProjectDependencies {
  dispatch: AppDispatch;
  id: EntityId;
  projectListId: EntityId;
}

export default function useDeleteProject({
  dispatch,
  id,
  projectListId,
}: DeleteProjectDependencies): () => void {
  return useCallback(() => {
    dispatch(removeProjectInList({
      projectId: id,
      projectListId,
    }));
  }, [dispatch, id, projectListId]);
}
