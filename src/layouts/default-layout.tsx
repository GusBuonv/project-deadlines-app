import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { CenteredFlexColumnCSS, SetPaddingX } from '../styles';
import { WithClassName } from '../util/types';
import DefaultMain from './partials/default-main';
import DefaultFooter from './partials/default-footer';

//
// Styles
//

const Container = styled.div`
  min-height: 100vh;
  ${CenteredFlexColumnCSS}

  &>${DefaultMain} {
    flex-grow: 1;
    ${SetPaddingX('0.5rem')}
  }
`;

const StyledDefaultFooter = styled(DefaultFooter)`
  ${Container}>& {
    ${SetPaddingX('0.5rem')}
  }
`;

//
// Component
//

export interface DefaultLayoutProps extends PropsWithChildren<unknown> {
}

const DefaultLayoutRaw = ({
  children,
  className,
}: WithClassName<DefaultLayoutProps>): JSX.Element => (
  <Container className={className}>
    <DefaultMain>
      {children}
    </DefaultMain>
    <StyledDefaultFooter />
  </Container>
);

const DefaultLayout = styled(DefaultLayoutRaw)``;

export default DefaultLayout;
