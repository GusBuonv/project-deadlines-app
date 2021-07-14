import styled, { css } from 'styled-components';
import { EntityId } from '@reduxjs/toolkit';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { CenteredFlexCSS } from '../../styles';
import { WithClassName } from '../../util/types';
import Countdown from '../countdown';
import DateTime from '../date-time';
import useProject from './useProject';
import IconButton from '../icon-button';
import useAppDispatch from '../../hooks/useAppDispatch';
import removeProjectInList from '../../store/actions/removeProjectInList';
import { updateProject } from './projectsSlice';
import getDifference from '../../util/getDifference';
import { ProjectOptions } from './types';
import blurOnMouseUp from '../../util/blurOnMouseUp';
import useToggleEditMode from '../../hooks/useToggleEditMode';
import useHandleTitleChange from './useHandleTitleChange';

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

const H2 = styled.h2<{ $color?: string }>`
  ${HeaderCSS}
  margin-bottom: 0.25rem;

  color: ${({ $color }) => $color ?? 'inherit'};
`;

const HeaderInput = styled.input`
  position: relative;
  max-width: 100%;
  ${HeaderCSS}
  margin-bottom: 0.25rem;
  text-align: center;

  @media (min-width: 481px) {
    text-align: left;
  }

  &::before:active {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0.25rem;
    border-width: 2px;
    border-style: solid;
  }
`;

const DueSpan = styled.span`
  text-decoration: underline;
`;

const DeadlineInput = styled.input<{ $invalid: boolean }>`
  color: ${({ $invalid }) => ($invalid ? '#f00' : 'inherit')};
`;

const DeadlineInputWrapper = styled.div`
  display: inline-block;
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

const SrOnlyLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

//
// Component
//

export interface ProjectProps {
  id: EntityId,
}

/**
 * Displays information about a project including a countdown to its deadline.
 */
const ProjectRaw = ({
  className,
  id,
  ...rest
}: WithClassName<ProjectProps>): JSX.Element => {
  const project = useProject(id);
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<'edit' | 'display'>('display');
  const [draftDeadlineInvalid, setDraftDeadlineInvalid] = useState(false);
  const [draft, setDraft] = useState<ProjectOptions>({
    deadline: new Date(project?.deadline ?? 'Invalid Date').toLocaleString() ?? 'Invalid Date',
    title: project?.title ?? '',
  });

  const toggleEditMode = useToggleEditMode(setMode);

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = useHandleTitleChange(setDraft);

  const handleDeadlineChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setDraftDeadlineInvalid(false);
    setDraft((state) => ({
      ...state,
      deadline: e.target.value,
    }));
  }, [setDraft, setDraftDeadlineInvalid]);

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
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <SrOnlyLabel htmlFor={`${id}-title`}>
            Project Title
          </SrOnlyLabel>
          <HeaderInput
            id={`${id}-title`}
            value={draft.title ?? title}
            type="text"
            onChange={handleTitleChange}
          />
        </div>
      ),
      /** DEADLINE ELEMENT */
      deadline: (
        <DeadlineInputWrapper>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <SrOnlyLabel htmlFor={`${id}-deadline`}>
            Project Deadline
          </SrOnlyLabel>
          <DeadlineInput
            $invalid={draftDeadlineInvalid}
            id={`${id}-deadline`}
            value={draft.deadline ?? new Date(deadline).toLocaleString()}
            type="text"
            onChange={handleDeadlineChange}
          />
        </DeadlineInputWrapper>
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
        <H2 $color={displayColor}>{title}</H2>
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
