/* eslint-disable react/jsx-props-no-spreading */
import styled, { css } from 'styled-components';
import { Flipped } from 'react-flip-toolkit';
import useAppDispatch from '../../hooks/useAppDispatch';
import { CenteredFlexColumnCSS, VerticalListMarginCSS } from '../../styles';
import { WithClassName } from '../../util/types';
import Project from '../project/project';
import ControlsSpan from '../ui/controls-span';
import { fadeIn, fadeOutInstantly } from '../../styles/animations';
import blurOnMouseUp from '../../util/blurOnMouseUp';
import LabelledIconButton from '../ui/labelled-icon-button';
import headingTagMap from '../../util/headingTag';
import EditableHeadingWithButton from '../ui/editable-heading-with-button';
import useShouldFlipProjectList from './hooks/useShouldFlipProjectList';
import useShouldFlipProjectListButtons from './hooks/useShouldFlipButtons';
import useShouldFlipProjectListControls from './hooks/useShouldFlipProjectListControls';
import useDeleteProjectList from './hooks/useDeleteProjectList';
import useClearProjectList from './hooks/useClearProjectList';
import useCreateProject from '../project/hooks/useCreateProject';
import useSetProjectListTitle from './hooks/useSetProjectListTitle';
import { ProjectListHeaderCSS, ProjectListWrapperCSS } from './styles';
import { ProjectListRawProps } from './types';

//
// Styles
//

const WrapperDiv = styled.div`
  ${ProjectListWrapperCSS}
`;

const EditableTitle = styled(EditableHeadingWithButton) <{ $color?: string; }>`
  padding-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ $color }) => $color ?? '#000'};

  & h2,
  & input {
    ${ProjectListHeaderCSS}
  }

  & input {
    max-width: 80%;
    input {
      max-width: 100%;
    }
  }
`;

const ListWrapperBorderCSS = css<{ $borderColor?: string; }>`
  --border-width: 2px;
  border-style: solid;
  border-top-left-radius: 0.5rem;
  border-color: ${({ $borderColor }) => $borderColor ?? '#000'};

`;
const ListWrapperDiv = styled.div<{ $borderColor?: string; }>`
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
const ListWrapperLeftBorderDiv = styled.div<{ $borderColor?: string; }>`
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

const ProjectListRaw = ({
  className,
  id: projectListId,
  headingTag: headerTag = 'h2',
  title,
  displayColor,
  projectListDisplayId,
  isClearListEnabled,
  projectIds,
  ...rest
}: WithClassName<ProjectListRawProps>): JSX.Element => {
  const dispatch = useAppDispatch();
  const setTitle = useSetProjectListTitle(dispatch, projectListDisplayId);
  const createProject = useCreateProject(dispatch, projectListId);
  const clearList = useClearProjectList(dispatch, projectIds, projectListId);
  const deleteList = useDeleteProjectList(
    dispatch,
    projectIds,
    projectListDisplayId,
    projectListId,
  );
  const shouldFlip = useShouldFlipProjectList(projectListId);
  const shouldFlipButtons = useShouldFlipProjectListButtons(projectListId);
  const shouldFlipControls = useShouldFlipProjectListControls(projectListId);

  return (
    <WrapperDiv className={className} {...rest}>
      <EditableTitle
        headingTag={headerTag}
        text={title}
        onChange={setTitle}
        saveLabel="Save List Title"
        editLabel="Edit List Title"
      />
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
            <StyledProject
              id={projectId}
              headerAs={headingTagMap[headerTag]}
            />
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
            {isClearListEnabled ? (
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

export default ProjectListRaw;
