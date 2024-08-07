import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const PortfolioForm = ({ open, handleClose, initialData, refreshData }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    imageUrl: '',
    clientLink: '',
    status: 'visible',
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    let imageUrl = formData.imageUrl;
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await axios.post('http://localhost:3000/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      imageUrl = `http://localhost:3000/uploads/${response.data.filename}`;
    }

    const portfolioData = { ...formData, imageUrl };

    if (formData.id) {
      await axios.patch(`http://localhost:3000/portfolio/${formData.id}`, portfolioData);
    } else {
      await axios.post('http://localhost:3000/portfolio', portfolioData);
    }
    refreshData();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{formData.id ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</DialogTitle>
      <DialogContent>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: '20px', marginBottom: '20px' }}
        />
        <TextField
          name="clientLink"
          label="Client Link"
          value={formData.clientLink}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="status"
          label="Status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>{formData.id ? 'Update' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PortfolioForm;
