import * as React from 'react';
import { TooltipItem } from 'interfaces/image';
import { DEFAULT_COLOR } from 'constants/defaults';
import './style.css';

export interface TooltipProps {
  tooltip: TooltipItem,
  isTooltipVisible: boolean
}

const Tooltip: React.FunctionComponent<TooltipProps> = (props) => {
  const { tooltip, isTooltipVisible } = props;
  const { color, position, text } = tooltip;
  const tooltipClass = `tooltip ${position} ${isTooltipVisible ? 'fadeIn' : 'fadeOut'}`;
  const tooltipStyles = {
    backgroundColor: color || DEFAULT_COLOR,
  };

  return (
    <React.Fragment>
      {props.isTooltipVisible && <div className={tooltipClass}>
          <span className='tooltip-label' style={tooltipStyles}>{text}</span>
      </div>}
    </React.Fragment>
  );
};

export default Tooltip;
