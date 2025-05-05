"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getAssessmentsByCandidate,
  clearError,
  clearSuccess,
} from "@/lib/features/assessment";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableLoader from "@/components/loader/table-loader";
import TableEmpty from "@/components/empty-table";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import API from "@/config/config";


const AssessmentsPage = () => {
  const params = useParams();
  const candidateId = params.id;

  const dispatch = useAppDispatch();
  const { candidateAssessments, isLoading, success, error } = useAppSelector(
    (state) => state.assessment
  );

  useEffect(() => {
    if (candidateId) {
      dispatch(getAssessmentsByCandidate(candidateId));
    }
  }, [candidateId, dispatch]);

  return (
    <div>
      <div className="hidden flex-col md:flex">
        <Header />

        {isLoading ? (
          <TableLoader />
        ) : candidateAssessments.length === 0 ? (
          <TableEmpty />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Remarks</TableHead>
                <TableHead>Evaluation</TableHead>
                <TableHead>Test File</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidateAssessments.map((assessment, index) => (
                <TableRow key={assessment._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{assessment.assessmentType}</TableCell>
                  <TableCell>{assessment.remarks}</TableCell>
                  <TableCell>{assessment.evaluation}</TableCell>
                  <TableCell>
                    {assessment.testFileUrl ? (
                      <Link
                        href={`${API.defaults.baseURL}/${assessment.testFileUrl
                          .replace(/\\/g, "/")
                          .replace("public/", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <AlertSuccess
        isOpen={!!success}
        message={success}
        onClose={() => dispatch(clearSuccess())}
      />
      <AlertFailure
        isOpen={!!error}
        message={error}
        onClose={() => dispatch(clearError())}
      />
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-full bg-gray-50 rounded py-2 px-2 mb-4 border-b">
      <div className="flex h-16 items-center px-2">
        <h1 className="text-2xl font-semibold">Candidate Assessments</h1>
      </div>
    </div>
  );
};

export default AssessmentsPage;
