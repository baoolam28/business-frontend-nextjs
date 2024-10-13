"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/component/Header";
import Footer from "./Footer";
import buyerAPI from "../../api/buyer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Slider } from "../../components/ui/slider";
import ProductCard from "./ProductCard";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Search, Star, MapPin ,Store } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const Category = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id"); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [selectedStore, setSelectedStore] = useState(""); 
  const [stores, setStores] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0); 
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await buyerAPI.category.getAllSotre(); 
        if (response.statusCode === 200 && response.data) {
          setStores(response.data);
        } else {
          console.error("Failed to fetch stores:", response.status);
        }
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores(); 
  }, []);


  const handlePriceChange = ({values , number},[]) => {
    setMinPrice(values[0])
    setMaxPrice(values[1])
  }

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await buyerAPI.category.getProductByCategory(categoryId); 
        if (response.statusCode === 200) {
          setProducts(response.data); 
          console.log(response.data)
        } else {
          console.error("Failed to fetch products:", response.status);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); 
      }
    };

    if (categoryId) {
      fetchProductsByCategory();
    } else {
      console.error("No categoryId found.");
    }
  }, [categoryId]);

  if (loading) {
    return <p>Loading products...</p>; 
  }

  const sortProducts = (order) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === "asc") return a.price - b.price;
      return b.price - a.price;
    });
    setProducts(sortedProducts);
    setSortOrder(order);
  };

  const filterByStore = (StoreId) => {
    setSelectedStore(StoreId);
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating); // Cập nhật rating được chọn
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto mt-4 flex">
        {/* Sidebar */}
        <div className="w-full md:w-[22%] space-y-6 md:sticky md:top-4 self-start md:pr-2">
          <Card className="shadow-lg rounded-lg">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Search</h2>
                <Input type="text" placeholder="Search products..." />
              </div>
                <h3 className="mb-2">Lọc theo cửa hàng</h3>
                <select
                  className="py-2 px-4 border rounded"
                  value={selectedStore}
                  onChange={(e) => filterByStore(e.target.value)}
                >
                  <option value="">Chọn cửa hàng</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.storeName}>{store.storeName}</option>
                  ))}
                </select>

              <div>
                <h2 className="text-lg font-semibold mb-2">Price Range</h2>   
                  {/* Dropdown sắp xếp theo giá */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button>Sắp xếp: {sortOrder === "asc" ? "Giá tăng dần" : "Giá giảm dần"}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => sortProducts("asc")}>Giá tăng dần</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => sortProducts("desc")}>Giá giảm dần</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Rating</h2>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} onClick={() => handleRatingClick(rating)} className="cursor-pointer">
                      <Star className={`w-5 h-5 ${rating <= selectedRating ? 'text-yellow-400' : 'text-gray-400'} fill-current`} />
                    </div>
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
        <div className="w-full md:w-[78%] p-4">
          {/* Danh sách sản phẩm */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.filter((product) => (!selectedStore || product.storeName === selectedStore) &&
                                          (selectedRating === 0 || product.rating >= selectedRating) ).map((product) => (
              <Card key={product.productId} className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="p-0">
                  <div className="h-48 bg-gray-200">
                    <img
                      src={product.imageUrl || `/placeholder.svg?height=192&width=384`}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.productName}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">{product.price} VND</p>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-4 h-4 ${index < (product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">({product.totalReviews || "0.0"})</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4 mr-1" /> {/* Icon vị trí nằm trước địa chỉ */}
                    <span className="ml-2 text-sm">{product.pickupAddress || "Địa chỉ không xác định"}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Store className="w-4 h-4 mr-1" /> 
                    <span className="font-semibold text-gray-800">{product.storeName}</span> {/* Tên cửa hàng */}
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button className="w-full">Thêm vào giỏ hàng</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Category;
