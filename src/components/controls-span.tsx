import styled from 'styled-components';
import { CenteredFlexCSS, SetMarginX } from '../styles';
import LabelledIconButton from './labelled-icon-button';

const ControlsSpan = styled.span`
  width: 100%;
  ${CenteredFlexCSS}
  flex-wrap: wrap;

  &>${LabelledIconButton} {
    ${SetMarginX('1.5rem')}
  }
`;

export default ControlsSpan;
