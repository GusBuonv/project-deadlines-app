import { css } from 'styled-components';

/**
 * Layout
 */

export const CenteredFlexCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenteredFlexColumnCSS = css`
  ${CenteredFlexCSS}
  flex-direction: column;
`;
