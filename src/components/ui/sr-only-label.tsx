import styled from 'styled-components';
import { SrOnlyCSS } from '../../styles';

/** \<label\> element that is visible only to screen readers */
const SrOnlyLabel = styled.label`
  ${SrOnlyCSS}
`;

export default SrOnlyLabel;
