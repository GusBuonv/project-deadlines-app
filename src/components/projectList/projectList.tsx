import { EntityId, EntityState, nanoid } from '@reduxjs/toolkit';
import styled, { css } from 'styled-components';
import { Flipped } from 'react-flip-toolkit';
import { useEffect, useState } from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import { CenteredFlexColumnCSS, VerticalListMarginCSS } from '../../styles';
import { WithClassName } from '../../util/types';
import Project from '../project/project';
import useProjectList from './useProjectList';
import ControlsSpan from '../ui/controls-span';
import createProjectInList from '../../store/deadlines/actions/createProjectInList';
import removeAllProjectsInList from '../../store/deadlines/actions/removeAllProjectsInList';
import destroyProjectList from '../../store/deadlines/actions/destroyProjectList';
import useProjectListDisplay from './useProjectListDisplay';
import { ProjectListEntity, ProjectListDisplayOptions } from './types';
import { fadeIn, fadeOutInstantly } from '../../styles/animations';
import blurOnMouseUp from '../../util/blurOnMouseUp';
import getDifference from '../../util/getDifference';
import { updateProjectListDisplay } from './projectListDisplaySlice';
import useHandleTitleChange from '../project/useHandleTitleChange';
import useEditMode from '../../hooks/useEditMode';
import HiddenLabelTextInput from '../ui/hidden-label-text-input';
import IconButton from '../ui/icon-button';
import LabelledIconButton from '../ui/labelled-icon-button';

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

const HeaderInput = styled(HiddenLabelTextInput)`
  ${ListHeaderCSS}
`;

const TopBarDiv = styled.div`
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  const [mode, toggleEditMode] = useEditMode('display');
  useEffect(() => {
    if (onListChange) {
      onListChange();
    }
  }, [projectList, onListChange]);
  const projectListDisplay = useProjectListDisplay(projectList ? projectList.projectListDisplayId : '');
  const [draft, setDraft] = useState<ProjectListDisplayOptions>({
    title: projectListDisplay?.title ?? '',
  });
  const handleDraftTitleChange = useHandleTitleChange(setDraft);

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

  const modeParams = {
    /** DISPLAY MODE */
    display: {
      header: (<H2 $color={displayColor}>{title}</H2>),
      label: 'Edit Project List',
      icon: 'pencil' as const,
      action: toggleEditMode,
    },
    /** EDIT MODE */
    edit: {
      header: (
        <HeaderInput
          id={`${projectListId}-title`}
          value={draft.title ?? title}
          onChange={handleDraftTitleChange}
        />
      ),
      label: 'Save Changes',
      icon: 'save' as const,
      action() {
        const changes = getDifference({
          ...draft,
        }, projectListDisplay);
        if (Object.keys(changes).length) {
          dispatch(updateProjectListDisplay({ id: projectListDisplayId, changes }));
        }
        toggleEditMode();
      },
    },
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <WrapperDiv className={className} {...rest}>
      <TopBarDiv>
        {modeParams[mode].header}
        <IconButton
          icon={modeParams[mode].icon}
          size="medium"
          label={modeParams[mode].label}
          iconFocusColor="#0f0"
          onMouseUp={blurOnMouseUp}
          onClick={modeParams[mode].action}
        />
      </TopBarDiv>
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
                onMouseUp={blurOnMouseUp}
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
