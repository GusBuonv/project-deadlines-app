import { EntityId } from '@reduxjs/toolkit';
import { HasEntityId } from '../../util/types';

interface ProjectListEntity extends HasEntityId {
  projectListDisplayId: EntityId,
  projectIds: EntityId[],
}

interface ProjectListDisplayOptions {
  title: string,
  displayColor?: string,
}

interface ProjectListDisplayEntity extends HasEntityId, ProjectListDisplayOptions {
  projectListId: EntityId,
}
