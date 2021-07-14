import { memo } from 'react';
import styled from 'styled-components';
import { WithClassName } from '../../util/types';

//
// Component
//

interface DateTimeProps {
  /** ISO date time string */
  dateTime: string,
}

/**
 * Semantic \<time\> element that displays a date & time in the user's timezone.
 *
 * NOTE: This component is memoized to improve performance in the typical use case
 * of a static `date` prop.
 */
const DateTimeRaw = ({
  className,
  dateTime,
}: WithClassName<DateTimeProps>): JSX.Element => {
  const date = new Date(dateTime);

  return (
    <time
      className={className}
      dateTime={date.toISOString()}
    >
      {date.toLocaleString()}
    </time>
  );
};

const DateTime = styled(memo(DateTimeRaw))``;

export default DateTime;
