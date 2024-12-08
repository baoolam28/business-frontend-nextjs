"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button"
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import Image from "next/image"
import buyerAPI from "../../api/buyer";
import Pagination from "../../components/component/pagination";

export default function ReviewPage({ productId }) {

    const [reviewsData, setReviewsData] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [ratingFilter, setRatingFilter] = useState(null);
    const [reviewCountByRating, setReviewCountByRating] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        if(!productId) return;
        fetchProductReviews();
    }, [productId])

    const fetchProductReviews = async () => {
        try {
            const response = await buyerAPI.review.getAllReviewProduct(productId);
            console.log("Product reviews: ",response)

            if(response.statusCode === 200){
                setReviewsData(response.data);
                setReviews(response.data.review);
                calculateReviewCounts(response.data.review);
                console.log("Product reviews data: ",response.data);
                console.log("Product reviews: ",response.data.review);
            }
        } catch (error) {
            console.error("Error fetching product reviews:", error);
        }
    }

    const calculateReviewCounts = (reviews) => {
        const counts = reviews.reduce(( acc, review) => {
            acc[review.rating] = (acc[review.rating] || 0) + 1
            return acc;
        }, {});
        setReviewCountByRating(counts)
    }

    const handleReviewByRating = (rating) =>{
        setRatingFilter(rating); // Cập nhật trạng thái rating
        if (rating === null) {
            setReviews(reviewsData.review); // Hiển thị tất cả review nếu không lọc
        } else {
            const filteredReviews = reviewsData.review.filter(
                (review) => review.rating === rating
            );
            setReviews(filteredReviews);
        }
    }

    const averageRating = (
        reviewsData.review?.reduce((sum, review) => sum + review.rating, 0) /
            reviewsData.review?.length || 0
    ).toFixed(1);

    const indexOfLastReview = currentPage * itemsPerPage;
    const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
      window.scrollTo({ top: 1320, behavior: 'smooth' });
    };
    
    return(
       ( <div className="flex justify-center py-12">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Đánh Giá Sản Phẩm</h2>

                    {/* Rating Summary */}
                    <div className="flex items-start gap-12 mb-8">
                    <div className="flex flex-col items-center">
                        <div className="text-6xl font-extrabold text-red-500">{averageRating}</div>
                        <div className="text-gray-500 text-sm">trên 5</div>
                        <div className="flex mt-2 gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${
                            i < Math.round(averageRating) ? "fill-red-500 text-red-500" : "text-gray-300"
                            }`} />
                        ))}
                        </div>
                    </div>

                    {/* Rating Filters */}
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-4 mb-4">
                        <Button  onClick={() => handleReviewByRating(null)} variant="outline" className={`h-8 ${
                            ratingFilter === null ? "bg-red-500 text-white" : "bg-gray-100"
                        }`}>
                        Tất Cả
                        </Button>
                        {[5, 4, 3, 2, 1].map((rating) =>(
                            <Button key={rating} onClick={() => handleReviewByRating(rating)} variant="outline" className={`h-8 ${
                            ratingFilter === rating ? "bg-red-500 text-white" : "bg-gray-100"
                            }`}>
                                {rating} sao ({reviewCountByRating[rating] || 0})
                            </Button>
                        ))}
                        </div>
                        <div className="flex gap-3">
                        <Button variant="outline" className="h-8">Có Bình Luận (2.1k)</Button>
                        <Button variant="outline" className="h-8">Có Hình Ảnh / Video (992)</Button>
                        </div>
                    </div>
                    </div>

                    {/* Review List */}
                    <div className="space-y-6">
                        {reviews.length > 0 ? (
                            currentReviews.map((review, index) => (
                            <div key={index} className="border rounded-lg p-6 bg-gray-50 shadow-sm hover:shadow-lg transition">
                                <div className="flex gap-4 mb-4">
                                    <Avatar>
                                        <AvatarImage src={review.imageUser || "/placeholder.svg"} />
                                        <AvatarFallback>{review.username}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-lg">{review.username}</div>
                                        <div className="flex gap-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-red-500 text-red-500" />
                                            ))}
                                        </div>
                                        <div className="text-sm text-gray-500">{review.reviewDate} | 
                                            Phân loại hàng:     
                                            {Object.entries(review.attributes).map(([key, value]) => (
                                            <div
                                                key={key}
                                                className="inline-block mr-2 mb-2 rounded-full bg-gray-100 border border-gray-300 shadow-sm px-2 py-1 text-xs"
                                            >
                                                <strong className="font-semibold text-gray-800">{key}:</strong>
                                                <span className="ml-1 text-gray-600">{value}</span>
                                            </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="space-y-2 mb-4">
                                    <div className="flex gap-2">
                                    <span className="text-gray-600">Chất lượng sản phẩm:</span>
                                    <span>{review.comment}</span>
                                    </div>
                                </div> */}
                                <div className="text-gray-700 text-base mb-4">{review.comment}</div>

                                {/* Review images */}
                                {review.imageUrls?.length > 0 &&(
                                    <div className="grid grid-cols-5 gap-4">
                                        {review.imageUrls?.map((imageUrl, i) => (
                                            <div key={i} className="relative rounded-lg overflow-hidden bg-gray-200 h-24">
                                                <Image
                                                    src={imageUrl || "/placeholder.svg"}
                                                    alt={`Review image ${i + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                               

                                {/* Like Button */}
                                <Button
                                    variant="outline"
                                    className="mt-4 text-gray-500 text-sm hover:bg-gray-100"
                                >
                                    ❤️ {review.likeCount}
                                </Button>
                            </div>
                        ))
                        ) : (
                            <div className="text-center text-gray-500">
                                Sản phẩm chưa có review nào
                            </div>
                        )}
                        
                    </div>
                </div>
                <div className="m-3">
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={reviews.length}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>)
    );
}