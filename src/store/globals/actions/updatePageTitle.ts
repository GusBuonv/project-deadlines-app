import { createAction } from '@reduxjs/toolkit';

export const UpdatePageTitleActionType = 'globals/updatePageTitle';

export type UpdatePageTitlePayload = string;

const updatePageTitle = createAction<UpdatePageTitlePayload>(UpdatePageTitleActionType);

export default updatePageTitle;
