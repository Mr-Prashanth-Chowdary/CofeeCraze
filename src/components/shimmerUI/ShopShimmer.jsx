// Shimmer UI Component
const ShimmerProduct = () => (
    <div className="animate-pulse">
      {/* Main Content Shimmer */}
      <div className="flex flex-wrap md:flex-nowrap gap-8 p-6 max-w-6xl mx-auto">
        {/* Image Gallery Shimmer */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-gray-200 mb-4 rounded-lg"></div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[100px] h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
  
        {/* Product Details Shimmer */}
        <div className="w-full md:w-1/2 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          
          <div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
  
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
  
          <div className="flex gap-4">
            <div className="flex-1 h-12 bg-gray-200 rounded"></div>
            <div className="flex-1 h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
  
      {/* Story Section Shimmer */}
      <div className="w-4/5 mx-auto mt-12 p-6 border rounded-lg flex">
        <div className="w-[40%] pr-4 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          <div className="w-24 h-8 bg-gray-200 rounded"></div>
        </div>
        <div className="w-[60%] h-[300px] bg-gray-200 rounded-lg"></div>
      </div>
  
      {/* Brewing Methods Shimmer */}
      <div className="flex flex-col items-center justify-center py-8">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="flex flex-row justify-center items-center w-full max-w-4xl space-x-4">
          <div className="w-[40%] p-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="w-[60%] h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );

  export default ShimmerProduct