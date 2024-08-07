import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const PortfolioItem = ({ item }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{item.title}</Typography>
        <Typography variant="body2">{item.description}</Typography>
        <img src={item.imageUrl} alt={item.title} style={{ width: '100%' }} />
        <Button href={item.clientLink} target="_blank" rel="noopener noreferrer">
          View Client Site
        </Button>
      </CardContent>
    </Card>
  );
};

export default PortfolioItem;
