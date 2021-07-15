import { EntityId } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { FlipDecisionCallback, FlipperDecisionData } from '../../../util/types';
import shouldFlipProjectList from '../util/shouldFlipProjectList';

export default function useShouldFlipProjectListButtons(
  projectListId: EntityId,
): FlipDecisionCallback {
  return useCallback((prev: FlipperDecisionData, current: FlipperDecisionData) => (
    shouldFlipProjectList(projectListId, prev, current)
  ), [projectListId]);
}
