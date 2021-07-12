import { css, FlattenSimpleInterpolation } from 'styled-components';

/**
 * Layout
 */

export const SetMarginX = (marginX: string): FlattenSimpleInterpolation => css`
  margin-left: ${marginX};
  margin-right: ${marginX};
`;

export const SetPaddingY = (paddingY: string): FlattenSimpleInterpolation => css`
  padding-top: ${paddingY};
  padding-bottom: ${paddingY};
`;

export const SetPaddingX = (paddingX: string): FlattenSimpleInterpolation => css`
  padding-left: ${paddingX};
  padding-right: ${paddingX};
`;

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
