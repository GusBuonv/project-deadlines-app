import { EntityId, nanoid } from '@reduxjs/toolkit';
import styled, { css } from 'styled-components';
import useAppDispatch from '../../hooks/useAppDispatch';
import { CenteredFlexColumnCSS, VerticalListMarginCSS } from '../../styles';
import { WithClassName } from '../../util/types';
import Project from '../project/project';
import useProjectList from './useProjectList';
import LabelledIconButton from '../labelled-icon-button';
import ControlsSpan from '../controls-span';
import createProjectInList from '../../store/actions/createProjectInList';
import removeAllProjectsInList from '../../store/actions/removeAllProjectsInList';
import destroyProjectList from '../../store/actions/destroyProjectList';

//
// Styles
//

const WrapperDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ListHeaderCSS = css`
  margin-bottom: 0.5rem;
  margin-left: 1rem;

  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3rem;

  @media (min-width: 481) {
    font-size: 3rem;
  }
`;

const H2 = styled.h2<{ $color?: string }>`
  ${ListHeaderCSS}

  color: ${({ $color }) => $color ?? '#000'};
`;

const ErrorDiv = styled.div`
  ${ListHeaderCSS}

  color: ${({ theme }) => theme.colors.alert};
`;

const ListWrapperDiv = styled.div<{ $borderColor?: string }>`
  width: 100%;

  border-top: 2px;
  border-left: 2px;
  border-style: solid;
  border-top-left-radius: 0.5rem;
  border-color: ${({ $borderColor }) => $borderColor ?? '#000'};

  --padding: 0.5rem;
  padding-left: var(--padding);
  padding-top: var(--padding);
  padding-bottom: var(--padding);

  ${CenteredFlexColumnCSS}

  @media (min-width: 481px) {
    --padding: 1rem;
  }
`;

const StyledProject = styled(Project)`
  ${VerticalListMarginCSS}

  box-shadow: 0 2px 5px #979696;
`;

//
// Component
//
interface ProjectListProps {
  id: EntityId,
}

const ProjectListRaw = ({
  className,
  id,
}: WithClassName<ProjectListProps>): JSX.Element => {
  const projectList = useProjectList(id);
  const dispatch = useAppDispatch();

  if (!projectList) {
    return (
      <WrapperDiv className={className}>
        <ErrorDiv>Project List Not Found!</ErrorDiv>
      </WrapperDiv>
    );
  }

  const {
    title,
    displayColor,
    projectIds,
  } = projectList;

  const createProject = () => dispatch(createProjectInList({
    projectId: nanoid(),
    projectListId: id,
  }));
  const clearList = () => dispatch(removeAllProjectsInList(projectList));
  const deleteList = () => dispatch(destroyProjectList(projectList));

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <WrapperDiv className={className}>
      <H2 $color={displayColor}>
        {title}
      </H2>
      <ListWrapperDiv $borderColor={displayColor}>
        {projectIds.map((projectId) => <StyledProject key={projectId} id={projectId} />)}
        <ControlsSpan>
          <LabelledIconButton
            icon="plus-circle-outline"
            size="small"
            label="Add Project"
            iconFocusColor="#00E676"
            onMouseUp={({ currentTarget }) => currentTarget.blur()}
            onClick={createProject}
          />
          {projectList.projectIds.length > 0 ? (
            <LabelledIconButton
              icon="close-circle-outline"
              size="small"
              label="Clear List"
              iconFocusColor="#FFA000"
              onClick={clearList}
            />
          ) : undefined}
          <LabelledIconButton
            icon="trash-circle-outline"
            size="small"
            label="Delete List"
            iconFocusColor="#F44336"
            onClick={deleteList}
          />
        </ControlsSpan>
      </ListWrapperDiv>
    </WrapperDiv>
  );
};

const ProjectList = styled(ProjectListRaw)``;

export default ProjectList;
