import { Container } from "@medusajs/ui"

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="aspect-[9/16] w-full bg-gray-100 rounded-lg" />
      <div className="flex justify-between text-body mt-2">
        <div className="w-2/5 h-6 bg-gray-100 rounded-md"></div>
        <div className="w-1/5 h-6 bg-gray-100 rounded-md"></div>
      </div>
    </div>
  )
}

export default SkeletonProductPreview
