import styled, { css } from 'styled-components';
import { EntityId } from '@reduxjs/toolkit';
import { useState } from 'react';
import { CenteredFlexCSS } from '../../styles';
import { HeaderTag, WithClassName } from '../../util/types';
import useProject from './useProject';
import useAppDispatch from '../../hooks/useAppDispatch';
import removeProjectInList from '../../store/deadlines/actions/removeProjectInList';
import { updateProject } from './projectsSlice';
import getDifference from '../../util/getDifference';
import { ProjectOptions } from './types';
import blurOnMouseUp from '../../util/blurOnMouseUp';
import useHandleTitleChange from './useHandleTitleChange';
import useEditMode from '../../hooks/useEditMode';
import useHandleDeadlineChange from '../../hooks/useHandleDeadlineChange';
import Countdown from '../time/countdown';
import DateTime from '../time/date-time';
import HiddenLabelTextInput from '../ui/hidden-label-text-input';
import IconButton from '../ui/icon-button';

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

const WarnDiv = styled.div`
  ${HeaderCSS}
  color: ${({ theme }) => theme.colors.alert};
`;

const Header = styled.h3<{ $color?: string }>`
  ${HeaderCSS}
  margin-bottom: 0.25rem;

  color: ${({ $color }) => $color ?? 'inherit'};
`;

const HeaderInput = styled(HiddenLabelTextInput)`
  input {
    max-width: 100%;
    ${HeaderCSS}
    margin-bottom: 0.25rem;
    text-align: center;

    @media (min-width: 481px) {
      text-align: left;
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

export interface ProjectProps {
  id: EntityId,
  headerAs?: HeaderTag,
}

/**
 * Displays information about a project including a countdown to its deadline.
 */
const ProjectRaw = ({
  className,
  id,
  headerAs = 'h3',
  ...rest
}: WithClassName<ProjectProps>): JSX.Element => {
  const project = useProject(id);
  const dispatch = useAppDispatch();
  const [mode, toggleEditMode] = useEditMode('display');
  const [draftDeadlineInvalid, setDraftDeadlineInvalid] = useState(false);
  const [draft, setDraft] = useState<ProjectOptions>({
    deadline: new Date(project?.deadline ?? 'Invalid Date').toLocaleString() ?? 'Invalid Date',
    title: project?.title ?? '',
  });
  const handleDraftTitleChange = useHandleTitleChange(setDraft);
  const handleDeadlineChange = useHandleDeadlineChange(setDraftDeadlineInvalid, setDraft);

  if (!project) {
    return (
      <VisualizationDiv className={className}>
        <WarnDiv>Project Not Found!</WarnDiv>
      </VisualizationDiv>
    );
  }

  const {
    deadline,
    title,
    displayColor,
    projectListId,
  } = project;

  const modeParams = {
    /** ######### */
    /** EDIT MODE */
    /** ######### */
    edit: {
      /** HEADER ELEMENT */
      header: (
        <HeaderInput
          id={`${id}-title`}
          value={draft.title ?? title}
          onChange={handleDraftTitleChange}
        />
      ),
      /** DEADLINE ELEMENT */
      deadline: (
        <DeadlineInput
          $invalid={draftDeadlineInvalid}
          id={`${id}-deadline`}
          value={draft.deadline ?? new Date(deadline).toLocaleString()}
          onChange={handleDeadlineChange}
        />
      ),
      /** POSITIVE ACTION BUTTON PARAMS */
      positive: {
        label: 'Save Changes',
        icon: 'save' as const,
        action() {
          const meridiem = draft.deadline.slice(-2).toLowerCase();
          let draftDeadline;
          if (meridiem === 'am' || meridiem === 'pm') {
            draftDeadline = `${draft.deadline.slice(0, draft.deadline.length - 2)} ${meridiem}`;
          } else {
            draftDeadline = draft.deadline;
          }
          const draftDate = (new Date(draftDeadline)).toString();
          if (draftDate === 'Invalid Date') {
            setDraftDeadlineInvalid(true);
          } else {
            const changes = getDifference({
              ...draft,
              deadline: draftDeadline,
            }, project);
            if (Object.keys(changes).length) dispatch(updateProject({ id, changes }));
            toggleEditMode();
          }
        },
      },
      /** NEGATIVE ACTION BUTTON PARAMS */
      negative: {
        label: 'Cancel Changes',
        icon: 'close' as const,
        action() {
          setDraft({ deadline: new Date(deadline).toLocaleString(), title, displayColor });
          toggleEditMode();
        },
      },
    },
    /** ############ */
    /** DISPLAY MODE */
    /** ############ */
    display: {
      /** HEADER ELEMENT */
      header: (
        <Header as={headerAs} $color={displayColor}>{title}</Header>
      ),
      /** DEADLINE ELEMENT */
      deadline: (
        <DateTime dateTime={deadline} />
      ),
      /** POSITIVE ACTION BUTTON PARAMS */
      positive: {
        label: 'Edit Project',
        icon: 'pencil' as const,
        action: toggleEditMode,
      },
      /** NEGATIVE ACTION BUTTON PARAMS */
      negative: {
        label: 'Delete Project',
        icon: 'delete' as const,
        action() {
          dispatch(removeProjectInList({
            projectId: id,
            projectListId,
          }));
        },
      },
    },
  };

  return (
    <WrapperDiv
      $borderColor={displayColor}
      className={className}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <VisualizationDiv>
        <InfoDiv $maxWidth={infoDivMaxWidth[mode]}>
          {modeParams[mode].header}
          <div>
            <DueSpan>Deadline</DueSpan>
            :
            {' '}
            {modeParams[mode].deadline}
          </div>
        </InfoDiv>
        {new Date() < new Date(deadline)
          ? (<StyledCountdown end={deadline} />)
          : (<PassedEndDiv>The Deadline Has Passed!</PassedEndDiv>)}
      </VisualizationDiv>
      <ControlsDiv>
        <StyledIconButton
          $bgColor="#00E676"
          icon={modeParams[mode].positive.icon}
          size="tiny"
          label={modeParams[mode].positive.label}
          iconColor="#fff"
          iconFocusColor="#2979FF"
          onMouseUp={blurOnMouseUp}
          onClick={modeParams[mode].positive.action}
        />
        <StyledIconButton
          $bgColor="#F44336"
          icon={modeParams[mode].negative.icon}
          size="tiny"
          label={modeParams[mode].negative.label}
          iconColor="#fff"
          iconFocusColor="#42A5F5"
          onMouseUp={blurOnMouseUp}
          onClick={modeParams[mode].negative.action}
        />
      </ControlsDiv>
    </WrapperDiv>
  );
};

const Project = styled(ProjectRaw)``;

export default Project;
