import { Fragment } from 'react';

import HeaderCartButton from './headercart';
// import mealsImage from '../../assets/meals.jpg';
import classes from './header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
      < HeaderCartButton/>
              </header>
      <div className={classes['main-image']}>
        <img src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg" alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;