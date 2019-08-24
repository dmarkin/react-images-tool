import * as React from 'react';
import { ImageItem } from 'interfaces/image';
import Tooltip from 'components/Tooltip';
import './style.css';

export interface ImageProps {
  item: ImageItem,
  setActive: (item: ImageItem) => void,
  remove: (item: ImageItem) => void,
}

const Image: React.FunctionComponent<ImageProps> = (props) => {
  const { setActive, remove, item } = props;
  const { src, altText } = item;
  const [isTooltipVisible, setTooltipVisible] = React.useState(false);

  return (
    <React.Fragment>
      <div className="grid-item">
        <Tooltip key={item.id}
                 tooltip={item.tooltip}
                 isTooltipVisible={isTooltipVisible}/>
        <img src={src}
             alt={altText}
             width="150px"
             onClick={() => setActive(item)}
             onMouseOver={() => setTooltipVisible(true)}
             onMouseOut={() => setTooltipVisible(false)}/>
        <div className="icons-block">
          <img src={`${process.env.PUBLIC_URL}/pencil-alt-solid.svg`}
               alt="Edit"
               onClick={() => setActive(item)}/>
          <img src={`${process.env.PUBLIC_URL}/trash-alt-solid.svg`}
               alt="Remove"
               onClick={() => remove(item)}/>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Image;
