import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../Components/index.js';
import { setSortBy, setCategory } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

const categoryNames = ['Мясные', 'Гриль', 'Острые', 'Закрытые'];
const ItemNames = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  const items = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const cartItems = useSelector(({ cart }) => cart.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [sortBy, category]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelectSortType = useCallback((type) => {
    dispatch(setSortBy(type));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddPizza = (obj) => {
    dispatch({
      type: 'ADD_PIZZA_CART',
      payload: obj,
    });
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          onClickCategory={onSelectCategory}
          items={categoryNames}
        />
        <SortPopup
          activeSortType={sortBy.type}
          items={ItemNames}
          onClickSortType={onSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? items.map((obj) => (
              <PizzaBlock
                onAddPizza={handleAddPizza}
                key={obj.id}
                countOfAddedPizzas={cartItems[obj.id] && cartItems[obj.id].items.length}
                {...obj}
              />
            ))
          : Array(11)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
        <PizzaBlock />
      </div>
    </div>
  );
}

export default Home;
