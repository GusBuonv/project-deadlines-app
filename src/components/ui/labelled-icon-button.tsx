import { memo } from 'react';
import styled from 'styled-components';
import IconButton, { IconButtonProps } from './icon-button';
import { IconSize } from './icon';
import { WithClassName } from '../../util/types';

//
// Style
//

const WrapperSpan = styled.span<{
  $columnGap: string,
  $fontSize: string,
  $fontWeight: string
}>`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-auto-flow: column;
  column-gap: ${({ $columnGap }) => $columnGap};

  text-align: center;
  font-size: ${({ $fontSize }) => $fontSize};
  font-weight: ${({ $fontWeight }) => $fontWeight};
`;

//
// Component
//

type ValidIconSize = Exclude<IconSize, 'tiny'>;

const columnGaps: Readonly<Record<ValidIconSize, string>> = {
  small: '0.25rem',
  medium: '0.75rem',
  large: '1.25rem',
};

const fontSizes: Readonly<Record<ValidIconSize, string>> = {
  small: '1.5rem',
  medium: '2.5rem',
  large: '3rem',
};

const fontWeights: Readonly<Record<ValidIconSize, string>> = {
  small: '500',
  medium: '600',
  large: '700',
};

interface LabelledAddButtonProps extends Omit<IconButtonProps, 'size'> {
  size: ValidIconSize
}

const LabelledIconButton = ({
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
  <WrapperSpan
    // TODO: Remove spread after flip-toolkit is removed
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    className={className}
    $columnGap={columnGaps[size]}
    $fontSize={fontSizes[size]}
    $fontWeight={fontWeights[size]}
  >
    <IconButton
      size={size}
      icon={icon}
      iconColor={iconColor}
      label={label}
      iconFocusColor={iconFocusColor}
      onMouseUp={onMouseUp}
      onClick={onClick}
    />
    <span>{label}</span>
  </WrapperSpan>
);

/** An \<IconButton\> with visible label text  */
export default styled(memo(LabelledIconButton))``;
