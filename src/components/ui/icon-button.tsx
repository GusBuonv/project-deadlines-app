import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import Icon, { IconType, IconSize, IconProps } from './icon';

//
// Style
//

const Button = styled.button<{ $padding: string, $fill?: string, $focusFill?: string }>`
  padding: ${({ $padding }) => $padding};

  fill: ${({ $fill: $color }) => $color};

  &:hover,
  &:focus,
  &:active {
      fill: ${({ $focusFill: $focusColor }) => $focusColor ?? '#0099ff'};
  }
`;

//
// Component
//

const paddings: Readonly<Record<IconSize, string>> = {
  tiny: '8px',
  small: '0',
  medium: '0',
  large: '0',
};

export interface IconButtonProps extends Omit<IconProps, 'color'> {
  size: IconSize,
  label: string,
  icon: IconType,
  type?: 'button' | 'submit',
  iconColor?: string,
  iconFocusColor?: string,
  onMouseUp?: MouseEventHandler<HTMLButtonElement>,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

const IconButton = ({
  className,
  size,
  label,
  icon,
  type = 'button',
  iconColor,
  iconFocusColor,
  onClick,
  onMouseUp,
}: IconButtonProps): JSX.Element => (
  <Button
    $padding={paddings[size]}
    $fill={iconColor}
    $focusFill={iconFocusColor}
    className={className}
    type={type}
    aria-label={label}
    onClick={onClick}
    onMouseUp={onMouseUp}
  >
    <Icon
      size={size}
      icon={icon}
    />
  </Button>
);

/** A \<button\> containing an SVG icon */
export default styled(memo(IconButton))``;
