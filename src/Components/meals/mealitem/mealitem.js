import classes from './mealitem.module.css';
import From from '../mealform'
const btnfunction = (props)=>{
alert("Please Login")
}

const MealItem = (props) => {
  const price = `Rs ${props.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <button className={classes.button} onClick={btnfunction}>
            Order Now </button>
      <div>
      <From/>
      </div>
    </li>
  );
};

export default MealItem;