import * as React from 'react';
import './style.css';

const Loader: React.FunctionComponent<{}> = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
