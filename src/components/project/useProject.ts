import { EntityId } from '@reduxjs/toolkit';
import useAppSelector from '../../hooks/useAppSelector';
import { ProjectEntity, selectProjectById } from './projectsSlice';

export default function useProject(id: EntityId): ProjectEntity | undefined {
  return useAppSelector((state) => selectProjectById(state, id));
}
