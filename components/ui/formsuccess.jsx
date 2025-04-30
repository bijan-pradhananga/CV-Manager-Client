import { CircleCheckBig } from "lucide-react";

export const FormSuccess = ({
    message
})=>{
    if (!message) return null;
    return (
        <div className="bg-emerald-500/15 mt-3 rounded-md p-3 flex items-center gap-x-2 text-sm text-emerald-500">
            <CircleCheckBig className="w-4 h-4"/>
            <p>{message}</p>
        </div>
    )
}