import { ReactElement } from 'react';
import styled from 'styled-components';
import { CenteredFlexCSS } from '../../styles';
import { WithClassName } from '../../util/types';

//
// Styles
//

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  --padding-y: 0.75rem;
  padding-top: var(--padding-y);
  padding-bottom: var(--padding-y);

  --item-height: 1.5rem;
  font-size: var(--item-height);
  line-height: var(--item-height);

  ${CenteredFlexCSS}
`;

const Span = styled.span`
  ${Footer}>& {
    height: var(--item-height);
    margin-left: 0.5rem;
  }

  ${Footer}>&:first-child {
    margin-left: 0;
  }
`;

//
// Component
//

type DefaultFooterProps = WithClassName<{
  [x: string]: unknown,
}>;

const DefaultFooter = ({
  className,
}: DefaultFooterProps): ReactElement => (
  <Footer className={className}>
    <Span>Made for</Span>
    <Span>
      <img src="/koala-logo.png" alt="Koala Logo" width="108" height="24" />
    </Span>
  </Footer>
);

export default DefaultFooter;
