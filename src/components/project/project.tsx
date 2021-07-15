/* eslint-disable react/jsx-props-no-spreading */
import styled, { css } from 'styled-components';
import { WithClassName } from '../../util/types';
import useProject from './hooks/useProject';
import { ProjectProps } from './types';
import ProjectRaw from './project-raw';

//
// Styles
//

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

//
// Component
//

/**
 * Displays information about a project including a countdown to its deadline.
 */
const UnstyledProject = ({
  className,
  id,
  headerAs = 'h3',
  ...rest
}: WithClassName<ProjectProps>): JSX.Element => {
  const project = useProject(id);

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

  return (
    <ProjectRaw
      {...rest}
      className={className}
      deadline={deadline}
      title={title}
      displayColor={displayColor}
      id={id}
      projectListId={projectListId}
      headerAs={headerAs}
    />
  );
};

const Project = styled(UnstyledProject)``;

export default Project;
