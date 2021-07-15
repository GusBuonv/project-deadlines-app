import { nanoid } from '@reduxjs/toolkit';
import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { HasClassName } from '../../util/types';
import SrOnlyLabel from './sr-only-label';

interface HiddenLabelTextInputProps {
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
}

function HiddenLabelTextInputRaw({
  value,
  onChange,
  className,
}: HiddenLabelTextInputProps & HasClassName): JSX.Element {
  const [id] = useState(nanoid());
  return (
    <div className={className}>
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
