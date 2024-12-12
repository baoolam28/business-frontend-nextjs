"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/component/Header";
import Footer from "./Footer";
import buyerAPI from "../../api/buyer";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Star, MapPin, Store } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import dynamic from 'next/dynamic'
import Loading from "../../components/component/loading-lottie"
import Animation from "../../utils/lottie-animations/rocket.json"
import FormatAsVND from "../../utils/formatVND"
import CategoryBrowse from "../../components/home-page/CategoryBrowse";
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

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await buyerAPI.category.getProductByCategory(categoryId);
        if (response.statusCode === 200) {
          setProducts(response.data);
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
      setLoading(false);
    }
  }, [categoryId]); 

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
    setSelectedRating(rating);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading animation={Animation}/>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col items-center w-full" >
        <CategoryBrowse/>
      </div>
      
      <div className="container mx-auto mt-4 flex">
        
        {/* Sidebar */}
        <div className="w-full md:w-[22%] space-y-6 md:sticky md:top-4 self-start md:pr-2">
          <Card className="shadow-lg rounded-lg">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Tìm kiếm</h2>
                <Input type="text" placeholder="tìm kiếm sản phẩm...." />
              </div>
              <h2 className="text-lg font-semibold mb-2">Duyệt theo cửa hàng</h2>
              <select
                className="py-2 px-4 border rounded"
                value={selectedStore}
                onChange={(e) => filterByStore(e.target.value)}
              >
                <option value="">Cửa hàng</option>
                {stores.map((store) => (
                  <option key={store.storeId} value={store.storeName}>
                    {store.storeName}
                  </option>
                ))}
              </select>
              <div>
                <h2 className="text-lg font-semibold mb-2">Duyệt theo giá</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>Giá: {sortOrder === "asc" ? "Thấp đến cao" : "Cao đến thấp"}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => sortProducts("asc")}>Thấp đến cao</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => sortProducts("desc")}>Cao đến thấp</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Số sao</h2>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`w-5 h-5 cursor-pointer ${
                        rating <= selectedRating ? "text-yellow-400" : "text-gray-400"
                      }`}
                      onClick={() => handleRatingClick(rating)}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Product List */}
        <div className="w-full md:w-[78%] p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products
              .filter(
                (product) =>
                  (!selectedStore || product.storeName === selectedStore) &&
                  (selectedRating === 0 || product.rating >= selectedRating)
              )
              .map((product) => (
                <Card key={product.productId} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-gray-200">
                      <img
                        src={product.images ? product.images[0] : `/placeholder.svg?height=192&width=384`}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg mb-2">{product.productName}</CardTitle>
                    <h4 className="text-lg text-red-500 mb-2">{FormatAsVND(product.price)}</h4>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-5 h-5 ${
                            index < (product.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">({product.totalReviews || "0.0"})</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4">
                    <a href={`/prductDetail?id=${product.productId}`} className="w-full">
                      <Button className="w-full">Xem sản phẩm</Button>
                    </a>
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

export default dynamic(() => Promise.resolve(Category),{ssr: false});
