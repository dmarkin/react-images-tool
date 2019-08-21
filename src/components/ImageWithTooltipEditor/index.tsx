import * as React from 'react';
import { ImageItem, Positions } from '../../interfaces/image';
import './style.css';
import { DEFAULT_COLOR, DEFAULT_POSITION, DEFAULT_TEXT } from '../../constants/defaults';
import FormLine from '../FormLine';
import Loader from '../Loader';
import AddImage from '../AddImage';

export interface ImageWithTooltipEditorProps {
  record: ImageItem,
  createRecord: (item: File) => void,
  saveRecord: (item: ImageItem) => void,
  cancelEdit: () => void,
  isLoading: boolean
}

const ImageWithTooltipEditor: React.FunctionComponent<ImageWithTooltipEditorProps> = (props) => {
  const { cancelEdit, createRecord, saveRecord, record, isLoading } = props;
  const [color, setColor] = React.useState(record.tooltip.color);
  const [text, setText] = React.useState(record.tooltip.text);
  const [position, setPosition] = React.useState(record.tooltip.position as Positions);

  React.useEffect(() => {
    setColor(record.tooltip.color);
    setText(record.tooltip.text);
    setPosition(record.tooltip.position as Positions);
  }, [record.tooltip]);

  const changeColor = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setColor(event.target.value);
  };

  const changeText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value);
  };

  const changePosition = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setPosition(event.target.value as Positions);
  };

  const updateRecord = (record: ImageItem): void => {
    const updatedRecord = { ...record, tooltip: { color, text, position: position as Positions } };
    saveRecord(updatedRecord);
    clearState();
  };

  const clearState = (): void => {
    setColor(DEFAULT_COLOR);
    setText(DEFAULT_TEXT);
    setPosition(DEFAULT_POSITION);
  };

  return (
    <form onSubmit={() => updateRecord(record)}>
      {record.src ?
        <React.Fragment>
          <h4>Image name {record.name}</h4>
          <img src={record.src} alt={record.altText} width="300px"/>
        </React.Fragment> :
        <React.Fragment>
          {isLoading ? <Loader/> : <AddImage createRecord={createRecord}/>}
        </React.Fragment>}
      {record.src && <React.Fragment>
        <FormLine label={<label htmlFor="tooltipColor">Tooltip Color</label>}
                  input={<input id="tooltipColor" type="color" value={color} required
                                onChange={e => changeColor(e)}/>}/>
        <FormLine label={<label htmlFor="tooltipText">Tooltip Text</label>}
                  input={<input id="tooltipText" type="text" value={text} required
                                onChange={e => changeText(e)}/>}/>
        <FormLine label={<label htmlFor="tooltipPosition">Tooltip Position</label>}
                  input={<select id="tooltipPosition" value={position}
                                 onChange={e => changePosition(e)}>
                    <option value='top'>Top</option>
                    <option value='right'>Right</option>
                    <option value='bottom'>Bottom</option>
                    <option value='left'>Left</option>
                  </select>}/>

        <div className="form-line btn-block">
          <input type="submit" className="material-btn" value="Save"/>
          <input type="reset" className="material-btn" value="Cancel" onClick={cancelEdit}/>
        </div>
      </React.Fragment>}
    </form>);
};

export default ImageWithTooltipEditor;
