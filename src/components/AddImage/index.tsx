import * as React from 'react';

export interface AddImageProps {
  createRecord: (item: File) => void,
}

const AddImage: React.FunctionComponent<AddImageProps> = (props) => {
  const addImage = function(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;
    if (file && file.length) {
      props.createRecord(file[0]);
    }
  };

  return (
    <label className="material-btn" style={{ margin: '60px' }}>
      <input type="file" name="newImage" accept="image/*" onChange={addImage}/>
      Upload image
    </label>
  );
};

export default AddImage;
