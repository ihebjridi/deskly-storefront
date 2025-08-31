const SkeletonOrderItems = () => {
  return (
    <div className="flex flex-col gap-4 py-10 border-y border-gray-200">
      <div className="grid grid-cols-[122px_1fr] gap-4">
        <div className="w-full aspect-[29/34] bg-gray-100 rounded-md animate-pulse"></div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="w-48 h-6 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="w-32 h-4 bg-gray-100 rounded-md animate-pulse"></div>
          </div>
          <div className="w-32 h-6 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-[122px_1fr] gap-4">
        <div className="w-full aspect-[29/34] bg-gray-100 rounded-md animate-pulse"></div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="w-48 h-6 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="w-32 h-4 bg-gray-100 rounded-md animate-pulse"></div>
          </div>
          <div className="w-32 h-6 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-[122px_1fr] gap-4">
        <div className="w-full aspect-[29/34] bg-gray-100 rounded-md animate-pulse"></div>
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="w-48 h-6 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-100 rounded-md animate-pulse"></div>
            <div className="w-32 h-4 bg-gray-100 rounded-md animate-pulse"></div>
          </div>
          <div className="w-32 h-6 bg-gray-100 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonOrderItems
