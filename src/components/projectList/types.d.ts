import { EntityId } from '@reduxjs/toolkit';
import { WithId } from '../../util/types';

export type ProjectListEntity = WithId<{
  title: string;
  projectIds: EntityId[];
  displayColor?: string;
}>;
