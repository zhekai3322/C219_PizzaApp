import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

// Pizza datas
const pizzas = [
  {
    id: 1,
    name: 'Pizza Spinaci',
    image: './pizzas/spinaci.jpg',
    ingredients: ['Tomato', 'Mozzarella', 'Spinach', 'Ricotta Cheese'],
    price: '$11.00'
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    image: './pizzas/margherita.jpg',
    ingredients: ['Tomato', 'Mozzarella', 'Basil'],
    price: '$12.00'
  },
  {
    id: 3,
    name: 'Pizza Prosciutto',
    image: './pizzas/prosciutto.jpg',
    ingredients: ['Tomato', 'Mozzarella', 'Prosciutto', 'Arugula'],
    price: '$14.00'
  },
  {
    id: 4,
    name: 'Pizza Focaccia',
    image: './pizzas/focaccia.jpg',
    ingredients: ['Tomato', 'Mozzarella', 'Parmesan', 'Gorgonzola', 'Ricotta Cheese'],
    price: '$14.50'
  },
  {
    id: 5,
    name: 'Pizza Funghi',
    image: './pizzas/funghi.jpg',
    ingredients: ['Tomato', 'Mozzarella', 'Ham', 'Mushrooms', 'Artichokes'],
    price: '$16.00'
  },
  {
    id: 6,
    name: 'Pizza Salamino',
    image: './pizzas/salamino.jpg',
    ingredients: ['Tomato', 'Garlic', 'Oregano'],
    price: '$10.00'
  }
];

// Helper function to check if shop is open
const isShopOpen = (currentTime) => {
  const hours = currentTime.getHours();
  return hours >= 10 && hours < 22;
};

// Header component
const Header = ({ isOpen }) => {
  return (
    <div>
      <h1 className="header-title">Zhe Kai's Pizza Co.</h1>
      {isOpen && <h2 className="tagline">Authentic Italian Cuisine</h2>}
    </div>
  );
};

// Pizza component
const Pizza = ({ name, image, ingredients, price, handleOrder }) => {
  const [isOrdered, setIsOrdered] = useState(false);

  return (
    <div className="pizza-card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <div className="ingredients-dropdown">
        <button>Ingredients</button>
        <div className="dropdown-content">
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
      <p>Price: {price}</p>
      <button onClick={() => handleOrder(name)}>{isOrdered ? 'Reorder' : 'Order'}</button>
    </div>
  );
};

// Menu component
const Menu = ({ handleOrder }) => {
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <div className="pizza-grid">
        {pizzas.map((pizza) => (
          <Pizza key={pizza.id} {...pizza} handleOrder={handleOrder} />
        ))}
      </div>
    </div>
  );
};

// Footer component
const Footer = ({ isOpen }) => {
  return (
    <footer className="footer">
      {isOpen ? (
        <div>
          <p>We're currently open</p>
        </div>
      ) : (
        <p>Sorry, we're closed</p>
      )}
    </footer>
  );
};

// App component
const App = () => {
  const [orderedPizzas, setOrderedPizzas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setIsOpen(isShopOpen(currentTime));

    return () => clearInterval(intervalId);
  }, [currentTime]);

  const handleOrder = (pizzaName) => {
    setOrderedPizzas((prevOrders) => [...prevOrders, pizzaName]);
    alert(`You have ordered ${pizzaName}!`);
  };

  const handleClearOrder = () => {
    setOrderedPizzas([]);
    alert('Your order has been cleared!');
  };

  return (
    <div>
      <Header isOpen={isOpen} />
      <Menu handleOrder={handleOrder} />
      <Footer isOpen={isOpen} handleOrder={handleOrder} />
      {orderedPizzas.length > 0 && (
        <div className="order-summary">
          <h2>Your Orders:</h2>
          <ul>
            {orderedPizzas.map((pizza, index) => (
              <li key={index}>{pizza}</li>
            ))}
          </ul>
          <button onClick={handleClearOrder}>Clear Order</button>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));