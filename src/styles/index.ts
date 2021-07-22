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

export const SrOnlyCSS = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
