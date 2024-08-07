import React, { useEffect, useState } from 'react';
import PortfolioItem from './PortfolioItem';
import axios from 'axios';

const PortfolioList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/portfolio')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the portfolio items!', error);
      });
  }, []);

  return (
    <div>
      {items.map(item => (
        <PortfolioItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default PortfolioList;
