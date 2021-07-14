import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { HasClassName } from '../../util/types';
import SrOnlyLabel from './sr-only-label';

interface HiddenLabelTextInputProps {
  value: string,
  id: string,
  onChange: ChangeEventHandler<HTMLElement>,
}

function HiddenLabelTextInputRaw({
  value,
  onChange,
  id,
  className,
}: HiddenLabelTextInputProps & HasClassName): JSX.Element {
  return (
    <div className={className}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <SrOnlyLabel htmlFor={id}>
        Project Title
      </SrOnlyLabel>
      <input
        id={id}
        value={value}
        type="text"
        onChange={onChange}
      />
    </div>
  );
}

const HiddenLabelTextInput = styled(HiddenLabelTextInputRaw)``;

export default HiddenLabelTextInput;
