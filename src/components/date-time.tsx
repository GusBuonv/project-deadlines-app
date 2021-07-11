import { memo, ReactElement } from 'react';
import { WithClassName } from '../util/types';

//
// Component
//

type DateTimeProps = {
  /** ISO date time string */
  dateTime: string,
};

/**
 * Semantic \<time\> element that displays a date & time in the user's timezone.
 *
 * NOTE: This component is memoized to improve performance in the typical use case
 * of a static `date` prop.
 */
const DateTime = ({
  className,
  dateTime,
}: WithClassName<DateTimeProps>): ReactElement => {
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

export default memo(DateTime);
