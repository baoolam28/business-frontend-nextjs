import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { auth } from "./auth"; // Import middleware xác thực hiện tại

// Định nghĩa các quyền truy cập cho từng vai trò
const roleAccess = {
  ROLE_BUYER: ["/home-page", "/wishlist"],
  ROLE_SELLER: ["/dashboard"],
  ROLE_ADMIN: ["/admin-panel"],
  ROLE_STAFF: ["/dashboard"],
};

// Đường dẫn không yêu cầu đăng nhập
const publicPaths = ["/home-page", "/about", "/contact"]; // Thêm đường dẫn cần thiết

const redirectTo = (role) => {
    switch (role) {
        case "ROLE_BUYER":
          return "/home-page";
        case "ROLE_SELLER":
          return "/store/dashboard";
        case "ROLE_ADMIN":
          return "/admin-panel";
        case "ROLE_STAFF":
          return "/store/sale";
        default:
          return "/login"; 
    }
}

export default async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isAuth = !!token; // Kiểm tra xem người dùng có được xác thực không
  const userRole = token?.role; // Lấy vai trò của người dùng từ token
  const pathname = req.nextUrl.pathname;

  // Xác định nếu đường dẫn yêu cầu là trang đăng nhập hoặc đăng ký
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");

  // Nếu trang không yêu cầu đăng nhập
  const isPublicPage = publicPaths.some((path) => pathname.startsWith(path));

  // Nếu trang yêu cầu là public, không cần kiểm tra xác thực
  if (isPublicPage) {
    return NextResponse.next();
  }

  // Nếu là trang login hoặc register và người dùng đã đăng nhập, chuyển hướng đến trang phù hợp
  if (isAuthPage) {
    if (isAuth) {
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

  // Nếu người dùng đã xác thực và có vai trò, kiểm tra quyền truy cập
  const allowedPaths = roleAccess[(userRole as any)] || [];

  // Kiểm tra nếu đường dẫn yêu cầu thuộc phạm vi quyền của vai trò
  const hasAccess = allowedPaths.some((path) => pathname.startsWith(path));

  if (!hasAccess) {
    // Nếu không có quyền truy cập, chuyển hướng đến trang không được phép
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Nếu tất cả kiểm tra đều hợp lệ, gọi middleware xác thực
  return auth(req);
}

export const config = {
  matcher: [
    "/home-page/:path*",
    "/wishlist/:path*",
    "/dashboard/:path*",
    "/admin-panel/:path*",
    "/login",
    "/register",
  ],
};
