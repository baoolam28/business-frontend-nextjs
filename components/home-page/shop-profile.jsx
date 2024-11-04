'use client'

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Star, MapPin, ChevronDown, MessageCircle, Package, ShoppingBag, Ticket } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import Header from "../../components/component/Header";
import Footer from "./Footer";

const StarRating = ({
  rating
}) => {
  return (
    (<div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`} />
      ))}
    </div>)
  );
}

const ShopProfile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <div className="flex-grow"> {/* Đảm bảo nội dung dàn hết không gian còn lại */}
        <div className="max-w-5xl mx-auto p-4">
          <header className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-start gap-4 mb-4">
            <img
              src="/placeholder.svg?height=80&width=80"
              className="w-20 h-20 rounded-full"
              alt="Profile picture"
            />
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-bold">Shop Name</h1>
                  <p className="text-gray-500 flex items-center">
                    <ShoppingBag className="w-4 h-4 mr-1" />
                    Online 2 minutes ago
                  </p>
                </div>
                <Button variant="outline" className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              </div>
              <p className="text-gray-600 mt-2 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                123 Store Street, City, Country
              </p>
              <p className="text-gray-600 mt-2 flex items-center">
                <Package className="w-4 h-4 mr-1" />
                196 Products
              </p>
            </div>
          </header>
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2 flex items-center">
              <Ticket className="w-5 h-5 mr-2" />
              Shop Vouchers
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100">
                10% OFF
              </Button>
              <Button variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                Free Shipping
              </Button>
              <Button
                variant="outline"
                className="bg-green-50 text-green-600 hover:bg-green-100">
                Buy 1 Get 1 Free
              </Button>
            </div>
            <div className="mt-4 flex gap-2">
              <Input placeholder="Enter voucher code" />
              <Button>Apply</Button>
            </div>
          </div>
          <div className="mb-4 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort by Price <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full md:w-[78%]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="h-48 bg-gray-200">
                    <img
                      src="/placeholder.svg?height=192&width=384"
                      className="w-full h-full object-cover"
                      alt="Product Name"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">Product Name</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">$99.99</p>
                  <div className="flex items-center mb-2">
                    <StarRating rating={4.5} />
                    <span className="text-sm text-muted-foreground ml-2">(4.5)</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <span>Store Address</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-semibold text-gray-800">Store Name</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShopProfile; 


