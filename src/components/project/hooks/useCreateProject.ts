import { EntityId, nanoid } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import createProjectInList from '../../../store/deadlines/actions/createProjectInList';
import { AppDispatch } from '../../../store/store';

export default function useCreateProject(
  dispatch: AppDispatch,
  projectListId: EntityId,
): () => void {
  return useCallback(() => dispatch(createProjectInList({
    projectId: nanoid(),
    projectListId,
  })), [dispatch, projectListId]);
}
