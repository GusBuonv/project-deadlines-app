import { memo } from 'react';
import styled from 'styled-components';
import SrOnlyLabel from '../components/ui/sr-only-label';
import { CenteredFlexCSS, SetPaddingY } from '../styles';
import { WithClassName } from '../util/types';

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
  ${Footer}>&:not(:first-child) {
    margin-left: 0.5rem;
  }
`;

const IconLink = styled.a`
  display: block;
  padding: 4px;
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
    <Span>Made with 💜 by Gus Buonviri:</Span>
    <Span>
      <IconLink href="https://github.com/GusBuonv" rel="noopener">
        <SrOnlyLabel as="span">Check out the source on GitHub!</SrOnlyLabel>
        <img
          src="/GitHub-Mark-64px.png"
          alt="GitHub Octocat Logo"
          width="32"
          height="32"
          srcSet="/GitHub-Mark-32px.png 32w, /GitHub-Mark-64px.png 64w"
        />
      </IconLink>
    </Span>
    <Span>
      <IconLink href="https://www.linkedin.com/in/augustus-buonviri-344524ab" rel="noopener">
        <SrOnlyLabel as="span">Connect with me on LinkedIn!</SrOnlyLabel>
        <img
          src="/LinkedIn-Mark-64px.png"
          alt="LinkedIn Logo"
          width="32"
          height="32"
          srcSet="/LinkedIn-Mark-32px.png 32w, /LinkedIn-Mark-64px.png 64w"
        />
      </IconLink>
    </Span>
  </Footer>
);

const DefaultFooter = styled(memo(DefaultFooterRaw))``;

export default DefaultFooter;
