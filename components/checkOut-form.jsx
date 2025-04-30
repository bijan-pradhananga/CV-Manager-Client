import Link from "next/link"
import { Button } from "./ui/button"

const CheckOutForm = ({ totalPrice, cartItems }) => {

    return (
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
                Order summary
            </p>
            <div className="space-y-4">
                {/* per product price quantity */}
                <div className="space-y-2">
                    {
                        cartItems.map((item, index) => (
                            <dl className="flex items-center justify-between gap-4" key={index}>
                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400 w-1/2">
                                    {`${item.product.name} x ${item.quantity}`}
                                </dt>
                                <dd className="text-base font-medium text-gray-900 dark:text-white">
                                    Rs. {item.product.price*item.quantity}
                                </dd>
                            </dl>
                        ))
                    }
                </div>
                {/* total  */}
                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                        Rs. {totalPrice}
                    </dd>
                </dl>
            </div>
            <Link href='/cart/checkout'>
                <Button
                    className="w-full py-2 mt-2"
                >
                    Proceed to Checkout
                </Button>
            </Link>
            <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                </span>
                <Link
                    href='/product'
                    title=""
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                    Continue Shopping
                    <svg
                        className="h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 12H5m14 0-4 4m4-4-4-4"
                        />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default CheckOutForm