import { Component, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { HasClassName, HeadingTag } from '../util/types';

interface HeadingProps {
  as: HeadingTag,
}

const HeadingRaw = ({
  as,
  className,
  children,
}: PropsWithChildren<HeadingProps> & HasClassName): JSX.Element => (
  <Component as={as} className={className}>{children}</Component>
);

const Heading = styled(HeadingRaw)``;

export default Heading;
