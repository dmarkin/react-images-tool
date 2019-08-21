import * as React from 'react';

export interface LogoProps {
  companyName: string
}

const Logo: React.FunctionComponent<LogoProps> = (props) => {
  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <a href="https://reactjs.org/">
        <img alt={props.companyName}
             className="logo-image"
             src={`${process.env.PUBLIC_URL}/logo192.png`}
             width="60px"/>
      </a>
    </div>
  );
};

export default Logo;
