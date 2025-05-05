"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import AlertFailure from '@/components/alert-failure';
import AlertSuccess from '@/components/alert-success';
import CVViewer from '@/components/cv-viewer';
import NotFoundPage from '@/components/design/404notFound';
import { InterviewCard } from '@/components/interview-card';
import GlobalLoader from '@/components/loader/globalLoader';
import { fetchSingleCandidate, updateCandidate } from '@/lib/features/candidate';
import { getInterviewsByCandidate, scheduleInterview, clearInterviewSuccess, clearInterviewError } from '@/lib/features/interview';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { interviewSchema } from '@/schemas/interview';
import { fetchInterviewers } from '@/lib/features/interviewer';
import ScheduleInterviewDialog from '@/components/interview-form-popup';
import { assessmentSchema } from '@/schemas/assessment';
import { uploadAssessment } from '@/lib/features/assessment';
import AssessmentForm from '@/components/assessment-form';
import AssessmentPopupForm from '@/components/assessment-form-popup';

const Page = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { singleData: candidate, singleLoading } = useAppSelector((state) => state.candidate);
    const { candidateInterviews, candidateInterviewsLoading, success, error } = useAppSelector(state => state.interview);
    const { data: interviewers } = useAppSelector((state) => state.interviewer);
    const params = useParams();
    const candidateId = params.id;

    const [openDialog, setOpenDialog] = useState(false);
    const [openAssessmentDialog, setOpenAssessmentDialog] = useState(false);
    const form = useForm({
        resolver: zodResolver(interviewSchema),
        defaultValues: {
            interviewerId: "",
            interviewDate: undefined,
            interviewTime: "",
        },
    });

    const assessmentForm = useForm({
        resolver: zodResolver(assessmentSchema),
        defaultValues: {
            assessmentType: "",
            evaluation: "",
            testFileUrl: null,
            remarks: ""
        }
    });

    const handleHire = async () => {
        const result = await dispatch(updateCandidate({ id: candidateId, formData: { interviewStatus: "Hired" } }));
        if (updateCandidate.fulfilled.match(result)) {
            router.push('/admin/candidates');
        }
    };

    const handleReject = async () => {
        const result = await dispatch(updateCandidate({ id: candidateId, formData: { interviewStatus: "Rejected" } }));
        if (updateCandidate.fulfilled.match(result)) {
            router.push('/admin/candidates');
        }
    };

    const handleAssessment = async (values) => {

        try {
            const result = await dispatch(uploadAssessment({
                candidateId: candidateId,
                assessmentType: values.assessmentType,
                remarks: values.remarks,
                evaluation: values.evaluation,
                file: values.testFile // The actual File object from form
            }));
      
            
            if (uploadAssessment.fulfilled.match(result)) {
                router.push(`/admin/candidates/${candidateId}/assessments`);
            }
        } catch (error) {
            console.error('Assessment submission error:', error);
        }

    }


    const onSubmit = async (values) => {
        const interviewData = {
            candidateId: candidateId,
            stage: "second",
            interviewerId: values.interviewerId,
            interviewDate: values.interviewDate,
            interviewTime: values.interviewTime,
        };

        const result = await dispatch(scheduleInterview(interviewData));
        if (scheduleInterview.fulfilled.match(result)) {
            await dispatch(updateCandidate({ id: candidateId, formData: { interviewStatus: "First Interview Complete" } }));
            await dispatch(fetchSingleCandidate(candidateId));
            await dispatch(getInterviewsByCandidate(candidateId));
        }
    };

    useEffect(() => {
        if (candidateId) {
            dispatch(fetchSingleCandidate(candidateId));
            dispatch(getInterviewsByCandidate(candidateId));
            dispatch(fetchInterviewers());
        }
    }, [candidateId, dispatch]);

    if (!candidateId) return <NotFoundPage />;
    if (candidateInterviewsLoading || singleLoading) return <GlobalLoader />;

    return (
        <div className="flex h-screen">
            <CVViewer candidate={candidate} />

            <div className="w-1/2 p-6 space-y-6 overflow-auto">
                {candidateInterviews.length > 0 ? (
                    candidateInterviews.map((interview, index) => (
                        <InterviewCard
                            key={index}
                            interview={interview}
                            candidate={candidate}
                            handleHire={handleHire}
                            handleReject={handleReject}
                            openScheduleDialog={() => setOpenDialog(true)} // trigger dialog
                            openAssessmentDialog = {() => setOpenAssessmentDialog(true)}
                        />
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No interviews scheduled yet
                    </div>
                )}
            </div>

            {/* Schedule Interview Dialog */}
            <ScheduleInterviewDialog
                open={openDialog}
                setOpen={setOpenDialog}
                form={form}
                onSubmit={onSubmit}
                interviewers={interviewers}
            />

            {/* Assessment Form Dialog  */}
            <AssessmentPopupForm 
              open={openAssessmentDialog}
              setOpen={setOpenAssessmentDialog}
                form={assessmentForm}
                onSubmit={handleAssessment}
            />

            {/* Success/Error Alerts */}
            <AlertSuccess
                isOpen={!!success}
                message={success}
                onClose={() => dispatch(clearInterviewSuccess())}
            />
            <AlertFailure
                isOpen={!!error}
                message={error}
                onClose={() => dispatch(clearInterviewError())}
            />
        </div>
    );
};

export default Page;
