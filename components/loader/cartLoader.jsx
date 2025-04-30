import { Skeleton } from "../ui/skeleton";

const CartLoader = () => {
    return (
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                    <CartComponentLoader />
                    <CartComponentLoader />
                    <CartComponentLoader />
                </div>
            </div>
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <CheckOutFormLoader />
            </div>
        </div>
    )
}

export default CartLoader

const CartComponentLoader = () => {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                {/* Skeleton for Image */}
                <div className="shrink-0 md:order-1">
                    <Skeleton className="h-32 w-32 rounded" />
                </div>

                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    {/* Skeleton for Price */}
                    <div className="text-end md:order-4 md:w-32">
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    {/* Skeleton for Product Name */}
                    <Skeleton className="h-6 w-48" />
                    <div className="flex items-center gap-4">
                        {/* Skeleton for Quantity */}
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CheckOutFormLoader = () => {
    return (
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            {/* Skeleton for Order Summary Title */}
            <Skeleton className="h-6 w-48" />
            <div className="space-y-4">
                <div className="space-y-2">
                    {/* Skeletons for order details */}
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                </div>
                {/* Skeleton for Total */}
                <div className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-24" />
                </div>
            </div>
            {/* Skeleton for Button */}
            <Skeleton className="h-10 w-full" />
            <div className="flex items-center justify-center gap-2">
                {/* Additional Skeletons for links */}
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
            </div>
        </div>
    );
};
