import * as React from 'react';
import './style.css';

export interface FormLineProps {
  label: React.ReactElement,
  input: React.ReactElement
}

const FormLine: React.FunctionComponent<FormLineProps> = (props) => {
  return (
    <div className="form-line">
      <div className="form-label">
        {props.label}
      </div>
      <div className="form-input">
        {props.input}
      </div>
    </div>
  );
};

export default FormLine;
