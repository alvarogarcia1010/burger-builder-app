import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl 
          key={ctrl.label} 
          label={ctrl.label}
          type={ctrl.type}
          added={() => {props.ingredientAdded(ctrl.type)}} 
          remove={() => {props.ingredientRemove(ctrl.type)}}
          disabled={props.disabled[ctrl.type]} 
        />
      ))}
      <button 
        className={classes.OrderButton}
        onClick={props.ordered} 
        disabled={!props.purchaseable}>ORDER NOW</button>
    </div>
  )
}

export default BuildControls;
