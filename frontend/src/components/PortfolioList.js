import React, { useEffect, useState } from 'react';
import PortfolioItem from './PortfolioItem';
import PortfolioForm from './PortfolioForm';
import { Button, Grid } from '@mui/material';
import axios from 'axios';

const PortfolioList = () => {
  const [items, setItems] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost:3000/portfolio')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching portfolio items:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/portfolio/${id}`)
      .then(() => fetchData())
      .catch(error => console.error('Error deleting portfolio item:', error));
  };

  const handleAdd = () => {
    setCurrentItem(null);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setCurrentItem(null);
  };

  return (
    <div>
      <Button onClick={handleAdd} variant="contained" color="primary">Add Portfolio Item</Button>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {items.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <PortfolioItem item={item} onEdit={handleEdit} onDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
      <PortfolioForm open={formOpen} handleClose={handleCloseForm} initialData={currentItem} refreshData={fetchData} />
    </div>
  );
};

export default PortfolioList;
