// DeleteConfirmationDialog.js
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@shadcn/ui';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, categoryId }) => {
  const handleConfirm = async () => {
    if (categoryId) {
      await onConfirm(categoryId);
      onClose(); // Close the dialog after confirming
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this category?</p>
        <DialogFooter>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
