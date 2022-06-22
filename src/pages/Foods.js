import React, { useState, useEffect, useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';

// página principal de receitas

function Foods() {
  const { foods } = useContext(RecipesContext);
  const [categoryFood, setCategoryFood] = useState([]);
  const [magigNumber] = useState('5');

  useEffect(() => {
    async function getCategorysFood() {
      try {
        const endopint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        const response = await fetch(endopint);
        const { meals } = await response.json();
        setCategoryFood(meals);
      } catch (error) {
        return error;
      }
    }

    getCategorysFood();
  }, []);
  return (
    <div>
      <Header />
      <p>Foods</p>
      <section>
        { categoryFood.map((category, index) => (
          <button
            data-testid={ `${category.strCategory}-category-filter` }
            type="button"
            key={ index }
          >
            { category.strCategory }

          </button>
        )).slice(0, Number(magigNumber)) }
      </section>
      {
        foods.map((item, index) => (
          <FoodCard key={ item.idMeal } food={ item } idTest={ index } />
        ))
      }
      <Footer />
    </div>
  );
}

export default Foods;
