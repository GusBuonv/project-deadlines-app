/* eslint-disable react/jsx-props-no-spreading */
import styled, { css } from 'styled-components';
import { EntityId } from '@reduxjs/toolkit';
import { createRef, useState } from 'react';
import { CenteredFlexCSS } from '../../styles';
import { HeadingTag, WithClassName } from '../../util/types';
import useAppDispatch from '../../hooks/useAppDispatch';
import { ProjectEntity } from './types';
import blurOnMouseUp from '../../util/blurOnMouseUp';
import useEditMode from '../ui/hooks/useEditMode';
import Countdown from '../time/countdown';
import DateTime from '../time/date-time';
import HiddenLabelTextInput from '../ui/hidden-label-text-input';
import IconButton from '../ui/icon-button';
import useTextInputValue from '../ui/hooks/useTextInputValue';
import assertModeIsKnown from '../../util/assertModeIsKnown';
import useDeleteProject from './hooks/useDeleteProject';
import useLockTitleHeightAndToggle from './hooks/useLockTitleHeightAndToggle';
import useNotifyProjectChanges from './hooks/useNotifyProjectChanges';
import useToggleAndNotifyChanges from './hooks/useToggleAndNotifyChanges';
import useToggleAndReset from './hooks/useToggleAndReset';

//
// Styles
//

const WrapperDiv = styled.div<{ $borderColor?: string }>`
  width: 100%;

  border-radius: 0.5rem;
  border-style: solid;
  border-width: 3px;
  border-color: ${({ $borderColor }) => $borderColor};

  display: grid;
  grid-auto-flow: row;

  overflow: hidden;

  @media (min-width: 481px) {
    grid-auto-flow: column;
    grid-template-columns: minmax(0, 1fr) max-content;
  }
`;

const VisualizationDiv = styled.div`
  padding: 1rem;

  display: grid;
  grid-auto-flow: row;
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: 481px) {
    grid-auto-flow: column;
    grid-template-columns: 60% minmax(40%, 1fr);
    column-gap: 0.4rem;
  }
`;

const ControlsDiv = styled.div`
  display: grid;
  grid-auto-flow: column;

  @media (min-width: 481px) {
    grid-auto-flow: row;
  }
`;

const infoDivMaxWidth = {
  edit: '50%',
  display: 'max-content',
};

const InfoDiv = styled.div<{ $maxWidth: string }>`
  max-width: 100%;
  margin-right: 0.5rem;
  justify-self: center;
  text-align: center;

  @media (min-width: 481px) {
    justify-self: flex-start;
    align-self: center;
    text-align: left;
  }
`;

const HeaderCSS = css`
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.5rem;

  @media (min-width: 481px) {
    font-size: 2.5rem;
  }
`;

const Header = styled.h3<{ $color?: string }>`
  ${HeaderCSS}
  margin-bottom: 0.25rem;

  color: ${({ $color }) => $color ?? 'inherit'};
`;

const HeaderInput = styled(HiddenLabelTextInput)<{ $height: number | undefined }>`
  height: ${({ $height }) => `${$height}px` ?? 'auto'};
  margin-bottom: 0.25rem;

  input {
    max-width: 100%;
    ${HeaderCSS}
    text-align: center;

    @media (min-width: 481px) {
      text-align: left;
      font-size: 2.22rem;
    }
  }
`;

const DueSpan = styled.span`
  text-decoration: underline;
`;

const DeadlineInput = styled(HiddenLabelTextInput)<{ $invalid: boolean }>`
  display: inline-block;
  input {
    color: ${({ $invalid }) => ($invalid ? '#f00' : 'inherit')};
  }
`;

const CountdownCSS = css`
  text-align: center;
  margin-top: 0.5rem;

  font-size: 2rem;
  font-weight: 500;
`;
const StyledCountdown = styled(Countdown)`
  ${CountdownCSS}

  @media (min-width: 481px) {
    justify-content: center;
  }
`;

const PassedEndDiv = styled.div`
  ${CountdownCSS}
`;

const StyledIconButton = styled(IconButton)<{ $bgColor: string }>`
  width: 100%;

  ${CenteredFlexCSS};

  background: ${({ $bgColor }) => $bgColor};

  @media (min-width: 481px) {
    width: auto;
    height: 100%;
  }
`;

//
// Component
//

export interface ProjectRawProps extends ProjectEntity {
  id: EntityId,
  headerAs?: HeadingTag,
}

type LocalModalComponentNames =
  | 'header'
  | 'deadline'
  | 'positive'
  | 'negative'

