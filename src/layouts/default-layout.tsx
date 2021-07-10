import { PropsWithChildren, ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { CenteredFlexColumnCSS } from '../styles';
import DefaultFooter from './partials/default-footer';

//
// Styles
//

const Container = styled.div`
  min-height: 100vh;
  ${CenteredFlexColumnCSS}
`;

const XPaddedCSS = css`
  --padding-x: 0.5rem;
  padding-left: var(--padding-x);
  padding-right: var(--padding-x);
`;

export const Main = styled.main`
  width: 100%;
  max-width: 48rem;
  --margin-x: auto;
  margin-left: var(--margin-x);
  margin-right: var(--margin-x);
  --padding-y: 5rem;
  padding-top: var(--padding-y);
  padding-bottom: var(--padding-y);

  ${Container}>& {
    flex-grow: 1;
    ${XPaddedCSS}
  }

  ${CenteredFlexColumnCSS}
`;

const StyledDefaultFooter = styled(DefaultFooter)`
  ${Container}>& {
    ${XPaddedCSS}
  }
`;

//
// Component
//

export type DefaultLayoutProps = WithClassName<PropsWithChildren<{
  [x: string]: unknown,
}>>;

const DefaultLayout = ({
  children,
  className,
}: DefaultLayoutProps): ReactElement => (
  <Container className={className}>
    <Main>
      {children}
    </Main>
    <StyledDefaultFooter />
  </Container>
);

export default DefaultLayout;
