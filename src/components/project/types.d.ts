import { EntityId } from '@reduxjs/toolkit';
import { HasEntityId, HeaderTag } from '../../util/types';

export interface ProjectOptions {
  title: string;
  /** ISO date time string */
  deadline: string;
  displayColor?: string;
}

export interface ProjectEntity extends HasEntityId, ProjectOptions {
  projectListId: EntityId;
}

export interface ProjectProps {
  id: EntityId,
  headerAs?: HeaderTag,
}
