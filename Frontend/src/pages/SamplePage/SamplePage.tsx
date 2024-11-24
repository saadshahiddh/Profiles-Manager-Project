import React, { useState } from 'react';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';

const SamplePage: React.FC = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = () => {
    console.log('Item deleted!');
    setDialogOpen(false); // Close the dialog after confirming
  };

  const handleClose = () => {
    setDialogOpen(false); // Close the dialog without action
  };

  return (
    <div>
      <h1>React Confirmation Dialog</h1>
      <button onClick={() => setDialogOpen(true)}>Delete Item</button>

      {isDialogOpen && (
        <ConfirmationDialog
          title="Confirm Delete"
          description="Are you sure you want to delete this item? This action cannot be undone."
          onConfirm={handleDelete}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default SamplePage;
