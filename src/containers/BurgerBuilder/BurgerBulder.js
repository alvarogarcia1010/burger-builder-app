import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.6,
  meat: 1.3
}

class BurgerBulder extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
      },
      totalPrice: 0,
      purchaseable: false,
      purchasing: false
    }
  }

  updatePurchaseState(ingredients)
  {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el
      },0);

    this.setState({purchaseable: sum > 0})

  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCounted;

    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENT_PRICES[type]
    const newPrice = oldPrice + priceAddition
    this.setState({ingredients: updatedIngredients, totalPrice:newPrice})
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if(oldCount<=0)
    {
      return;
    }

    const updatedCounted = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCounted;

    const oldPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENT_PRICES[type]
    const newPrice = oldPrice - priceDeduction
    this.setState({ingredients: updatedIngredients, totalPrice:newPrice})
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () =>
  {
    this.setState({purchasing: true});
  }
  
  purchaseCancelHandler = () =>
  {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => 
  {
    console.log("hola")
    this.purchaseCancelHandler()
  }
  

  render() 
  {
    const disabledInfo = { ...this.state.ingredients};

    for(let key in disabledInfo)
    {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
          <OrderSummary 
          price={this.state.totalPrice}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.state.ingredients}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBulder;
