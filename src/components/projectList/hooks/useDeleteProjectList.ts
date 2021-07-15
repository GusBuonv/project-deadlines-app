import { EntityId } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import destroyProjectList from '../../../store/deadlines/actions/destroyProjectList';
import { AppDispatch } from '../../../store/store';

export default function useDeleteProjectList(
  dispatch: AppDispatch,
  projectIds: EntityId[],
  projectListDisplayId: EntityId,
  projectListId: EntityId,
): () => void {
  return useCallback(() => dispatch(destroyProjectList({
    projectIds,
    projectListDisplayId,
    projectListId,
  })), [projectIds, projectListDisplayId, projectListId, dispatch]);
}
