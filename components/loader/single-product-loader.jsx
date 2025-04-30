import { Skeleton } from "@/components/ui/skeleton";

const SingleProductLoader = () =>{
    return (
        <>
        <ProductImagesLoader/>
        <ProductDescriptionLoader/>
        </>
    )
}

const ProductImagesLoader = () => {
    return (
        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            {/* Main Image Loader */}
            <div>
                <Skeleton className="w-full lg:w-[510px] aspect-square border border-gray-200 rounded-lg" />
            </div>

            {/* Thumbnail Images Loader */}
            <div className="mt-4 flex gap-2 justify-center">
                {Array(5)
                    .fill("")
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-16 h-16 rounded-md"
                        />
                    ))}
            </div>
        </div>
    );
};

const ProductDescriptionLoader = () => {
  return (
    <div className="mt-6 sm:mt-8 lg:mt-0">
      {/* Product Name Skeleton */}
      <Skeleton className="h-6 w-3/4 sm:w-1/2 mb-4" />

      {/* Product Price Skeleton */}
      <Skeleton className="h-8 w-1/3 mb-6" />

      {/* Action Buttons Skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      {/* Category and Brand Skeleton */}
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
      </div>

      {/* Separator Skeleton */}
      <Skeleton className="h-px w-full mt-6 mb-6" />

      {/* Product Description Skeleton */}
      <div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
      </div>
    </div>
  );
};


export default SingleProductLoader;
