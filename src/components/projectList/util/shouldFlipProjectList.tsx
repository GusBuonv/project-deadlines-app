import { EntityId } from '@reduxjs/toolkit';
import { FlipperDecisionData } from '../../../util/types';

export default function shouldFlipProjectList(
  projectListId: EntityId,
  prev: FlipperDecisionData,
  current: FlipperDecisionData,
): boolean {
  const prevKey = prev?.entities[projectListId]?.projectIds.join() ?? [];
  const currentKey = current?.entities[projectListId]?.projectIds.join() ?? [];
  return prevKey !== currentKey;
}
