import * as React from 'react';
import Logo from './components/Logo';
import ImagesContainer from './components/ImagesContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Logo companyName="React Images Tool"/>
      </header>
      <section>
        <ImagesContainer/>
      </section>
    </div>
  );
}

export default App;
