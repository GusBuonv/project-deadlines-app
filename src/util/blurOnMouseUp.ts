import { MouseEventHandler } from 'react';

const blurOnMouseUp: MouseEventHandler<HTMLElement> = ({ currentTarget }) => currentTarget.blur();

export default blurOnMouseUp;
