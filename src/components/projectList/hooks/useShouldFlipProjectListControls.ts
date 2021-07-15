import { EntityId } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { FlipDecisionCallback, FlipperDecisionData } from '../../../util/types';
import shouldFlipProjectList from '../util/shouldFlipProjectList';
import shouldFlipProjectListButtons from '../util/shouldFlipProjectListButtons';

export default function useShouldFlipProjectListControls(
  projectListId: EntityId,
): FlipDecisionCallback {
  return useCallback((prev: FlipperDecisionData, current: FlipperDecisionData) => (
    shouldFlipProjectList(projectListId, prev, current)
    && !shouldFlipProjectListButtons(projectListId, prev, current)
  ), [projectListId]);
}
