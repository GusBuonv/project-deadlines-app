import { memo } from 'react';
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

interface LabelledAddButtonProps extends Omit<IconButtonProps, 'size'> {
  size: ValidIconSize
}

const LabelledIconButtonRaw = ({
  className,
  size,
  icon,
  iconColor,
  label,
  iconFocusColor,
  onMouseUp,
  onClick,
  ...rest
}: WithClassName<LabelledAddButtonProps>): JSX.Element => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <WrapperSpan className={className} {...rest}>
    <IconButton
      size={size}
      icon={icon}
      iconColor={iconColor}
      label={label}
      iconFocusColor={iconFocusColor}
      onMouseUp={onMouseUp}
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

const LabelledIconButton = styled(memo(LabelledIconButtonRaw))``;

export default LabelledIconButton;
