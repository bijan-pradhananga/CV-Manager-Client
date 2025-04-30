import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { addToCart, clearError, clearSuccess } from '@/lib/features/cart';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import AlertSuccess from "@/components/alert-success";
import AlertFailure from "@/components/alert-failure";
import { fetchSingleProduct } from '@/lib/features/product';

const ProductActionBtns = ({ product }) => {
    const { data: session } = useSession();
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);
    const { error, success } = useAppSelector((state) => state.cart);

    const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, product.stock)); // Increment, but not exceed stock
    const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1)); // Decrement, but not below 1

    const handleAddToCart = async () => {
        if (session && session.user.id) {
            const result = await dispatch(addToCart({ userId: session.user.id, productId: product._id, quantity }));
            if (addToCart.fulfilled.match(result)) {
                dispatch(fetchSingleProduct(product._id));
            }
        } else {
            alert("Please Login First!");
        }

    };


    return (
        <div className="mt-6 md:flex">
            {product.stock > 0 ? (
                <>
                    {/* Add to Cart Button */}
                    <AddToCartBtn product={product} quantity={quantity} handleAddToCart={handleAddToCart} />

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 ml-4 mt-6 md:mt-0">
                        <span className="font-semibold">Quantity:</span>
                        <Button
                            className="cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                            onClick={handleDecrement}
                            disabled={quantity === 1}
                        >
                            -
                        </Button>
                        <span className="px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md">
                            {quantity}
                        </span>
                        <Button
                            className="cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                            onClick={handleIncrement}
                            disabled={quantity === product.stock}
                        >
                            +
                        </Button>
                    </div>
                </>
            ) : (
                /* Out of Stock Button */
                <Button
                    variant="secondary"
                    className="text-black font-semibold rounded-md px-6 py-5 cursor-not-allowed"
                    disabled
                >
                    Out of Stock
                </Button>
            )}
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
    );
};

const AddToCartBtn = ({ handleAddToCart }) => {
    return (
        <Button className="flex items-center gap-2 px-6 py-6 rounded-md font-medium transition-colors hover:bg-primary-hover" onClick={handleAddToCart}>
            <ShoppingCartIcon className="h-5 w-5" />
            Add to Cart
        </Button>
    );
};

function ShoppingCartIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
}

export default ProductActionBtns;
