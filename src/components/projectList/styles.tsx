/* eslint-disable import/prefer-default-export */
import { css } from 'styled-components';

export const ProjectListWrapperCSS = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const ProjectListHeaderCSS = css`
  margin-left: 1rem;

  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3rem;

  @media (min-width: 481) {
    font-size: 3rem;
  }
`;
