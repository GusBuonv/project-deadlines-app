import { EntityId, EntityState, nanoid } from '@reduxjs/toolkit';
import styled, { css } from 'styled-components';
import { Flipped } from 'react-flip-toolkit';
import { useEffect } from 'react';
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
import useProjectListDisplay from './useProjectListDisplay';
import { ProjectListEntity } from './types';
import { fadeIn, fadeOutInstantly } from '../../styles/animations';

//
// Styles
//

const WrapperCSS = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const WrapperDiv = styled.div`
  ${WrapperCSS}
`;

// const WrapperFlipper = styled(Flipper)`
//   ${WrapperCSS}
// `;

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

const ListWrapperBorderCSS = css<{ $borderColor?: string }>`
  --border-width: 2px;
  border-style: solid;
  border-top-left-radius: 0.5rem;
  border-color: ${({ $borderColor }) => $borderColor ?? '#000'};

`;

const ListWrapperDiv = styled.div<{ $borderColor?: string }>`
  position: relative;
  width: 100%;

  ${ListWrapperBorderCSS}
  border-top-width: var(--border-width);

  --padding: 0.5rem;
  padding-left: var(--padding);
  padding-top: var(--padding);
  padding-bottom: var(--padding);

  ${CenteredFlexColumnCSS}

  @media (min-width: 481px) {
    --padding: 1rem;
  }
`;

const ListWrapperLeftBorderDiv = styled.div<{ $borderColor?: string }>`
  ${ListWrapperBorderCSS}
  border-left-width: var(--border-width);

  position: absolute;
  height: 100%;
  width: 1rem;
  left: 0;
  top: 0;
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
  onListChange?: () => void,
}

const ProjectListRaw = ({
  className,
  onListChange,
  id: projectListId,
  ...rest
}: WithClassName<ProjectListProps>): JSX.Element => {
  const projectList = useProjectList(projectListId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (onListChange) {
      onListChange();
    }
  }, [projectList, onListChange]);

  const projectListDisplay = useProjectListDisplay(projectList ? projectList.projectListDisplayId : '');

  if (!projectList || !projectListDisplay) {
    return (
      <WrapperDiv className={className}>
        <ErrorDiv>Project List Not Found!</ErrorDiv>
      </WrapperDiv>
    );
  }

  const {
    projectIds,
    projectListDisplayId,
  } = projectList;

  const {
    title,
    displayColor,
  } = projectListDisplay;

  const createProject = () => dispatch(createProjectInList({
    projectId: nanoid(),
    projectListId,
  }));

  const clearList = () => dispatch(removeAllProjectsInList({
    projectIds,
    projectListId,
  }));

  const deleteList = () => dispatch(destroyProjectList({
    projectIds,
    projectListDisplayId,
    projectListId,
  }));

  const shouldFlip = (
    prev: EntityState<ProjectListEntity>,
    current: EntityState<ProjectListEntity>,
  ) => {
    const prevKey = prev?.entities[projectListId]?.projectIds.join() ?? [];
    const currentKey = current?.entities[projectListId]?.projectIds.join() ?? [];
    return prevKey !== currentKey;
  };

  const shouldFlipButtons = (
    prev: EntityState<ProjectListEntity>,
    current: EntityState<ProjectListEntity>,
  ) => {
    if (shouldFlip(prev, current)) return true;

    const prevLength = prev?.entities[projectListId]?.projectIds.length ?? [];
    const currentLength = current?.entities[projectListId]?.projectIds.length ?? [];
    return (
      (prevLength === 0 || currentLength === 0)
      && prevLength !== currentLength
    );
  };

  const shouldFlipControls = (
    prev: EntityState<ProjectListEntity>,
    current: EntityState<ProjectListEntity>,
  ) => (shouldFlip(prev, current) && !shouldFlipButtons(prev, current));

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <WrapperDiv className={className} {...rest}>
      <H2 $color={displayColor}>{title}</H2>
      <ListWrapperDiv $borderColor={displayColor}>
        <Flipped flipId={`${projectListId.toString()}-list`} scale shouldFlip={shouldFlip}>
          <ListWrapperLeftBorderDiv $borderColor={displayColor} />
        </Flipped>
        {projectIds.map((projectId) => (
          <Flipped
            key={projectId}
            flipId={projectId.toString()}
            onAppear={fadeIn}
            onExit={fadeOutInstantly}
            translate
            shouldFlip={shouldFlip}
          >
            <StyledProject id={projectId} />
          </Flipped>
        ))}
        <Flipped flipId={`${projectListId.toString()}-controls`} translate shouldFlip={shouldFlipControls}>
          <ControlsSpan>
            <Flipped flipId={`${projectListId.toString()}-add-project-button`} translate shouldFlip={shouldFlipButtons}>
              <LabelledIconButton
                icon="plus-circle-outline"
                size="small"
                label="Add Project"
                iconFocusColor="#00E676"
                onMouseUp={({ currentTarget }) => currentTarget.blur()}
                onClick={createProject}
              />
            </Flipped>
            {projectList.projectIds.length > 0 ? (
              <Flipped
                flipId={`${projectListId.toString()}-clear-list-button`}
                translate
                shouldFlip={shouldFlipButtons}
                onAppear={fadeIn}
                onExit={fadeOutInstantly}
              >
                <LabelledIconButton
                  icon="close-circle-outline"
                  size="small"
                  label="Clear List"
                  iconFocusColor="#FFA000"
                  onClick={clearList}
                />
              </Flipped>
            ) : undefined}
            <Flipped flipId={`${projectListId.toString()}-delete-list-button`} translate shouldFlip={shouldFlipButtons}>
              <LabelledIconButton
                icon="trash-circle-outline"
                size="small"
                label="Delete List"
                iconFocusColor="#F44336"
                onClick={deleteList}
              />
            </Flipped>
          </ControlsSpan>
        </Flipped>

      </ListWrapperDiv>
    </WrapperDiv>
  );
};

const ProjectList = styled(ProjectListRaw)``;

export default ProjectList;
