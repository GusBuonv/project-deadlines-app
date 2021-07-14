import { RootState } from '../../store';

const selectPageTitle = (state: RootState): string => state.globals.pageTitle;

export default selectPageTitle;
