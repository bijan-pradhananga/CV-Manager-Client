import { Skeleton } from "../ui/skeleton";


const HeaderLoader = () => {
    return (
        <div className="w-full py-2 mb-4 border-b">
            <div className="flex h-16 justify-center items-center">
                {/* Title Skeleton */}
                <Skeleton className="h-8 w-36" />
                <div className="ml-auto w-full md:w-fit gap-2 flex items-center justify-between lg:justify-normal">
                    {/* Search Bar Skeleton */}
                    <Skeleton className="h-10 w-64 rounded-md" />

                    {/* Sort Button Skeleton */}
                    <Skeleton className="h-10 w-20 rounded-md" />
                </div>
            </div>
        </div>
    );
};



export default HeaderLoader