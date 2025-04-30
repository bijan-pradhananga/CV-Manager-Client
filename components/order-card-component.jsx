import Link from "next/link";

const OrderCardComponent = ({ order, handleCancelOrder }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-y-4 lg:gap-x-6 px-2 py-6">
            <dl className="w-full sm:w-1/2 lg:w-1/4">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Order ID:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white truncate">
                    <a href="#" className="hover:underline">
                        {order._id}
                    </a>
                </dd>
            </dl>
            <dl className="w-full sm:w-1/2 lg:w-1/4">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Date:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {new Date(order.createdAt).toLocaleDateString("en-CA").replace(/-/g, ".")}
                </dd>
            </dl>
            <dl className="w-full sm:w-1/2 lg:w-1/4">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Price:
                </dt>
                <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                    {order.totalAmount}
                </dd>
            </dl>
            <dl className="w-full sm:w-1/2 lg:w-1/4">
                <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                    Status:
                </dt>
                <dd
                    className={`me-2 mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-bold ${order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                >
                    {order.status}
                </dd>
            </dl>
            <div className="w-full grid grid-cols-2 lg:flex lg:w-1/4 lg:items-center lg:justify-end gap-4 ">
                {/* Cancel Button */}
                <div className="lg:w-auto">
                    {(order.status === 'Pending' && order.paymentStatus!=='Paid') ? (
                        <button
                            type="button"
                            onClick={() => handleCancelOrder(order._id)}
                            className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                        >
                            Cancel
                        </button>
                    ) : (
                        <div className="invisible w-full rounded-lg px-3 py-2">&nbsp;</div>
                    )}
                </div>

                {/* View Button */}
                <Link
                    href={`/orders/${order._id}`}
                    className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                >
                    View
                </Link>
            </div>
        </div>
    );
};

export default OrderCardComponent;
