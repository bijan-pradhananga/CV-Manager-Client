"use client"
import AlertFailure from '@/components/alert-failure';
import AlertSuccess from '@/components/alert-success';
import CVViewer from '@/components/cv-viewer';
import NotFoundPage from '@/components/design/404notFound';
import { InterviewCard } from '@/components/interview-card'
import GlobalLoader from '@/components/loader/globalLoader';
import { fetchSingleCandidate, updateCandidate } from '@/lib/features/candidate';
import { getInterviewsByCandidate } from '@/lib/features/interview';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'


const Page = () => {
    const dispatch = useAppDispatch();
    const { singleData: candidate, singleLoading } = useAppSelector((state) => state.candidate);
    const { candidateInterviews, candidateInterviewsLoading, success, error} = useAppSelector(state => state.interview);
    const params = useParams();
    const candidateId = params.id;

    const handleReject = async () =>{
        const result = await dispatch(updateCandidate({ id: candidateId, formData: {interviewStatus:"Rejected"}}))
         if (updateCandidate.fulfilled.match(result)) {
              dispatch(fetchSingleCandidate(candidateId));
        }
    }

    useEffect(() => {
        if (candidateId) {
            dispatch(fetchSingleCandidate(candidateId));
            dispatch(getInterviewsByCandidate(candidateId));
        }
    }, [candidateId, dispatch]);

    if (!candidateId) {
        return <NotFoundPage />;
    }

    if (candidateInterviewsLoading || singleLoading) {
        return <GlobalLoader />;
    }

    return (
        <div className="flex h-screen">
            <CVViewer candidate={candidate} />
            <div className="w-1/2 p-6 space-y-6 overflow-auto">
                {candidateInterviews.length > 0 ? (
                    candidateInterviews.map(interview => (
                        <InterviewCard key={interview.id} interview={interview} candidate={candidate} handleReject={handleReject}/>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No interviews scheduled yet
                    </div>
                )}
            </div>
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
    )
}

export default Page;
