import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import assertModeIsKnown from '../../util/assertModeIsKnown';
import { EditModes, HasClassName, HeadingTag } from '../../util/types';
import Heading from '../heading';
import HiddenLabelTextInput from './hidden-label-text-input';

export interface EditableHeadingProps extends HasClassName {
  text: string,
  draft: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  mode: EditModes,
  headingTag?: HeadingTag,
}

const EditableHeading = ({
  text,
  draft,
  onChange,
  className,
  headingTag = 'div',
  mode,
}: EditableHeadingProps): JSX.Element => {
  switch (mode) {
    case 'display':
      return (
        <Heading
          className={className}
          as={headingTag}
        >
          {text}
        </Heading>
      );
    case 'edit':
      return (
        <HiddenLabelTextInput
          className={className}
          value={draft}
          onChange={onChange}
        />
      );
    default:
      assertModeIsKnown(mode);
  }
};

/** A Heading that can be toggled into an edit mode */
export default styled(EditableHeading)``;
