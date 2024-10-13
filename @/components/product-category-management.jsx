'use client'

import { useState } from 'react'
import { Star, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for categories and products
const categories = ['Home Appliances', 'Vacuum Cleaners', 'Blenders', 'Kitchen Appliances', 'Lighting']
const products = [
  { id: 1, name: 'Super Blender', category: 'Blenders', price: 99.99, originalPrice: 129.99, rating: 4, tags: ['Freeshop', '10.10 Sale'], location: 'New York' },
  { id: 2, name: 'Quiet Vacuum', category: 'Vacuum Cleaners', price: 149.99, originalPrice: 199.99, rating: 5, tags: ['10.10 Sale'], location: 'Los Angeles' },
  { id: 3, name: 'Smart Lamp', category: 'Lighting', price: 79.99, originalPrice: 99.99, rating: 3, tags: ['Freeshop'], location: 'Chicago' },
  // Add more products as needed
]

export function ProductCategoryManagementComponent() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [sortOrder, setSortOrder] = useState(null)
  const [sortType, setSortType] = useState(null)

  const filteredProducts = products.filter(product => 
    (!selectedCategory || product.category === selectedCategory) &&
    (selectedFilters.length === 0 || selectedFilters.includes(product.category))).sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.price - b.price
    if (sortOrder === 'highToLow') return b.price - a.price
    return 0
  })

  return (
    (<div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white p-4 shadow-md">
        <h2 className="font-bold text-red-600 mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setSelectedCategory(category)}>
                {category}
              </Button>
            </li>
          ))}
        </ul>
        <h3 className="font-bold mt-6 mb-2">Filter by Category</h3>
        {categories.map(category => (
          <div key={category} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={category}
              checked={selectedFilters.includes(category)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedFilters([...selectedFilters, category])
                } else {
                  setSelectedFilters(selectedFilters.filter(f => f !== category))
                }
              }} />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      {/* Main Content */}
      <div className="w-full md:w-3/4 p-4">
        {/* Filter & Sort */}
        <div className="flex flex-wrap justify-between items-center mb-4">
          <div className="space-x-2 mb-2 md:mb-0">
            <Button
              variant={sortType === 'popular' ? 'default' : 'outline'}
              onClick={() => setSortType('popular')}>
              Popular
            </Button>
            <Button
              variant={sortType === 'newest' ? 'default' : 'outline'}
              onClick={() => setSortType('newest')}>
              Newest
            </Button>
            <Button
              variant={sortType === 'bestSeller' ? 'default' : 'outline'}
              onClick={() => setSortType('bestSeller')}>
              Best Seller
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Price <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortOrder('lowToHigh')}>
                Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder('highToLow')}>
                High to Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                alt={product.name}
                className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-red-600 font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{product.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>)
  );
}