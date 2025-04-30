"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchSingleCandidate } from "@/lib/features/candidate";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimePicker } from "@/components/ui/time-picker";
import { fetchInterviewers } from "@/lib/features/interviewer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import NotFoundPage from "@/components/design/404notFound";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GlobalLoader from "@/components/loader/globalLoader";
import { interviewSchema } from "@/schemas/interview";
import { format } from 'date-fns'; // Import the format function
import { clearInterviewError, clearInterviewSuccess, scheduleInterview } from "@/lib/features/interview";
import Link from "next/link";
import CVViewer from "@/components/cv-viewer";
import InterviewForm from "@/components/interview-form";

const Page = () => {
  const dispatch = useAppDispatch();
  const { singleData: candidate, singleLoading } = useAppSelector((state) => state.candidate);
  const { data: interviewers } = useAppSelector((state) => state.interviewer);
  const { success, error } = useAppSelector((state) => state.interview);
  const params = useParams();
  const id = params.id;

  const form = useForm({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      interviewerId: "",
      interviewDate: undefined,
      interviewTime: "",
    },
  });

  if (singleLoading) {
    return <GlobalLoader />;
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleCandidate(id));
      dispatch(fetchInterviewers());
    }
  }, [id, dispatch]);

  const onSubmit = async (values) => {
    const interviewData = {
      candidateId: id,
      stage: "first",
      interviewerId: values.interviewerId,
      interviewDate: values.interviewDate,
      interviewTime: values.interviewTime,
    };
   
    const result = await dispatch(scheduleInterview(interviewData));
    if (scheduleInterview.fulfilled.match(result)) {
      dispatch(fetchSingleCandidate(id));
    }
  };

  if (!id) {
    return <NotFoundPage />;
  }


  return (
    <div className="flex h-screen">
      {/* Left: Document Viewer */}
      <CVViewer candidate={candidate} />

      {/* Right Side */}
      <div className="w-1/2 p-6 space-y-6 overflow-auto">

        {/* Candidate Details and Scheduling  */}
        <CandidateDetails candidate={candidate} />

        {/* Conditionally render interview form */}
        {candidate?.interviewSchedules?.length === 0 ? (
          <>
            {/* Interview Scheduling Form */}
            <InterviewForm form={form} onSubmit={onSubmit} interviewers={interviewers} />
          </>
        ) : (
          // Interview Schedules 
          <InterviewSchedules candidate={candidate} />
        )}


        {/* Success/Error Alerts */}
        <AlertSuccess
          isOpen={success}
          message={success}
          onClose={() => dispatch(clearInterviewSuccess())}
        />
        <AlertFailure
          isOpen={error}
          message={error}
          onClose={() => dispatch(clearInterviewError())}
        />
      </div>
    </div >
  );
};

const CandidateDetails = ({ candidate }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Candidate Details</h2>
      </CardHeader>
      <CardContent>
        {candidate ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600"><strong>Name:</strong></p>
              <p className="text-gray-900">{candidate.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600"><strong>Email:</strong></p>
              <p className="text-gray-900">{candidate.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600"><strong>Technologies:</strong></p>
              <p className="text-gray-900">{candidate.technology}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600"><strong>Status:</strong></p>
              <p className="text-gray-900">{candidate.interviewStatus}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No candidate data available.</p>
        )}
      </CardContent>
    </Card>
  )
}

const InterviewSchedules = ({ candidate }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-800">Interview Scheduled</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>This candidate already has an interview scheduled.</p>
          {/* Optional: Show existing interview details */}
          {candidate?.interviewSchedules?.map(schedule => (
            <div key={schedule._id} className="border p-4 rounded">
              <p><strong>Date:</strong> {new Date(schedule.interviewDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {schedule.interviewTime}</p>
            </div>
          ))}

          {/* See More Details Link */}
          <div className="pt-2">
            <Link
              href={`/admin/candidates/${candidate._id}/interviews`}
              className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
            >
              See more details
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Page;
