'use client'

import { useState, useEffect, useMemo  } from 'react'
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import {Slider} from "@nextui-org/slider";
import { cn } from "../../lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from "../../components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import FormatAsVND from '../../utils/formatVND'
import ProductVariantsCarousel from '../../components/component/product-variants-carousel'

export default function ProductDashboard({productsOnline}) {
  console.log("productsOnline: " + JSON.stringify(productsOnline));
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [priceRange, setPriceRange] = useState([0, 0])
  const [expandedProduct, setExpandedProduct] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)

  const filteredProducts = useMemo(() => {

    let result = products;

    if (searchTerm) {
      result = result.filter(product => product.productName.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (categoryFilter) {
      result = result.filter(product => product.categoryName === categoryFilter)
    }

    if (priceRange[0] < priceRange[1]) {
      result = result.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    }

    return result;
  }, [products, searchTerm, categoryFilter, priceRange]);

  const uniqueCategories = products.filter((product, index, self) =>
    index === self.findIndex(p => p.categoryName === product.categoryName)
  );

  useEffect(() => {
    if(productsOnline){
      setProducts(productsOnline)
      setDefaultPriceRange()
    }
  },[productsOnline])

  const setDefaultPriceRange = () => {
    const prices = productsOnline.map(product => product.price); // Get an array of prices

    const minPrice = Math.min(...prices); // Get the minimum price
    const maxPrice = Math.max(...prices); // Get the maximum price

    // Set the price range (assuming you have state or another mechanism for storing this)
    setPriceRange([ minPrice,maxPrice ]);
  };


  const handleAddProduct = () => {
    
  }

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product })
  }

  const handleSaveEdit = () => {
    setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId))
  }

  const toggleProductExpansion = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId)
  }

  return (
    <div className="container mx-auto  space-y-6">
      <h1 className="text-3xl font-bold">Quản lý sản phẩm online</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={categoryFilter ? categoryFilter : "loại hàng" }/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={null}>Loại hàng</SelectItem>
             {uniqueCategories.map((product) => (               
                <SelectItem key={product.categoryId} value={product.categoryName}>
                  {product.categoryName}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <a href="/store/product/online/create-product">
              <Button onClick={handleAddProduct}>
                <Plus className="mr-2 h-4 w-4" /> thêm sản phẩm
              </Button>
        </a>
      </div>

      <div className="space-y-2">
        <label htmlFor="price-range" className="text-sm font-medium">
          Khoảng giá: {priceRange[0]} đ - {priceRange[1]} đ
        </label>
        <Slider
          size="lg"
          label="Theo giá"
          maxValue={5000000}
          step={10}
          defaultValue={[0, 1000000]}
          onChange={setPriceRange}
          formatOptions={{style: "currency", currency: "VND"}}
          classNames={{
            base: "max-w-md gap-3",
            filler: "bg-gradient-to-r from-pink-300 to-cyan-300 dark:from-pink-600 dark:to-cyan-800",
          }}
          renderThumb={({index, ...props}) => (
            <div
              {...props}
              className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
            >
              <span
                className={cn(
                  "transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
                  index === 0
                    ? "from-pink-200 to-pink-500 dark:from-pink-400 dark:to-pink-600" // first thumb
                    : "from-cyan-200 to-cyan-600 dark:from-cyan-600 dark:to-cyan-800", // second thumb
                )}
              />
            </div>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.productId} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">{product.productName}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Menu</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                      <Edit className="mr-2 h-4 w-4" /> Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProductImageCarousel images={product.images} />
              <div className="mt-4">
                <p className="text-2xl font-bold">{FormatAsVND(product.price.toFixed(2))}</p>
                <p className="text-md text-muted-foreground">{product.categoryName}</p>
              </div>
            </CardContent>
            <CardFooter className="flex-grow flex flex-col justify-end">
              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => toggleProductExpansion(product.productId)}
              >
                {expandedProduct === product.productId ? (
                  <>
                    <ChevronUp className="mr-2 h-4 w-4" /> Ẩn biến thể
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-2 h-4 w-4" /> Xem biến thể
                  </>
                )}
              </Button>
              {expandedProduct === product.productId && (
                <ProductVariantsCarousel variants={product.variants} />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={editingProduct !== null} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  value={editingProduct.category}
                  onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Lighting">Lighting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ProductImageCarousel({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
          <div className="aspect-w-4 aspect-h-2 w-full max-w-md">
      <img 
        src={images[currentImageIndex] ? images[currentImageIndex] : 'https://via.placeholder.com/150'} 
        alt={`Product image ${currentImageIndex + 1}`} 
        className="object-cover w-full h-full  max-h-80 rounded"
      />
    </div>

      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentImageIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}