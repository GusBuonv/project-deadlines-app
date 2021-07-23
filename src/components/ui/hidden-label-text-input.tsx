import { nanoid } from '@reduxjs/toolkit';
import { ChangeEventHandler, useState } from 'react';
import styled from 'styled-components';
import { HasClassName } from '../../util/types';
import SrOnlyLabel from './sr-only-label';

interface HiddenLabelTextInputProps extends HasClassName {
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
}

const HiddenLabelTextInput = ({
  value,
  onChange,
  className,
}: HiddenLabelTextInputProps): JSX.Element => {
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
};

/** \<input type="text"\> with an accompanying label visible only to screen readers */
export default styled(HiddenLabelTextInput)``;
