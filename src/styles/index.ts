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

export const VerticalListMarginCSS = css`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
