import { ReactElement } from 'react';
import styled from 'styled-components';
import { CenteredFlexCSS } from '../styles';
import { WithClassName } from '../util/types';
import IconButton, { IconButtonProps } from './icon-button';
import { IconSize } from './icon';

//
// Style
//

const WrapperSpan = styled.span`
  ${CenteredFlexCSS}
`;

const LabelSpan = styled.span<{
  $marginLeft: string,
  $fontSize: string,
  $fontWeight: string
}>`
  margin-left: ${({ $marginLeft }) => $marginLeft};

  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};
`;

//
// Component
//

type ValidIconSize = Exclude<IconSize, 'tiny'>;

const labelMargin: { readonly [K in ValidIconSize]: string} = {
  small: '0.25rem',
  medium: '0.75rem',
  large: '1.25rem',
};

const labelSizes: { readonly [K in ValidIconSize]: string} = {
  small: '1.5rem',
  medium: '2.5rem',
  large: '3rem',
};

const labelWeights: { readonly [K in ValidIconSize]: string } = {
  small: '500',
  medium: '600',
  large: '700',
};

type LabelledAddButtonProps = (
  & Omit<IconButtonProps, 'size'>
  & { size: ValidIconSize }
);

const LabelledIconButtonRaw = ({
  className,
  size,
  icon,
  iconColor,
  label,
  iconFocusColor,
  onClick,
}: WithClassName<LabelledAddButtonProps>): ReactElement => (
  <WrapperSpan className={className}>
    <IconButton
      size={size}
      icon={icon}
      iconColor={iconColor}
      label={label}
      iconFocusColor={iconFocusColor}
      onClick={onClick}
    />
    <LabelSpan
      $marginLeft={labelMargin[size]}
      $fontSize={labelSizes[size]}
      $fontWeight={labelWeights[size]}
    >
      {label}
    </LabelSpan>
  </WrapperSpan>
);

const LabelledIconButton = styled(LabelledIconButtonRaw)``;

export default LabelledIconButton;
