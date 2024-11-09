'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import  {Button}  from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import FormatAsVND from "../../utils/formatVND"

interface Variant {
  productDetailId: number
  price: number
  quantityInStock: number
  sku: string
  image: string
  height: number
  length: number
  width: number
  weight: number
  attributes: Record<string, string>
}

interface ProductVariantsCarouselProps {
  variants: Variant[]
}

export default function ProductVariantsCarousel({ variants }: ProductVariantsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % variants.length)
    }, 1500) // Change variant every 5 seconds

    return () => clearInterval(timer)
  }, [variants.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + variants.length) % variants.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % variants.length)
  }

  const variant = variants[currentIndex]

  if(variant){
    return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col md:flex-row border rounded-lg shadow-sm overflow-hidden">
        <div className="relative w-full md:w-1/2 h-64 md:h-96">
          <img 
            src={variant.image} 
            alt={variant.sku} 
            className="object-cover w-full h-full  min-w-40 rounded"
          />
        </div>
        <div className="flex-1 p-6 lg:p-8 bg-background">
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{variant.sku}</h3>
              <p className="text-3xl font-bold text-primary mb-4">{FormatAsVND(variant.price.toFixed(2))}</p>
              <p className="mb-4 text-muted-foreground">Còn lại: {variant.quantityInStock}</p>
              
              <div className="flex flex-wrap gap-2">
                {Object.entries(variant.attributes).map(([key, value]) => (
                  <Badge key={key} variant="secondary" className="text-sm">
                    {key}: {value}
                  </Badge>
                ))}
              </div>
              <div className="mt-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Kích thước</p>
                  <p className="text-foreground">{variant.length} x {variant.width} x {variant.height} cm</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Trọng lượng</p>
                  <p className="text-foreground">{variant.weight} g</p>
                </div>
              </div>
            </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        onClick={goToPrevious}
        aria-label="Previous variant"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        onClick={goToNext}
        aria-label="Next variant"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {variants.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
  }

  return <div>Không có biến thể</div>
}