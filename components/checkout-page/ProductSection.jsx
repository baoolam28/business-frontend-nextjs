"user client"
import { Button } from "../../components/ui/button"
import {Heart , MessageCircle } from 'lucide-react'
import FormatVND from "../../utils/formatVND"
export default function ProductSection({data}) {
  return (
    (<section className="bg-white p-6 rounded-lg shadow">
      {data.map((item, index) => {
  return (
    <div key={index} className="bg-white border rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Sản Phẩm</h2>
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Yêu thích
          </Button>
          <Button variant="outline" size="sm">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat ngay
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src={item && item.image ? item.image : "https://via.placeholder.com/80"}
          alt="Product"
          width={80}
          height={80}
          className="rounded-md"
        />
        <div className="flex-grow">
          <h3 className="font-semibold">{item.productName}</h3>
          <p className="text-sm text-gray-500">
            {Object.entries(item.attributes).map(([key, value]) => (
              <div key={key} className="inline-block mr-2 rounded-full bg-gray-100 border border-gray-300 shadow-sm px-2 py-1 text-xs">
                <strong className="font-semibold text-gray-800">{key}:</strong>
                <span className="ml-1 text-gray-600">{value}</span>
              </div>        
            ))}
          </p>
          <p className="font-semibold mt-2">{FormatVND(item.price)}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">SL: {item.quantity}</p>
          <p className="text-sm text-gray-500">Tổng: {FormatVND(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
})}

    </section>)
  );
}