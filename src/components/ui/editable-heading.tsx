import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import assertModeIsKnown from '../../util/assertModeIsKnown';
import { EditModes, HasClassName, HeadingTag } from '../../util/types';
import Heading from '../heading';
import HiddenLabelTextInput from './hidden-label-text-input';

export interface EditableHeadingParams {
  text: string,
  draft: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  mode: EditModes,
  headingTag?: HeadingTag,
}

const EditableHeadingRaw = ({
  text,
  draft,
  onChange,
  className,
  headingTag,
  mode,
}: EditableHeadingParams & HasClassName): JSX.Element => {
  let component;
  switch (mode) {
    case 'display':
      component = (<Heading className={className} as={headingTag ?? 'div'}>{text}</Heading>);
      break;
    case 'edit':
      component = (
        <HiddenLabelTextInput
          value={draft}
          onChange={onChange}
        />
      );
      break;
    default:
      assertModeIsKnown(mode);
  }

  return component;
};

const EditableHeading = styled(EditableHeadingRaw)``;

export default EditableHeading;
