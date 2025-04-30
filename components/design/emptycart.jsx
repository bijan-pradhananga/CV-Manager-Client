import Link from "next/link"

const EmptyCart = () => {
    return (
        <div className="container mx-auto my-8 space-y-10">
            <div className="max-w-4xl mx-auto px-10 py-4 bg-white ">

                <div className="flex flex-col justify-center py-12 items-center">
                    <div className="flex justify-center items-center">
                        <img
                            className="w-64 h-64"
                            src="/cart.png"
                            alt="Empty cart illustration"
                        />
                    </div>
                    <h1 className="text-gray-700 font-medium text-2xl text-center mb-3">
                        Your Cart Is Empty
                    </h1>
                    <p className="text-gray-500 text-center mb-6">
                        Add items to your cart to start shopping and enjoy great deals.
                    </p>
                    <div className="flex flex-col justify-center">
                        <Link href='/product'>
                            <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Shop Now
                            </button>
                        </Link>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default EmptyCart