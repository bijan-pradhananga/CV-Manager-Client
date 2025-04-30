"use client";
import { clearError, clearSuccess, deleteInterviewer, fetchInterviewers } from "@/lib/features/interviewer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableLoader from "@/components/loader/table-loader";
import TableEmpty from "@/components/empty-table";
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import Link from "next/link";

const InterviewersPage = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, success, error } = useAppSelector((state) => state.interviewer);

  const handleDelete = async (id) => {
    let confirm = window.confirm("Are you sure you want to delete this interviewer?");
    if (confirm) {
      const result = await dispatch(deleteInterviewer(id));
      if (deleteInterviewer.fulfilled.match(result)) {
        dispatch(fetchInterviewers());
      }
    }
  }



  useEffect(() => {
    dispatch(fetchInterviewers());
  }, [dispatch]);

  return (
    <div>
      <div className="hidden flex-col md:flex">
        <Header />
        <>
          {isLoading ? (
            <TableLoader />
          ) : data.length === 0 ? (
            <TableEmpty />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`interviewers/edit-interviewer?id=${item._id}`}
                          className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      </div>
      <AlertSuccess
        isOpen={success}
        message={success}
        onClose={() => dispatch(clearSuccess())}
      />
      <AlertFailure
        isOpen={error}
        message={error}
        onClose={() => dispatch(clearError())}
      />
    </div>
  )
}

const Header = () => {
  return (
    <div className="w-full bg-gray-50 rounded py-2 px-2 mb-4 border-b">
      <div className="flex h-16 items-center px-2">
        <h1 className="text-2xl font-semibold">
          Interviewers
        </h1>
    
      </div>
    </div>
  )
}

export default InterviewersPage