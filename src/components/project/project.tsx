import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { EntityId } from '@reduxjs/toolkit';
import { VerticalListMarginCSS } from '../../styles';
import { WithClassName } from '../../util/types';
import Countdown from '../countdown';
import DateTime from '../date-time';
import useProject from './useProject';

//
// Styles
//

const WrapperDiv = styled.div<{ $borderColor?: string }>`
  width: 100%;
  padding: 1rem;

  ${VerticalListMarginCSS}

  border-radius: 0.5rem;
  border-style: solid;
  border-width: 3px;
  border-color: ${({ $borderColor }) => $borderColor};

  display: flex;
  flex-direction: column;

  @media (min-width: 481px) {
    flex-direction: row;
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

//
// Component
//

/**
 * Displays information about a project including a countdown to its deadline.
 */
const Project = ({
  className,
  id,
}: WithClassName<{ id: EntityId }>): ReactElement => {
  const project = useProject(id);

  if (!project) {
    return (
      <WrapperDiv className={className}>
        <WarnDiv>Project Not Found!</WarnDiv>
      </WrapperDiv>
    );
  }

  const {
    deadline,
    title,
    displayColor,
  } = project;

  return (
    <WrapperDiv
      $borderColor={displayColor}
      className={className}
    >
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
        pastEndMessage="The Deadline Has Passed!"
      />
    </WrapperDiv>
  );
};

export default Project;
