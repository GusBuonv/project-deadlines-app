import { EntityId } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { AppDispatch } from '../../../store/store';
import getDifference from '../../../util/getDifference';
import forceMeridianWhitespace from '../../time/util/forceMeridianWhitespace';
import { updateProject } from '../projectsSlice';

type NotifyProjectChangesDependencies = {
  id: EntityId,
  draftDeadline: string,
  draftTitle: string,
  deadline: string,
  title: string,
  dispatch: AppDispatch,
}

export default function useNotifyProjectChanges({
  id,
  draftDeadline,
  draftTitle,
  deadline,
  title,
  dispatch,
}: NotifyProjectChangesDependencies): () => boolean {
  return useCallback(() => {
    const testDeadline = forceMeridianWhitespace(draftDeadline);
    const draftDate = (new Date(testDeadline)).toString();
    if (draftDate === 'Invalid Date') {
      return false;
    }

    const changes = getDifference({
      title: draftTitle,
      deadline: testDeadline,
    }, {
      title,
      deadline,
    });
    if (Object.keys(changes).length) dispatch(updateProject({ id, changes }));
    return true;
  }, [title, deadline, draftDeadline, draftTitle, id, dispatch]);
}
