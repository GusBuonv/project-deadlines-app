import styled from 'styled-components';
import gtDuration from '../../util/gtDuration';
import { WithClassName } from '../../util/types';
import Duration from './duration';
import useTimeUntil from './hooks/useTimeUntil';

//
// Styles
//

const StyledDuration = styled(Duration)<{
  $status?: 'warn' | 'alert',
}>`
  color: ${({ $status, theme }) => ($status ? theme.colors[$status] : '#000')};
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
 * Displays an active countdown, accurate to the second, towards an end date
 *
 * The time remaining is formatted as `"#Y #M #D #h #m #s"`. The seconds field
 * always displays, even when the duration is zero.
 *
 * If the duration exceeds one day, the element may wrap between `"#D"` and
 * `"#h"`. Disable this behavior by setting the `wraps` prop to `false`.
 */
const CountdownRaw = ({
  className,
  end,
  wraps,
}: WithClassName<CountdownProps>): JSX.Element => {
  const duration = useTimeUntil(end);

  let status: 'warn' | 'alert' | undefined;
  if (duration) {
    if (gtDuration({ days: 1 }, duration)) {
      status = 'alert';
    } else if (gtDuration({ days: 7 }, duration)) {
      status = 'warn';
    }
  }

  return (
    <StyledDuration
      className={className}
      $status={status}
      duration={duration ?? { seconds: 0 }}
      wraps={wraps}
    />
  );
};

const Countdown = styled(CountdownRaw)``;

export default Countdown;
