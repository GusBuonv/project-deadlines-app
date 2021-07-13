import { EntityId } from '@reduxjs/toolkit';
import { WithId } from '../../util/types';

export interface ProjectOptions {
  title: string;
  /** ISO date time string */
  deadline: string;
  displayColor?: string;
}

export interface ProjectEntity extends WithId<ProjectOptions> {
  projectListId: EntityId;
}
