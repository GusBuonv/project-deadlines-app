/* eslint-disable react/jsx-props-no-spreading */
import styled from 'styled-components';
import { WithClassName } from '../../util/types';
import useProjectList from './hooks/useProjectList';
import useProjectListDisplay from './hooks/useProjectListDisplay';
import { ProjectListHeaderCSS, ProjectListWrapperCSS } from './styles';
import { ProjectListProps } from './types';
import ProjectListRaw from './project-list-raw';

const WrapperDiv = styled.div`
  ${ProjectListWrapperCSS}
`;

const ErrorDiv = styled.div`
  ${ProjectListHeaderCSS}

  color: ${({ theme }) => theme.colors.alert};
`;

const UnstyledProjectList = ({
  className,
  id,
  headingTag: headerAs,
  ...rest
}: WithClassName<ProjectListProps>): JSX.Element => {
  const projectList = useProjectList(id);
  const projectListDisplay = useProjectListDisplay(projectList ? projectList.projectListDisplayId : '');

  if (!projectList || !projectListDisplay) {
    return (
      <WrapperDiv className={className} {...rest}>
        <ErrorDiv>Project List Not Found!</ErrorDiv>
      </WrapperDiv>
    );
  }

  const {
    projectIds, projectListDisplayId,
  } = projectList;

  const {
    title, displayColor,
  } = projectListDisplay;

  return (
    <ProjectListRaw
      className={className}
      isClearListEnabled={projectList.projectIds.length > 0}
      id={id}
      headingTag={headerAs}
      projectListDisplayId={projectListDisplayId}
      projectIds={projectIds}
      title={title}
      displayColor={displayColor}
      {...rest}
    />
  );
};

const ProjectList = styled(UnstyledProjectList)``;

export default ProjectList;
