import { EntityId } from '@reduxjs/toolkit';
import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { CenteredFlexColumnCSS, VerticalListMarginCSS } from '../../styles';
import { WithClassName } from '../../util/types';
import Project from '../project/project';
import useProjectList from './useProjectList';

const WrapperDiv = styled.div`
  width: 100%;

  ${VerticalListMarginCSS}

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

const ProjectList = ({
  className,
  id,
}: WithClassName<{ id: EntityId }>): ReactElement => {
  const projectList = useProjectList(id);

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

  return (
    <WrapperDiv className={className}>
      <H2 $color={displayColor}>
        {title}
      </H2>
      <ListWrapperDiv $borderColor={displayColor}>
        {projectIds.map((projectId) => <Project key={projectId} id={projectId} />)}
      </ListWrapperDiv>
    </WrapperDiv>
  );
};

export default ProjectList;
