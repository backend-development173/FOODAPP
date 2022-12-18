import { Fragment } from 'react';

import Header from './Components/LayOuts/Header';
import Meals from './Components/meals/mealsinfo'

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Meals/>
      </main>
  
    </Fragment>
  );
}

export default App;