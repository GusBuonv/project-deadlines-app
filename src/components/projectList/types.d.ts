import { EntityId } from '@reduxjs/toolkit';
import { HasEntityId, HeadingTag } from '../../util/types';

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

export interface ProjectListProps {
  id: EntityId;
  headingTag?: HeadingTag;
}

interface ProjectListRawProps extends
  ProjectListProps, ProjectListEntity, ProjectListDisplayOptions {
  isClearListEnabled: boolean;
}
