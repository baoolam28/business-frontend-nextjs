import React, { useState, useEffect, use } from 'react'
import { StarIcon, CameraIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useRouter, useSearchParams } from 'next/navigation';
import buyerAPI from '../../api/buyer'
import {useUser} from '../../context/UserContext'
import formatAsVND from '../../utils/formatVND'
import { showErrorAlert, showSuccessAlert } from "../../utils/reactSweetAlert"

export default function ProductReviewPage() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [productDetail, setProductDetail] = useState('');

  const { user } = useUser();
  const userId = user ? user.id : null;
  const searchParams = useSearchParams();
  const router = useRouter();
  const productDetailId = searchParams.get('productDetailId');

  console.log("productDetailId:", productDetailId);
  console.log("userId:", userId);
  useEffect(() => {
    if(productDetailId){
      const fetchProductDetail = async () => {
        try {
          const response = await buyerAPI.review.getProductDetail(productDetailId);
          console.log("Full response from API:", response);
          if(response.statusCode === 200){
            const productDetailData = response.data;
            setProductDetail(productDetailData);
            console.log("Product Detail data:", productDetailData);
          }
        } catch (error) {
          console.log("Error fetching product detail: ", error);
        }
      };
      fetchProductDetail();
    }
  }, [productDetailId])

  const handleTagClick = (tag) => {
    // Check if the tag is already in the comment
    if (comment.includes(tag)) {
      // Remove the tag from the comment
      setComment((prevComment) =>
        prevComment.replace(tag, '').replace(/\s{2,}/g, ' ').trim()
      );
    } else {
      // Add the tag to the comment
      setComment((prevComment) => `${prevComment} ${tag}`.trim());
    }
  };

  const handleSubmit = async () => {
    if (!productDetailId || !userId) {
      alert('Không tìm thấy ID sản phẩm hoặc ID người dùng.');
      return;
    }

    const reviewData = {
      userId,
      rating,
      comment,
    };
    try {
      console.log("Review data to send:", reviewData);
      const response = await buyerAPI.review.createNewReview(productDetailId, reviewData);
      if (response.statusCode === 200) {
        console.log("Review submitted successfully:", response.data);
        router.push('/shipmentSuccessfully'); 
        showSuccessAlert("Thành công", "Đã xác nhận sản phẩm thành công");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };


  return (
    (<div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
          Đánh Giá Sản Phẩm
        </h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto mb-8"></div>

        <div className="bg-orange-100 rounded-lg p-4 mb-8 flex items-start">
          <ExclamationTriangleIcon className="w-6 h-6 text-orange-500 mr-2 flex-shrink-0 mt-1" />
          <p className="text-sm text-orange-700">
            Chia sẻ cảm nhận của bạn về tất cả sản phẩm trong cùng đơn hàng với tối thiểu 50 ký tự cùng ít nhất 1 hình ảnh để nhận 100 Shopee Xu.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <img
              src={productDetail?.image || "/placeholder.svg?height=60&width=60"}
              alt="Product"
              className="w-16 h-16 rounded-lg object-cover mr-4" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
              {productDetail?.productName || 'Tên sản phẩm không có'}
              </h2>
              <p className="text-sm text-gray-500">Phân loại hàng: {productDetail.attributes?.color} - {productDetail.attributes?.size}</p>
            </div>
          </div>

          <div className="flex mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star}  onClick={() => setRating(star)} className={`w-8 h-8 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {[
              "Chất lượng sản phẩm tuyệt vời",
              "Đóng gói sản phẩm rất đẹp và chắc chắn",
              "Shop phục vụ rất tốt",
              "Giao hàng nhanh",
              "Giá cả hợp lý",
              "Sẽ mua lại"
            ].map((tag, index) => (
              <button
                key={index}
                onClick={() => handleTagClick(tag)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  comment.includes(tag) ? 'bg-orange-200 text-orange-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                {tag}
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Hãy chia sẻ những điều bạn thích về sản phẩm này nhé."></textarea>

          <div className="mt-4 flex flex-col items-center">
            <button
              className="bg-gray-200 p-4 rounded-full hover:bg-gray-300 transition-colors">
              <CameraIcon className="w-8 h-8 text-gray-600" />
            </button>
            <p className="mt-2 text-sm text-gray-500 italic">
              Cần thêm 50 ký tự và 1 hình ảnh để nhận 100 Shopee Xu.
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors">
          Gửi Đánh Giá
        </button>
      </div>
    </div>)
  );
}

