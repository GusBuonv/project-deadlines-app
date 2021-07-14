import styled from 'styled-components';
import { CenteredFlexColumnCSS, SetMarginX, SetPaddingY } from '../styles';

const DefaultMain = styled.main`
  width: 100%;
  max-width: 48rem;
  ${SetMarginX('auto')}
  ${SetPaddingY('5rem')}

  ${CenteredFlexColumnCSS}
`;

export default DefaultMain;
