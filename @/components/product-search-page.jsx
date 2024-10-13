'use client'

import { useState } from "react"
import { Search, Star, MapPin } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export function ProductSearchPageComponent() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(1000)

  const handlePriceChange = (values) => {
    setMinPrice(values[0])
    setMaxPrice(values[1])
  }

  return (
    (<div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <h1
        className="text-4xl font-bold text-primary text-center mb-12 flex items-center justify-center">
        <Search className="mr-2" />
        Product Search
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Filters */}
        <div className="w-full md:w-1/4 space-y-6 md:sticky md:top-4 self-start">
          <Card className="shadow-lg rounded-lg">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Search</h2>
                <Input type="text" placeholder="Search products..." />
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Categories</h2>
                <div className="space-y-2">
                  {["Electronics", "Clothing", "Books", "Home & Garden"].map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox id={category} />
                      <label
                        htmlFor={category}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={[minPrice, maxPrice]}
                  onValueChange={handlePriceChange}
                  className="mb-2" />
                <div className="flex justify-between text-sm">
                  <span>${minPrice}</span>
                  <span>${maxPrice}</span>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Brands</h2>
                <div className="space-y-2">
                  {["Brand A", "Brand B", "Brand C", "Brand D"].map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox id={brand} />
                      <label
                        htmlFor={brand}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Rating</h2>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star key={rating} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2">& Up</span>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Location</h2>
                <Input type="text" placeholder="Enter location..." />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">Apply Filters</Button>
            </CardContent>
          </Card>
        </div>

        {/* Product List */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((product) => (
              <Card
                key={product}
                className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="h-48 bg-gray-200">
                    <img
                      src={`/placeholder.svg?height=192&width=384`}
                      alt={`Product ${product}`}
                      className="w-full h-full object-cover" />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">Product {product}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">$99.99</p>
                  <div className="flex items-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`} />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">(4.0)</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    New York, NY
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm">
                    Add to Cart
                  </Button>
                  <Button variant="secondary" size="sm">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>)
  );
}