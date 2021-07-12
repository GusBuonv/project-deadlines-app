import { ReactElement } from 'react';
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

type CountdownProps = {
  pastEndMessage: string,
  end: string,
  /** Default: `true`; Enable wrapping between `"#D"` and `"#h"` */
  wraps?: boolean,
};

/**
 * Semantic \<time\> element that displays a duration of time
 *
 * The time duration is formatted as `"#Y #M #D #h #m #s"`. The seconds field
 * always displays, even when the duration is zero.
 *
 * If the duration exceeds one day, the element may wrap between `"#D"` and
 * `"#h"`. Disable this behavior by setting the `wraps` prop to `false`.
 */
const Countdown = ({
  pastEndMessage,
  className,
  end,
  wraps,
}: WithClassName<CountdownProps>): ReactElement => {
  const duration = useTimeUntil(end);

  if (!duration) {
    return <div className={className}>{pastEndMessage}</div>;
  }

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
      duration={duration}
      wraps={wraps}
    />
  );
};

export default Countdown;
