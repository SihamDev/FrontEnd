import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface AddActionProps {
    openModal: boolean;
    handleCloseModal: () => void;
    newActionName: string;
    setNewActionName: (name: string) => void;
    newActionDescription: string;
    setNewActionDescription: (description: string) => void;
    handleAddAction: () => void;
}

const AddAction: React.FC<AddActionProps> = ({
    openModal,
    handleCloseModal,
    newActionName,
    setNewActionName,
    newActionDescription,
    setNewActionDescription,
    handleAddAction
}) => {
    return (
        <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
            <DialogTitle>Add New Action</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Action Name"
                    type="text"
                    fullWidth
                    value={newActionName}
                    onChange={(e) => setNewActionName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Action Description"
                    type="text"
                    fullWidth
                    value={newActionDescription}
                    onChange={(e) => setNewActionDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleAddAction} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddAction;
