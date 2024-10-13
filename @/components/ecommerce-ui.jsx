'use client';
import { ChevronDown, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function ProductCard({
  imgSrc,
  price,
  oldPrice,
  discount,
  sold,
  title,
  location
}) {
  return (
    (<Card>
      <CardContent className="p-4">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-48 object-cover mb-2 rounded" />
        <div className="flex justify-between items-center mb-2">
          <span className="text-red-500 font-bold">{price}</span>
          {oldPrice && <span className="text-gray-500 line-through text-sm">{oldPrice}</span>}
          {discount && <span className="text-red-500 text-sm">{discount}</span>}
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{location}</span>
          <span>Đã bán {sold}</span>
        </div>
      </CardContent>
    </Card>)
  );
}

export function EcommerceUi() {
  return (
    (<div className="flex">
      <div className="w-1/4 bg-white p-4 shadow">
        <div className="mb-4 flex items-center space-x-2">
          <Menu className="w-4 h-4" />
          <span className="font-bold">Tất Cả Danh Mục</span>
        </div>
        <div className="mb-4">
          <div className="font-bold text-red-500">Thiết Bị Điện Tử</div>
          <ul className="ml-4">
            {["Thiết bị đeo thông minh", "Phụ kiện tivi", "Máy Game Console", "Phụ kiện Console", "Đĩa game", "Thêm"].map((item, index) => (
              <li key={index} className="my-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-3/4 ml-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Button variant="destructive">Phổ Biến</Button>
            <Button variant="secondary">Mới Nhất</Button>
            <Button variant="secondary">Bán Chạy</Button>
          </div>
          <div className="relative">
            <Button variant="secondary">
              Giá
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <ProductCard
            imgSrc="https://storage.googleapis.com/a1aa/image/PVkWt3fufiqpFUzMiToVucSZbw8tkHbDlTLG6ptuqR6GEYlTA.jpg"
            price="₫65.000"
            sold="3,6k"
            title="Loa bluetooth K12 Không Dây mini Kèm 2 Micro"
            location="Hà Nội" />
          <ProductCard
            imgSrc="https://storage.googleapis.com/a1aa/image/sauwCX2c00ZRB127hY6n6blv5Ctg8Mv6WhrzffXt48gDEYlTA.jpg"
            price="₫7.900"
            oldPrice="₫15.000"
            discount="-47%"
            sold="15,1k"
            title="[HOT] Loa Bluetooth Mini Loa bluetooth mini di động cảm ứng"
            location="Bình Dương" />
          <ProductCard
            imgSrc="https://storage.googleapis.com/a1aa/image/s0aBj8pkFOazAVtjUfCNLaej1gELuJtyZEdTYkd6ZADFEYlTA.jpg"
            price="₫1.000"
            oldPrice="₫2.300"
            discount="-57%"
            sold="48,3k"
            title="Bao Tay Chơi Game ff, Pubg, Liên Quân..."
            location="Hải Dương" />
          <ProductCard
            imgSrc="https://storage.googleapis.com/a1aa/image/8uXXhm69FTYsFBSeUQRnXfzoITwHU9gYfLqNZ3lfpvCFQgVOB.jpg"
            price="₫55.000"
            oldPrice="₫104.000"
            discount="-47%"
            sold="21,2k"
            title="Tai Nghe Bluetooth Không Dây Có Micro"
            location="Nước ngoài" />
        </div>
      </div>
    </div>)
  );
}