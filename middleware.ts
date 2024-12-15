import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Định nghĩa các quyền truy cập cho từng vai trò
const roleAccess = {
  ROLE_BUYER: 
    ["/home-page", 
      "/cart", 
      "/productDetail", 
      "/category",
      "/account",
      "/orderstatus",
      "/checkout-online",
      "/review",
      "/contact",
      "/orderCancellation",
      "/about",
      "/send-mail",
      "/shipmentSuccessfully",
      "/wishlist"
    ],
  ROLE_SELLER: ["/store", "/home-page"],
  ROLE_ADMIN: ["/admin","/home-page"],
  ROLE_STAFF: ["/store/sale","/home-page"],
};

// Đường dẫn không yêu cầu đăng nhập
const publicPaths = ["/about", "/contact", "/register"];

const redirectTo = (role) => {
  switch (role) {
    case "ROLE_SELLER":
      return "/store"; // Đảm bảo chuyển hướng đúng cho ROLE_SELLER
    case "ROLE_BUYER":
      return "/home-page";
    case "ROLE_ADMIN":
      return "/admin/admin-store";
    case "ROLE_STAFF":
      return "/store/sale";
    default:
      return "/login";
  }
};

export default async function middleware(req) {
  // Lấy token từ JWT
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log("Token:", token);  // Debug log

  const isAuth = !!token; // Kiểm tra xem người dùng đã đăng nhập chưa
  const userRole = token?.role; // Lấy vai trò người dùng từ token

  let pathname = req.nextUrl.pathname;
  console.log("pathname:", pathname);
  
  // Kiểm tra nếu đường dẫn yêu cầu là trang đăng nhập hoặc đăng ký
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // Nếu trang không yêu cầu đăng nhập
  const isPublicPage = publicPaths.some((path) => pathname.startsWith(path));

  // Nếu trang yêu cầu là public, không cần kiểm tra xác thực
  if (isPublicPage) {
    return NextResponse.next();
  }
  

  // Nếu là trang login hoặc register và người dùng đã đăng nhập, chuyển hướng đến trang phù hợp
  if (isAuthPage) {
    if (isAuth && userRole) {
      return NextResponse.redirect(new URL(redirectTo(userRole), req.url));
    }
    return NextResponse.next();
  }

  // Nếu người dùng chưa đăng nhập và cố gắng truy cập các trang được bảo vệ
  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", req.url)); // Chuyển hướng đến trang đăng nhập
  }

  // Nếu người dùng đã xác thực nhưng không có vai trò
  if (!userRole) {
    return NextResponse.redirect(new URL("/unauthorized", req.url)); // Chuyển hướng đến trang không được phép
  }

  


  // Kiểm tra quyền truy cập dựa trên vai trò người dùng
  const allowedPaths = roleAccess[(userRole as any)] || [];
  console.log("Allowed Paths for Role:", allowedPaths);  // Debug log

  // Kiểm tra nếu đường dẫn yêu cầu thuộc phạm vi quyền của vai trò
  const hasAccess = allowedPaths.some((path) => pathname.includes(path));  // Dùng startsWith để cho phép các đường dẫn con
  console.log("Has access:", hasAccess);  // Debug log

  // Nếu người dùng đã xác thực và có quyền truy cập, cho phép tiếp tục
  if (hasAccess) {
    if (pathname.includes("/home-page") && ["ROLE_SELLER", "ROLE_ADMIN", "ROLE_STAFF"].includes((userRole as any))) {
      return NextResponse.redirect(new URL(redirectTo(userRole), req.url));
    } 
    return NextResponse.next();  // Tiếp tục yêu cầu
  }

  // Nếu không có quyền truy cập, chuyển hướng đến trang không được phép
  return NextResponse.redirect(new URL("/unauthorized", req.url));

}

export const config = {
  matcher: [
    "/home-page/:path*",
    "/cart/:path*",
    "/productDetail/:path*",
    "/category/:path*",
    "/store/:path*",  // Đảm bảo tất cả các đường dẫn bắt đầu với "/store" sẽ được kiểm tra
    "/admin/:path*",
    "/login",
    "/register",
    "/cart", 
    "/productDetail", 
    "/category",
    "/account",
    "/orderstatus",
    "/checkout-online",
    "/review",
    "/contact",
    "/orderCancellation",
    "/about",
    "/send-mail",
    "/shipmentSuccessfully",
    "/wishlist"
  ],
};