type LocalModalComponentMap = { [K in LocalModalComponentNames]: JSX.Element }

/**
 * Displays information about a project including a countdown to its deadline.
 */
const ProjectRaw = ({
  className,
  id,
  headerAs = 'h3',
  deadline,
  title,
  displayColor,
  projectListId,
  ...rest
}: WithClassName<ProjectRawProps>): JSX.Element => {
  const dispatch = useAppDispatch();
  const [mode, toggleEditMode] = useEditMode('display');
  const [isDraftDeadlineInvalid, setIsDraftDeadlineInvalid] = useState(false);
  const [draftTitle, handleDraftTitleChange, setDraftTitle] = useTextInputValue(title);
  const [
    draftDeadline,
    handleDraftDeadlineChange,
    setDraftDeadline,
  ] = useTextInputValue(() => (new Date(deadline).toLocaleString()));
  const headerRef = createRef<HTMLHeadingElement>();
  const [headerInputHeight, setHeaderInputHeight] = useState<undefined | number>();
  const notifyProjectChanges = useNotifyProjectChanges({
    draftDeadline,
    draftTitle,
    title,
    deadline,
    dispatch,
    id,
  });
  const toggleAndNotifyChanges = useToggleAndNotifyChanges({
    notifyProjectChanges,
    setIsDraftDeadlineInvalid,
    toggleEditMode,
  });
  const toggleAndReset = useToggleAndReset({
    setDraftDeadline,
    deadline,
    setDraftTitle,
    title,
    toggleEditMode,
  });
  const lockTitleHeightAndToggle = useLockTitleHeightAndToggle({
    headerRef,
    setHeaderInputHeight,
    toggleEditMode,
  });
  const deleteProject = useDeleteProject({
    dispatch,
    id,
    projectListId,
  });

  let components: LocalModalComponentMap;
  switch (mode) {
    case 'edit':
      components = {
        header: (
          <HeaderInput
            $height={headerInputHeight}
            value={draftTitle ?? title}
            onChange={handleDraftTitleChange}
          />
        ),
        deadline: (
          <DeadlineInput
            $invalid={isDraftDeadlineInvalid}
            value={draftDeadline ?? new Date(deadline).toLocaleString()}
            onChange={handleDraftDeadlineChange}
          />
        ),
        positive: (
          <StyledIconButton
            $bgColor="#00E676"
            icon="save"
            size="tiny"
            label="Save Changes"
            iconColor="#fff"
            iconFocusColor="#2979FF"
            onMouseUp={blurOnMouseUp}
            onClick={toggleAndNotifyChanges}
          />
        ),
        negative: (
          <StyledIconButton
            $bgColor="#F44336"
            icon="close"
            size="tiny"
            label="Cancel Changes"
            iconColor="#fff"
            iconFocusColor="#42A5F5"
            onMouseUp={blurOnMouseUp}
            onClick={toggleAndReset}
          />
        ),
      } as const;
      break;
    case 'display':
      components = {
        header: (
          <Header as={headerAs} ref={headerRef} $color={displayColor}>{title}</Header>
        ),
        deadline: (
          <DateTime dateTime={deadline} />
        ),
        positive: (
          <StyledIconButton
            $bgColor="#00E676"
            icon="pencil"
            size="tiny"
            label="Edit Project"
            iconColor="#fff"
            iconFocusColor="#2979FF"
            onMouseUp={blurOnMouseUp}
            onClick={lockTitleHeightAndToggle}
          />
        ),
        negative: (
          <StyledIconButton
            $bgColor="#F44336"
            icon="delete"
            size="tiny"
            label="Delete Project"
            iconColor="#fff"
            iconFocusColor="#42A5F5"
            onMouseUp={blurOnMouseUp}
            onClick={deleteProject}
          />
        ),
      };
      break;
    default:
      assertModeIsKnown(mode);
  }

  return (
    <WrapperDiv $borderColor={displayColor} className={className} {...rest}>
      <VisualizationDiv>
        <InfoDiv $maxWidth={infoDivMaxWidth[mode]}>
          {components.header}
          <div>
            <DueSpan>Deadline</DueSpan>
            :
            {' '}
            {components.deadline}
          </div>
        </InfoDiv>
        {new Date() < new Date(deadline)
          ? (<StyledCountdown end={deadline} />)
          : (<PassedEndDiv>The Deadline Has Passed!</PassedEndDiv>)}
      </VisualizationDiv>
      <ControlsDiv>
        {components.positive}
        {components.negative}
      </ControlsDiv>
    </WrapperDiv>
  );
};

export default ProjectRaw;
