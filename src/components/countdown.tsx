import styled from 'styled-components';
import useTimeUntil from '../hooks/useTimeUntil';
import gtDuration from '../util/gtDuration';
import { WithClassName } from '../util/types';
import Duration from './duration';

//
// Styles
//

const StyledDuration = styled(Duration)<{
  $color: string,
}>`
  color: ${({ $color }) => $color};
`;

//
// Component
//

interface CountdownProps {
  end: string,
  /** Default: `true`; Enable wrapping between `"#D"` and `"#h"` */
  wraps?: boolean,
}

/**
 * Semantic \<time\> element that displays a duration of time
 *
 * The time duration is formatted as `"#Y #M #D #h #m #s"`. The seconds field
 * always displays, even when the duration is zero.
 */
const CountdownRaw = ({
  className,
  end,
  wraps,
}: WithClassName<CountdownProps>): JSX.Element => {
  const duration = useTimeUntil(end);

  let statusColor: string;
  if (
    !duration
    || gtDuration(duration, { days: 7 })
  ) {
    statusColor = '#000';
  } else if (gtDuration(duration, { days: 1 })) {
    statusColor = '#d47700';
  } else {
    statusColor = '#d83737';
  }

  return (
    <StyledDuration
      className={className}
      $color={statusColor}
      duration={duration ?? { seconds: 0 }}
      wraps={wraps}
    />
  );
};

const Countdown = styled(CountdownRaw)``;

export default Countdown;
