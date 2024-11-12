'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "../../lib/utils"

export default function   Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const slides = [
    {
      title: "Siêu sale hạ giá",
      subtitle: "Voucher giảm ngay 10%",
      image: "https://res.cloudinary.com/dnfjw5noh/image/upload/v1730975071/banner2_jjrx6c.jpg"
    },
    {
      title: "Siêu sale mùa hè",
      subtitle: "Giảm tới 30% đơn hàng",
      image: "https://res.cloudinary.com/dnfjw5noh/image/upload/v1730975070/banner1_tpyuyt.jpg"
    },
    {
      title: "Ưu đã ",
      subtitle: "Miễn phí ship tất cả đơn hàng",
      image: "https://res.cloudinary.com/dnfjw5noh/image/upload/v1730975070/banner4_xvghg6.jpg"
    },
    {
      title: "Falsh slase tháng 11",
      subtitle: "Nhận ngay voucher 500k",
      image: "https://res.cloudinary.com/dnfjw5noh/image/upload/v1730975069/banner3_rkghq6.jpg"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative max-full h-full overflow-hidden bg-black text-white">
      {/* Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="absolute top-0 left-0 p-8 md:p-12 lg:p-16 max-w-2xl">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-12 bg-white/10 rounded flex items-center justify-center">
                <PhoneIcon className="w-6 h-6" />
              </div>
              <p className="text-lg font-medium">{slides[currentSlide].title}</p>
            </div>
            <h2 className="text-xl sm:text-4xl font-bold tracking-wider leading-tight mb-8">
              {slides[currentSlide].subtitle}
            </h2>
            <a
              href="/shop"
              className="inline-flex items-center group text-lg font-medium"
            >
              <span className="relative">
                <span className="block">Mua ngay</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></span>
              </span>
              <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/75 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
    </section>
  )
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function ShoppingBagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}