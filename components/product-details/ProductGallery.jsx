import React, { useState, useEffect } from "react";

function ProductGallery({ images , variantImage }) {
  const defaultImage = 'https://shpetro.com/images/no_image.png';
  const [selectedImage, setSelectedImage] = useState(defaultImage);
  
  useEffect(() => {
    setSelectedImage(images[0] || defaultImage);
  },[images])

  return (
    <div className="flex flex-col items-center w-[64%] max-md:w-full max-md:ml-0">
      

      <div className="flex w-full gap-4">
        {/* Vertical thumbnails to the left of the main image */}
        <div className="flex flex-col gap-2 max-md:hidden">
          {Array.isArray(images) &&
            images.slice(0,3).map((image, index) => (
            <div
              key={index}
              className={`flex overflow-hidden justify-center items-center p-1 rounded cursor-pointer border ${
                selectedImage === image ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                loading="lazy"
                src={image || defaultImage}
                className="object-cover w-32 h-32"
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Main image */}
        <div className="flex-1 overflow-hidden rounded-lg border bg-neutral-100">
          <img
            loading="lazy"
            src={variantImage ? variantImage : selectedImage}
            className="object-contain w-full h-full max-h-[400px] max-md:max-w-full"
            alt="Main product"
          />
        </div>
      </div>
      {/* Horizontal thumbnails above the main image */}
      <div className="flex gap-2 mb-4 justify-start max-md:flex-wrap">
        {Array.isArray(images) &&
          images.slice(3).map((image, index) => (
          <div
            key={index}
            className={`flex overflow-hidden p-1 rounded cursor-pointer border ${
              selectedImage === image ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setSelectedImage(image)}
          >
            <img
              loading="lazy"
              src={image || defaultImage}
              className="object-cover w-32 h-32 max-md:w-16 max-md:h-16"
              alt={`Thumbnail ${index + 4}`}
            />
          </div>
        ))}
      </div>

    </div>
  );
}

export default ProductGallery;
