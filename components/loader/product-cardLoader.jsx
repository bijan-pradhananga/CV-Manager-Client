import { Skeleton } from "@/components/ui/skeleton"

const ProductCardLoader = ({ count }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="group relative">
                    <Skeleton className="aspect-square w-full rounded-md lg:aspect-auto lg:h-80" />

                    <div className="mt-4 flex justify-between">
                        <div>
                            <Skeleton className="w-[100px] h-5 rounded-lg" />
                            <Skeleton className="w-20 h-3 mt-1" />
                        </div>
                        <Skeleton className="w-20 h-5" />
                    </div>
                </div>
            ))}
        </>

    )
}



export default ProductCardLoader