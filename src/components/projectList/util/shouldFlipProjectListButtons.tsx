import { EntityId } from '@reduxjs/toolkit';
import { FlipperDecisionData } from '../../../util/types';
import shouldFlipProjectList from './shouldFlipProjectList';

export default function shouldFlipProjectListButtons(
  projectListId: EntityId,
  prev: FlipperDecisionData,
  current: FlipperDecisionData,
): boolean {
  if (shouldFlipProjectList(projectListId, prev, current)) { return true; }

  const prevLength = prev?.entities[projectListId]?.projectIds.length ?? [];
  const currentLength = current?.entities[projectListId]?.projectIds.length ?? [];
  return (
    (prevLength === 0 || currentLength === 0)
    && prevLength !== currentLength
  );
}
