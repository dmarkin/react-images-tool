import * as React from 'react';
import Modal from 'react-awesome-modal';
import Image from 'components/Image';
import ImageWithTooltipEditor from 'components/ImageWithTooltipEditor';
import RemoveDialog from 'components/RemoveDialog';
import { ImageAction } from 'components/ImagesContainer/actions';
import { ImageItem } from 'interfaces/image';
import { DEFAULT_COLOR, DEFAULT_POSITION, DEFAULT_TEXT } from 'constants/defaults';
import './style.css';

export interface ImagesViewProps {
  list: ImageItem[],
  createRecord: typeof ImageAction.createRecord,
  saveRecord: typeof ImageAction.saveRecord,
  removeRecord: typeof ImageAction.removeRecord,
  isLoading: boolean
}

const ImagesView: React.FunctionComponent<ImagesViewProps> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [activeRecord, setActive] = React.useState<ImageItem | null>(null);
  const [recordToRemove, setRecordToRemove] = React.useState<ImageItem | null>(null);
  const newRecord = {
    tooltip: {
      text: DEFAULT_TEXT,
      color: DEFAULT_COLOR,
      position: DEFAULT_POSITION,
    },
  };

  const removeItem = (item: ImageItem): void => {
    props.removeRecord(item);
    setVisible(false);
    setRecordToRemove(null);
  };

  const saveItem = (item: ImageItem): void => {
    props.saveRecord(item);
  };

  const createItem = async (item: File) => {
    await props.createRecord(item);
    const response = props.list[props.list.length - 1];
    setActive(response);
  };

  return (
    <React.Fragment>
      <button className="material-btn" onClick={(): void => {
        setActive(newRecord as ImageItem);
        setVisible(true);
      }}>Add Image
      </button>
      <div className="grid-container">
        {props.list.map((item: ImageItem): React.ReactElement => (
          <Image key={item.id}
                 item={item}
                 remove={(): void => {
                   setRecordToRemove(item);
                   setVisible(true);
                 }}
                 setActive={(): void => {
                   setActive(item);
                   setVisible(true);
                 }}/>))}
      </div>
      <Modal visible={visible}
             width="400"
             effect="fadeInUp"
             onClickAway={(): void => setVisible(false)}>
        <div>
          {activeRecord && !recordToRemove &&
          <ImageWithTooltipEditor record={activeRecord}
                                  isLoading={props.isLoading}
                                  createRecord={createItem}
                                  saveRecord={saveItem}
                                  cancelEdit={(): void => {
                                    setVisible(false);
                                    setActive(null);
                                  }}/>}

          {!activeRecord && recordToRemove &&
          <RemoveDialog record={recordToRemove}
                        removeItem={removeItem}
                        cancel={(): void => {
                          setVisible(false);
                          setRecordToRemove(null);
                        }}/>}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ImagesView;
