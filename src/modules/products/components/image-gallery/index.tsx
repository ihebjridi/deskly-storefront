"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 rounded-lg">
        {images[selectedImage]?.url && (
          <Image
            src={images[selectedImage].url}
            priority={true}
            className="object-cover"
            alt={`Product image ${selectedImage + 1}`}
            fill
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          />
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-3">
        {images.slice(0, 5).map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              selectedImage === index
                ? 'border-tech-blue ring-2 ring-tech-blue/20'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {image.url && (
              <Image
                src={image.url}
                className="object-cover"
                alt={`Product thumbnail ${index + 1}`}
                fill
                sizes="80px"
              />
            )}
          </button>
        ))}
        {images.length > 5 && (
          <div className="relative aspect-square w-20 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
            <span className="text-sm text-gray-600 font-medium">+{images.length - 5} more</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery
