import { Skeleton } from "../ui/skeleton";

const OrderCardLoader = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-4 lg:gap-x-6 px-2 py-6">
            {/* Order ID */}
            <dl className="w-full sm:w-1/2 lg:w-1/4">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    <Skeleton className="h-4 w-24" />
                </dt>
                <dd className="mt-1.5">
                    <Skeleton className="h-6 w-full" />
                </dd>
            </dl>

            {/* Date */}
            <dl className="w-full sm:w-1/2 lg:w-1/4">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    <Skeleton className="h-4 w-16" />
                </dt>
                <dd className="mt-1.5">
                    <Skeleton className="h-6 w-32" />
                </dd>
            </dl>

            {/* Price */}
            <dl className="w-full sm:w-1/2 lg:w-1/4">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    <Skeleton className="h-4 w-16" />
                </dt>
                <dd className="mt-1.5">
                    <Skeleton className="h-6 w-20" />
                </dd>
            </dl>

            {/* Status */}
            <dl className="w-full sm:w-1/2 lg:w-1/4">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    <Skeleton className="h-4 w-20" />
                </dt>
                <dd className="mt-1.5">
                    <Skeleton className="h-6 w-16 rounded-lg" />
                </dd>
            </dl>

            {/* Buttons */}
            <div className="w-full grid grid-cols-2 lg:flex lg:w-1/4 lg:items-center lg:justify-end gap-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
            </div>
        </div>
    );
};

export default OrderCardLoader;
