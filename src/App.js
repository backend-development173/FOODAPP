import { Fragment } from 'react';
import Header from './Components/LayOuts/Header';
import Meals from './Components/meals/Meals'
import Mapd from  './Components/newcom/new'
function App() {
 

  return (
    
    <Fragment>
     
      <Header />
      
      <main>
      
        <Meals/>
        <Mapd/>
      </main>
      
    </Fragment>
    
  );
}

export default App;