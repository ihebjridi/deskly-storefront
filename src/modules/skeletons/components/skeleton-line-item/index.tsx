import { Table } from "@medusajs/ui"

const SkeletonLineItem = () => {
  return (
    <Table.Row className="w-full">
      <Table.Cell className="py-3">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-200 animate-pulse rounded-md" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded-md mb-2" />
            <div className="w-24 h-3 bg-gray-200 animate-pulse rounded-md" />
          </div>
        </div>
      </Table.Cell>
      <Table.Cell className="py-3 text-right">
        <div className="flex flex-col items-end">
          <div className="w-20 h-3 bg-gray-200 animate-pulse rounded-md mb-1" />
          <div className="w-16 h-4 bg-gray-200 animate-pulse rounded-md" />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default SkeletonLineItem
