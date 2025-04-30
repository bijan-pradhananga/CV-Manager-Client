import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarDays, Clock, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InterviewCard({ candidate, interview, handleReject }) {
    return (
        <Card className="w-full max-w-2xl mb-2">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Interview Details</span>
                    <span className={`text-sm font-normal px-3 py-1 rounded-full ${interview.reminderSent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {interview.reminderSent ? 'Reminder Sent' : 'Pending Reminder'}
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4">
                {/* Candidate Information */}
                <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2 text-gray-700">
                        <User className="h-4 w-4" /> Candidate Information
                    </h3>
                    <div className="pl-6 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-medium min-w-[60px]">Name:</span>
                            <span>{interview.candidate.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium min-w-[60px]">Email:</span>
                            <span className="text-blue-600">{interview.candidate.email}</span>
                        </div>
                    </div>
                </div>

                {/* Interviewer Information */}
                <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2 text-gray-700">
                        <User className="h-4 w-4" /> Interviewer Information
                    </h3>
                    <div className="pl-6 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="font-medium min-w-[60px]">Name:</span>
                            <span>{interview.interviewer.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium min-w-[60px]">Email:</span>
                            <span className="text-blue-600">{interview.interviewer.email}</span>
                        </div>
                    </div>
                </div>

                {/* Interview Schedule */}
                <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2 text-gray-700">
                        <CalendarDays className="h-4 w-4" /> Interview Schedule
                    </h3>
                    <div className="pl-6 space-y-2">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 opacity-70" />
                            <span className="font-medium min-w-[60px]">Date:</span>
                            <span>{interview.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 opacity-70" />
                            <span className="font-medium min-w-[60px]">Time:</span>
                            <span>{interview.time}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
            {/* Remarks and Actions */}
            <CardFooter className="flex flex-col gap-4 border-t pt-4 items-start">

                <div className="flex gap-4">
                    {candidate?.interviewStatus === 'Shortlisted' ? (
                        <>
                            <Button variant="default" 
                            // onClick={handleProceed}
                            >
                                Proceed to Second Interview
                            </Button>
                            <Button variant="outline" 
                            // onClick={handleSendAssessment}
                            >
                                Send Assessment
                            </Button>
                            <Button variant="destructive" onClick={handleReject}>
                                Reject 
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center">
                            <span className="text-sm font-medium">Current Status:</span>
                            <span
                                className={`ml-2 px-3 py-1 text-xs rounded-full ${candidate?.interviewStatus === 'Rejected'
                                        ? 'bg-red-100 text-red-800'
                                        : candidate?.interviewStatus === 'Hired'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-blue-100 text-blue-800'
                                    }`}
                            >
                                {candidate?.interviewStatus}
                            </span>
                        </div>
                    )}
                </div>

            </CardFooter>

        </Card>
    );
}