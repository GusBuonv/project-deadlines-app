/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import { useCallback } from 'react';
import useTextInputValue from './hooks/useTextInputValue';
import useEditMode from './hooks/useEditMode';
import blurOnMouseUp from '../../util/blurOnMouseUp';
import { HasClassName, HeadingTag } from '../../util/types';
import IconButton from './icon-button';
import EditableHeading from './editable-heading';
import assertModeIsKnown from '../../util/assertModeIsKnown';

export interface EditableHeadingWithButtonParams {
  text: string,
  onChange: (text: string) => void,
  saveLabel?: string,
  editLabel?: string,
  headingTag?: HeadingTag,
}

const EditableHeadingWithButtonRaw = ({
  text,
  onChange,
  className,
  saveLabel,
  editLabel,
  headingTag,
  ...rest
}: EditableHeadingWithButtonParams & HasClassName): JSX.Element => {
  const [mode, toggleEditMode] = useEditMode('display');
  const [draft, handleDraftChange] = useTextInputValue(text);
  const toggleAndNotifyChanges = useCallback(() => {
    if (draft !== text) onChange(draft);
    toggleEditMode();
  }, [draft, text, toggleEditMode, onChange]);

  let button;
  switch (mode) {
    case 'display':
      button = (
        <IconButton
          icon="pencil"
          size="medium"
          label={editLabel ?? 'Edit'}
          iconFocusColor="#0f0"
          onClick={toggleEditMode}
          onMouseUp={blurOnMouseUp}
        />
      );
      break;
    case 'edit':
      button = (
        <IconButton
          icon="save"
          size="medium"
          label={saveLabel ?? 'Save Changes'}
          iconFocusColor="#0f0"
          onClick={toggleAndNotifyChanges}
          onMouseUp={blurOnMouseUp}
        />
      );
      break;
    default: {
      assertModeIsKnown(mode);
    }
  }

  return (
    <div className={className} {...rest}>
      <EditableHeading
        headingTag={headingTag}
        mode={mode}
        text={text}
        draft={draft}
        onChange={handleDraftChange}
      />
      {button}
    </div>
  );
};

const EditableHeadingWithButton = styled(EditableHeadingWithButtonRaw)``;

export default EditableHeadingWithButton;
