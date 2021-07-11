import { ReactElement } from 'react';
import styled from 'styled-components';
import useTimeUntil from '../../hooks/useTimeUntil';
import { CenteredFlexCSS } from '../../styles';
import gtDuration from '../../util/gtDuration';
import { WithClassName } from '../../util/types';
import Duration from '../duration';
import DateTime from '../date-time';

//
// Styles
//

const WrapperDiv = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  border-style: solid;
  border-width: 2px;
  border-color: #000;

  ${CenteredFlexCSS}
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InfoDiv = styled.div`
  flex-grow: 1;
  max-width: max-content;
  margin-right: 0.5rem;
`;

const H2 = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 2.5rem;
  margin-bottom: 0.25rem;
`;

const DueSpan = styled.span`
  text-decoration: underline;
`;

const StyledDuration = styled(Duration)<{ $statusColor: string }>`
  margin-top: 0.5rem;

  color: ${({ $statusColor }) => $statusColor};
  font-size: 2rem;
  font-weight: 500;
`;

//
// Component
//

export type ProjectProps = {
  title: string,
  /** ISO date time string */
  deadline: string,
};

/**
 * Displays information about a project including a countdown to its deadline.
 */
const Project = ({
  className,
  title,
  deadline,
}: WithClassName<ProjectProps>): ReactElement => {
  const timeUntilDeadline = useTimeUntil(deadline);

  let statusColor: string;
  if (
    !timeUntilDeadline
    || gtDuration(timeUntilDeadline, { days: 7 })
  ) {
    statusColor = '#006ef9';
  } else if (gtDuration(timeUntilDeadline, { days: 1 })) {
    statusColor = '#d47700';
  } else {
    statusColor = '#d83737';
  }

  return (
    <WrapperDiv className={className}>
      <InfoDiv>
        <H2>{title}</H2>
        <div>
          <DueSpan>Deadline</DueSpan>
          :
          {' '}
          <DateTime dateTime={deadline} />
        </div>
      </InfoDiv>
      {timeUntilDeadline
        ? (
          <StyledDuration
            $statusColor={statusColor}
            duration={timeUntilDeadline}
          />
        )
        : <div>Deadline Passed!</div>}
    </WrapperDiv>
  );
};

export default Project;
