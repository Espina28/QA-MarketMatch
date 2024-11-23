import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TermsAgreementDialog = ({ open, onClose, onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Handle agreeing to terms
  const handleAgree = () => {
    if (isChecked) {
      onAgree(); // Proceed with navigation
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Before selling a product, please read and agree to our Terms and Conditions.
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
          label="I agree to the terms and conditions"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAgree} color="primary" disabled={!isChecked}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsAgreementDialog;
