import { EntityId } from '@reduxjs/toolkit';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectProjectById } from '../projectsSlice';
import { ProjectEntity } from '../types';

export default function useProject(id: EntityId): ProjectEntity | undefined {
  return useAppSelector((state) => selectProjectById(state, id));
}
