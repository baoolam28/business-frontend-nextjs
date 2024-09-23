'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, Eye, ChevronLeft, ChevronRight, ShoppingCart, User } from "lucide-react"

export default function HomepageComponent() {
  return (
    (<div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 flex-grow">
        {/* Header */}
        <header className="flex justify-between items-center py-4 border-b">
          <div className="text-2xl font-bold">Logo</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Shop</a>
            <a href="#" className="hover:underline">Product</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search" className="w-32 md:w-auto" />
            <Button variant="ghost" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span
                className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-1">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Login</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Hero Section */}
        <section className="my-8">
          <div className="bg-gray-200 h-64 md:h-96 rounded-lg"></div>
        </section>

        {/* Flash Sales */}
        <section className="my-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-500">Today's</h3>
              <h2 className="text-2xl font-bold">Flash Sales</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="bg-gray-100 px-2 py-1 rounded">
                  <span className="font-bold">00</span>
                  <span className="text-xs">Days</span>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded">
                  <span className="font-bold">00</span>
                  <span className="text-xs">Hours</span>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded">
                  <span className="font-bold">00</span>
                  <span className="text-xs">Minutes</span>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded">
                  <span className="font-bold">00</span>
                  <span className="text-xs">Seconds</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <CardContent className="p-4">
                  <div className="relative">
                    <div className="bg-gray-200 h-48 mb-2 rounded"></div>
                    <span
                      className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">-50%</span>
                    <button className="absolute top-2 right-2 p-1 bg-white rounded-full">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="absolute bottom-2 right-2 p-1 bg-white rounded-full">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="text-sm font-semibold mb-1">Product Name</h3>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-red-500 font-bold">$99.99</span>
                    <span className="text-gray-500 line-through text-sm">$199.99</span>
                  </div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-4 w-4 fill-current text-yellow-500"
                        viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-gray-500 text-sm ml-1">(88)</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline">View All Products</Button>
          </div>
        </section>

        {/* Browse by Category */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item}>
                <CardContent className="p-4 text-center">
                  <div className="bg-gray-200 h-16 w-16 mx-auto mb-2 rounded-full"></div>
                  <div className="text-sm">Category</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Selling Products */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Best Selling Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <CardContent className="p-4">
                  <div className="bg-gray-200 h-48 mb-2 rounded"></div>
                  <div className="text-sm">Product Name</div>
                  <div className="text-red-500 font-bold">$99.99</div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button variant="outline">View All Products</Button>
          </div>
        </section>

        {/* Curated Top Products */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Curated Top Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item}>
                <CardContent className="p-4">
                  <div className="bg-gray-200 h-48 mb-2 rounded"></div>
                  <div className="text-sm">Product Name</div>
                  <div className="text-red-500 font-bold">$99.99</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* New Arrival */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">New Arrival</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-200 h-64 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-200 h-32 rounded"></div>
              <div className="bg-gray-200 h-32 rounded"></div>
              <div className="bg-gray-200 h-32 rounded"></div>
              <div className="bg-gray-200 h-32 rounded"></div>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-gray-100 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <p className="text-sm text-gray-600">We are a leading e-commerce platform offering a wide range of products at competitive prices.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Customer Service</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
                <li><a href="#" className="hover:underline">Sitemap</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-2">Subscribe to our newsletter for the latest updates and offers.</p>
              <form className="flex">
                <Input type="email" placeholder="Your email" className="flex-grow" />
                <Button type="submit" className="ml-2">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            © 2023 Your E-commerce Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>)
  );
}