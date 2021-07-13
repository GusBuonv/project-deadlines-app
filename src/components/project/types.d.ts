import { EntityId } from '@reduxjs/toolkit';
import { HasEntityId } from '../../util/types';

export interface ProjectOptions {
  title: string;
  /** ISO date time string */
  deadline: string;
  displayColor?: string;
}

export interface ProjectEntity extends HasEntityId, ProjectOptions {
  projectListId: EntityId;
}
