import * as React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

export default function ConfirmDeleteModal({ open, onClose, onConfirm }) {
    return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Are you sure you want to delete this contact?</DialogTitle>
        <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={onConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
    </Dialog>
    );
}