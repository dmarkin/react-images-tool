import * as React from 'react';
import { ImageItem } from 'interfaces/image';

export interface RemoveDialogProps {
  record: ImageItem,
  removeItem: (item: ImageItem) => void,
  cancel: () => void
}

const RemoveDialog: React.FunctionComponent<RemoveDialogProps> = (props) => {
  const { record, removeItem, cancel } = props;

  return (<React.Fragment>
    <div className="modal-header">Remove Image</div>
    <div style={{ margin: '20px 0' }}>Are you sure that you want to remove this record?</div>
    {record.src &&
    <img src={record.src} alt={record.altText} width="300px"/>}

    <div className="modal-footer">
      <div className="form-line btn-block">
        <input type="submit" className="material-btn danger-btn" value="Remove"
               onClick={() => removeItem(record)}/>
        <input type="reset" className="material-btn" value="Cancel" onClick={cancel}/>
      </div>
    </div>
  </React.Fragment>);
};

export default RemoveDialog;
