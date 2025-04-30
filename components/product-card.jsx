import Link from "next/link";
import API from "@/config/config";

const ProductCard = ({ product }) => {
    return (
        <Link href={`/product/${product._id}`}>
            <div className="group relative">
                <ProductCardHeader product={product} />
                <ProductCardBody product={product} />
            </div>
        </Link>
    )
}

const ProductCardHeader = ({ product }) => {
    return (
        <img
            src={`${API.defaults.baseURL}/${product.images[0]}`}
            alt={product.name}
            className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
        />
    )
}

const ProductCardBody = ({ product }) => {
    return (
        <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm text-gray-700">
                  
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                  
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.brand.name}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">Rs.{product.price}</p>
        </div>
    )
}



export default ProductCard