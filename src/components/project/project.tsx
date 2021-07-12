import styled, { css } from 'styled-components';
import { EntityId } from '@reduxjs/toolkit';
import { CenteredFlexCSS, VerticalListMarginCSS } from '../../styles';
import { WithClassName } from '../../util/types';
import Countdown from '../countdown';
import DateTime from '../date-time';
import useProject from './useProject';
import IconButton from '../icon-button';
import useAppDispatch from '../../hooks/useAppDispatch';
import { removeProject } from './projectsSlice';
import { removeProjectFromList } from '../projectList/projectListsSlice';

//
// Styles
//

const WrapperDiv = styled.div<{ $borderColor?: string }>`
  width: 100%;

  ${VerticalListMarginCSS}

  border-radius: 0.5rem;
  border-style: solid;
  border-width: 3px;
  border-color: ${({ $borderColor }) => $borderColor};

  display: flex;
  flex-direction: column;

  overflow: hidden;

  @media (min-width: 481px) {
    flex-direction: row;
  }
`;

const VisualizationDiv = styled.div<{ $borderColor?: string }>`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  @media (min-width: 481px) {
    width: auto;

    flex-grow: 1;
    flex-direction: row;
  }
`;

const ControlsDiv = styled.div`
  display: grid;
  grid-auto-flow: column;

  @media (min-width: 481px) {
    grid-auto-flow: row;
  }
`;

const InfoDiv = styled.div`
  flex-grow: 1;
  max-width: max-content;
  margin-right: 0.5rem;

  @media (min-width: 481px) {
    flex-grow: 0;
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

const DueSpan = styled.span`
  text-decoration: underline;
`;

const StyledCountdown = styled(Countdown)`
  margin-top: 0.5rem;

  font-size: 2rem;
  font-weight: 500;

  @media (min-width: 481px) {
    flex-grow: 1;
    justify-content: flex-end;
  }
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
}

/**
 * Displays information about a project including a countdown to its deadline.
 */
const ProjectRaw = ({
  className,
  id,
}: WithClassName<ProjectProps>): JSX.Element => {
  const project = useProject(id);
  const dispatch = useAppDispatch();

  if (!project) {
    return (
      <VisualizationDiv className={className}>
        <WarnDiv>Project Not Found!</WarnDiv>
      </VisualizationDiv>
    );
  }

  const {
    projectListId,
    deadline,
    title,
    displayColor,
  } = project;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const toggleEditMode = () => {};

  const deleteProject = () => {
    dispatch(removeProject(id));
    dispatch(removeProjectFromList({
      id: projectListId,
      projectId: id,
    }));
  };

  return (
    <WrapperDiv
      $borderColor={displayColor}
      className={className}
    >
      <VisualizationDiv>
        <InfoDiv>
          <H2 $color={displayColor}>{title}</H2>
          <div>
            <DueSpan>Deadline</DueSpan>
            :
            {' '}
            <DateTime dateTime={deadline} />
          </div>
        </InfoDiv>
        <StyledCountdown
          end={deadline}
          passedEndMessage="The Deadline Has Passed!"
        />
      </VisualizationDiv>
      <ControlsDiv>
        <StyledIconButton
          $bgColor="#00E676"
          icon="pencil"
          size="tiny"
          label="Edit Project"
          iconColor="#fff"
          iconFocusColor="#2979FF"
          onClick={toggleEditMode}
        />
        <StyledIconButton
          $bgColor="#F44336"
          icon="delete"
          size="tiny"
          label="Delete Project"
          iconColor="#fff"
          iconFocusColor="#42A5F5"
          onClick={deleteProject}
        />
      </ControlsDiv>
    </WrapperDiv>
  );
};

const Project = styled(ProjectRaw)``;

export default Project;
