import { EntityId } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import removeAllProjectsInList from '../../../store/deadlines/actions/removeAllProjectsInList';
import { AppDispatch } from '../../../store/store';

export default function useClearProjectList(
  dispatch: AppDispatch,
  projectIds: EntityId[],
  projectListId: EntityId,
): () => void {
  return useCallback(() => dispatch(removeAllProjectsInList({
    projectIds,
    projectListId,
  })), [dispatch, projectIds, projectListId]);
}
