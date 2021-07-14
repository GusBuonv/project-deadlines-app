import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { WithClassName } from '../../util/types';
import Icon, { IconType, IconSize, IconProps } from './icon';

//
// Style
//

const Button = styled.button<{ $color?: string, $focusColor?: string }>`
  fill: ${({ $color }) => $color ?? 'inherit'};

  &:hover,
  &:focus,
  &:active {
      fill: ${({ $focusColor }) => $focusColor ?? '#0099ff'};
  }
`;

const StyledIcon = styled(Icon)<{ $margin: string }>`
  margin: ${({ $margin }) => $margin};
`;

//
// Component
//

const iconMargins: { readonly [K in IconSize]: string } = {
  tiny: '8px',
  small: '0',
  medium: '0',
  large: '0',
};

export interface IconButtonProps extends Omit<IconProps, 'color'> {
  size: IconSize,
  label: string,
  icon: IconType,
  iconColor?: string,
  iconFocusColor?: string,
  onMouseUp?: MouseEventHandler<HTMLButtonElement>,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

const IconButtonRaw = ({
  className,
  size,
  label,
  icon,
  iconColor,
  iconFocusColor,
  onClick,
  onMouseUp,
}: WithClassName<IconButtonProps>): JSX.Element => (
  <Button
    $color={iconColor}
    $focusColor={iconFocusColor}
    className={className}
    type="button"
    aria-label={label}
    onClick={onClick}
    onMouseUp={onMouseUp}
  >
    <StyledIcon
      $margin={iconMargins[size]}
      size={size}
      icon={icon}
    />
  </Button>
);

const IconButton = styled(memo(IconButtonRaw))``;

export default IconButton;
