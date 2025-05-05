"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InterviewForm from "./interview-form";

const ScheduleInterviewDialog = ({ open, setOpen, form, onSubmit, interviewers }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Second Interview</DialogTitle>
        </DialogHeader>

        <InterviewForm
          form={form}
          onSubmit={(data) => {
            onSubmit(data);
            setOpen(false); // close dialog on submit
          }}
          interviewers={interviewers}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleInterviewDialog;
