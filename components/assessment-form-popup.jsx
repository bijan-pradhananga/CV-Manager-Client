"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AssessmentForm from "./assessment-form";

const AssessmentPopupForm = ({ open, setOpen, form, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assessment Form</DialogTitle>
        </DialogHeader>

        <AssessmentForm
          form={form}
          onSubmit={(data) => {
            onSubmit(data);
            setOpen(false); // close dialog on submit
          }}
          
        />
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentPopupForm;
