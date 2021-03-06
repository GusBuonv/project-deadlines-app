import { formatISODuration } from 'date-fns';
import { memo } from 'react';
import styled from 'styled-components';
import { CenteredFlexCSS, SetMarginX } from '../../styles';
import formatDurationTerse from '../../util/formatDurationTerse';
import { WithClassName } from '../../util/types';

//
// Styles
//

const Time = styled.time<{ $wraps: boolean }>`
  ${CenteredFlexCSS}
  flex-wrap: ${({ $wraps }) => ($wraps ? 'wrap' : 'nowrap')};
`;

const Span = styled.span`
  ${SetMarginX('0.25rem')}
`;

//
// Component
//

interface DurationProps {
  duration: Duration,
  /** Default: `true`; Enable wrapping between `"#D"` and `"#h"` */
  wraps?: boolean,
}

/**
 * Semantic \<time\> element that displays a duration of time
 *
 * The time duration is formatted as `"#Y #M #D #h #m #s"`. The seconds field
 * always displays, even when the duration is zero.
 *
 * If the duration exceeds one day, the element may wrap between `"#D"` and
 * `"#h"`. Disable this behavior by setting the `wraps` prop to `false`.
 */
const DurationRaw = ({
  className,
  duration,
  wraps = true,
}: WithClassName<DurationProps>): JSX.Element => {
  const durationParts = formatDurationTerse(duration);

  // Adjust formatting on the seconds to reduce layout jitter
  let secondsPart = durationParts.pop();
  if (durationParts && secondsPart?.length === 2) {
    secondsPart = `0${secondsPart}`;
  }
  durationParts.push(secondsPart ?? '0s');

  // Allow longer durations to be split between 'Y M D' and 'h m s'
  let renderedDuration: string | JSX.Element;
  if (durationParts.length < 3) {
    renderedDuration = durationParts.join(' ');
  } else {
    const latterParts = durationParts.splice(-3);
    renderedDuration = (
      <>
        <Span>{durationParts.join(' ')}</Span>
        <Span>{latterParts.join(' ')}</Span>
      </>
    );
  }

  return (
    <Time
      className={className}
      $wraps={wraps}
      dateTime={formatISODuration(duration)}
    >
      {renderedDuration}
    </Time>
  );
};

const Duration = styled(memo(DurationRaw))``;

export default Duration;
