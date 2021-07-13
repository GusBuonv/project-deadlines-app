import { memo } from 'react';
import styled from 'styled-components';
import { CenteredFlexCSS, SetPaddingY } from '../../styles';
import { WithClassName } from '../../util/types';

//
// Styles
//

const itemHeight = '1.5rem';

const Footer = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;

  ${SetPaddingY('0.75rem')}

  font-size: ${itemHeight};
  line-height: ${itemHeight};

  ${CenteredFlexCSS}
`;

const Span = styled.span`
  ${Footer}>& {
    height: ${itemHeight};
    margin-left: 0.5rem;
  }

  ${Footer}>&:first-child {
    margin-left: 0;
  }
`;

//
// Component
//

export interface DefaultFooterProps {
}

const DefaultFooterRaw = ({
  className,
  ...rest
}: WithClassName<DefaultFooterProps>): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Footer className={className} {...rest}>
    <Span>Made for</Span>
    <Span>
      <img src="/koala-logo.png" alt="Koala Logo" width="108" height="24" />
    </Span>
  </Footer>
);

const DefaultFooter = styled(memo(DefaultFooterRaw))``;

export default DefaultFooter;
