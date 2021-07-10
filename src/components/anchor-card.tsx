import { ComponentProps, ReactElement } from 'react';
import styled, { StyledProps } from 'styled-components';

//
// Styles
//

const A = styled.a`
  padding: 1.5rem;

  border: 1px solid #eaeaea;
  border-radius: 10px;

  color: inherit;
  text-align: left;
  text-decoration: none;

  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }
`;

const H2 = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const P = styled.p`
  font-size: 1.25rem;
  line-height: 1.5;
`;

//
// Component
//

export type CardProps = WithClassName<{
  title: string,
  description: string,
  href: string,
}>

const AnchorCard = ({
  title,
  description,
  href,
  className,
}: CardProps): ReactElement => (
  <A className={className} href={href}>
    <H2>
      {title}
      {' '}
      &rarr;
    </H2>
    <P>{description}</P>
  </A>
);

export default AnchorCard;
