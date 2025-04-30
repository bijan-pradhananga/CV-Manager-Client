"use client";
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
import Search from "@/components/admin-search-bar";
import {clearError, clearSuccess, deleteCandidate, fetchCandidates, searchCandidates } from "@/lib/features/candidate";

const Candidates = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, success, error } = useAppSelector((state) => state.candidate);

  const handleDelete = async (id) => {
    let confirm = window.confirm("Are you sure u want to delete this product?");
    if (confirm) {
      const result = await dispatch(deleteCandidate(id));
      if (deleteCandidate.fulfilled.match(result)) {
        dispatch(fetchCandidates());
      }
    }
  }

  // Define functions to handle fetching and searching
  const fetchItems = () => {
    dispatch(fetchCandidates()); // Fetch all categories
  };

  const searchItems = (query) => {
    dispatch(searchCandidates(query)); // Search categories based on query
  };



  useEffect(() => {
    dispatch(fetchCandidates());
  }, [dispatch])
  return (
    <div>
      <div className=" hidden flex-col md:flex  ">
        <Header fetchItems={fetchItems} searchItems={searchItems} />
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
                  <TableHead>Status</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead >Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item._id}>
                    {/* Serial Number */}
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    {/* Name */}
                    <TableCell>{item.name}</TableCell>
                    {/* Status */}
                    <TableCell>{item.interviewStatus}</TableCell>
                    {/* Level */}
                    <TableCell>{item.level}</TableCell>
                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`candidates/edit-candidate?id=${item._id}`}
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
                        <Link href={`candidates/${item._id}`}
                          className="px-2 py-1 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Details
                        </Link>
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

const Header = ({ fetchItems, searchItems }) => {
  return (
    <div className="w-full bg-gray-50 rounded py-2 px-2 mb-4 border-b">
      <div className="flex h-16 items-center px-2">
        <h1 className="text-2xl font-semibold">
          Candidates
        </h1>
        <div className="ml-auto flex items-center space-x-4">
          <Search fetchItems={fetchItems} searchItems={searchItems} />
        </div>
      </div>
    </div>
  )
}

export default Candidates