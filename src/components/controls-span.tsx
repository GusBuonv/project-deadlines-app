import styled from 'styled-components';
import { CenteredFlexCSS } from '../styles';
import LabelledIconButton from './labelled-icon-button';

const ControlsSpan = styled.span`
  width: 100%;
  ${CenteredFlexCSS}
  flex-wrap: wrap;

  &>${LabelledIconButton} {
    margin-left: 1.5rem;
  }
`;

export default ControlsSpan;
