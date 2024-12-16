"use client";
import { useState, useEffect, use } from 'react'
import { ArrowRight, DollarSign, ShoppingCart, Users, Calendar as CalendarIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover"
import { Calendar } from "../../components/ui/calendar"
import { cn } from "../../lib/utils"
import { format, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear, set } from "date-fns"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import sellerAPI from '../../api/seller';
import {useStore} from "../../context/StoreContext"; 
import {showSuccessAlert} from "../../utils/reactSweetAlert"
import Menu from "../component/menu";




export default function RevenueDashboardComponent() {
  const [chartType, setChartType] = useState('line')
  const [revenueData, setRevenueData] = useState([])
  const [activeFilter, setActiveFilter] = useState('month')
  const [data, setData] = useState([]);  // State để lưu trữ dữ liệu báo cáo
  const [startDate, setStartDate] = useState(new Date());  // Ngày bắt đầu
  const [endDate, setEndDate] = useState(new Date());  // Ngày kết thúc
  const { storeId } = useStore();
  const [dateRange, setDateRange] = useState(null) // trạng thái lưu trữ phạm vi ngày đã chọn
  const [reportData, setReportData] = useState([])
  const [dayData, setDayData] = useState([])
  const [monthData, setMonthData] = useState([])
  const [yearData, setYearData] = useState([])
  const [totalOrder, setTotalOrder] = useState([])
  const [customersData, setCustomersData] = useState([])
  const [productsData, setProductsData] = useState([])
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [staffs, setStaffs] = useState([])
  const [showOverlay, setShowOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceDetails, setInvoiceDetails] = useState();

        // Hàm xử lý khi chọn ngày
  const handleDateSelect = (newDateRange) => {
    setDateRange(newDateRange);
      if (newDateRange?.from && newDateRange?.to) {
        setStartDate(newDateRange.from);
        setEndDate(newDateRange.to);
        setActiveFilter('custom');
      }
    };

const handleViewDetails = async (orderId) => {
  console.log("Order ID Input:", orderId);
  
  // Đảm bảo chuyển orderId thành chữ thường
  const normalizedOrderId = orderId.toLowerCase(); // Lưu lại giá trị mới
  
  try {
    const orderDetails = await fetchOrderDetail();
    console.log("Fetched Order Details:", orderDetails); // Kiểm tra dữ liệu trả về

    const selectedInvoice = orderDetails.find(
      (invoice) => invoice.orderId.toLowerCase() === normalizedOrderId // So sánh với orderId đã chuyển sang chữ thường
    );

    if (!selectedInvoice) {
      console.warn("Order ID not found in details:", normalizedOrderId);
      return;
    }

    setSelectedInvoice(selectedInvoice);
    setShowOverlay(true);
  } catch (error) {
    console.error("Error fetching order details:", error);
  }
};


  const closeShowLay = () => {
    setSelectedInvoice(null); // Xóa chi tiết hóa đơn khi đóng
    setShowOverlay(true); // Mở lại overlay danh sách hóa đơn nếu cần
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStaff = async () => {
    const staffData = {
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      fullName: fullName,
      email: email,
      storeId : storeId
    };
    try {
const response = await sellerAPI.auth.createNewStaff(staffData);
      if (response.statusCode === 200) {
        // Xử lý khi thêm nhân viên thành công
        alert('Thêm nhân viên thành công!');
        setIsAddingStaff(false); // Đóng form
      } else {
        alert('Có lỗi xảy ra khi thêm nhân viên');
      }
    } catch (error) {
      console.error('Lỗi khi thêm nhân viên:', error);
      alert('Lỗi khi thêm nhân viên. Vui lòng thử lại.');
    }
  };

  const handleDelete = async (userId) => {
    try {
      console.log("Gọi API xóa nhân viên với userId:", userId); // Log userId
      const response = await sellerAPI.auth.deleteStaff(userId);
      
      console.log("Kết quả trả về từ API:", response); // Log toàn bộ kết quả trả về
      if (response.statusCode === 200) { // Kiểm tra mã trạng thái HTTP trả về
        setStaffs(staffs.filter((staff) => staff.userId !== userId));
      } else {
        console.error("Có lỗi xảy ra khi xóa nhân viên", response);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa nhân viên:", error);
    }
  };



  const fetchReportDataByDay = async (startDate, endDate) => {
    try {
      const response = await sellerAPI.report.getOrderByDay(storeId, startDate.toISOString(), endDate.toISOString());
      if (response.statusCode === 200) {
        const formattedData = response.data.map(item => ({
          revenue: item[0],     
          date: item[1],         
        }));
          setRevenueData(formattedData);  
      } else {
        setRevenueData(null)
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const fetchReportDataByToday = async () => {
    try {
      const response = await sellerAPI.report.getOrderByToday(storeId);
      if(response.statusCode === 200) {
        const formattedData = response.data.map(item => ({
          date: `${item[0]}:${item[1]}:${item[2]}`, // Chuyển timestamp thành ngày
          revenue: item[3]
        }));
        setDayData(formattedData);
      } 
    } catch (error) {
      console.log("Error fetching report data", error);
    }
  }


  const fetchReportDataByMonth = async () => {
    try {
      const response = await sellerAPI.report.getOrderByMonth(storeId);
      if (response.statusCode === 200) {
        const formattedData = response.data.map(item => ({
          date: item[1],           // Tháng
          revenue: item[2],         // Doanh thu
        }));
        setMonthData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching report data", error);
    }
  };


  const fetchReportDataByYear = async () => {
    try {
      const response = await sellerAPI.report.getOrderByYear(storeId);
      if (response.statusCode === 200) {

      const formattedData = response.data.map(item => ({
          date: `${item[0]}-${item[1]}`,  // Định dạng date theo dạng 'yyyy-MM' (năm-tháng)
          revenue: item[2],               // Tổng doanh thu trong tháng
        }));
        setYearData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching report data", error);
    }
  };

  const fetchReportTotal = async () => {
    try {
      const response = await sellerAPI.report.getTotalOrder(storeId);
      if (response.statusCode === 200) {
        setTotalOrder(response);
      }
    } catch (error) {
      console.error("Error fetching report total", error)
    }
  };

  const fetchCustomers = async () => {
    try {
      
      const response = await sellerAPI.report.getTop3Customers(storeId);
      
      
      if (response.statusCode === 200) {
      
        const formattedCustomers = response.data.map((customer, index) => ({
          name: customer[1],
          orders: customer[3],
          rank: index === 0 ? 'Gold' : index === 1 ? 'Silver' : 'Bronze'
        }));
        setCustomersData(formattedCustomers);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchProducts = async () => {
    try {

      const response = await sellerAPI.report.getTop3Products(storeId);

      if (response.statusCode === 200) {

        const formattedProducts = response.data.map((product, index) => ({
          name: product[1],
          sold: product[2]
        }));
        setProductsData(formattedProducts);
      }

    } catch (error) {
      console.error("Error fetching products", error)
    }
  };

  const fetchStaffs = async () => {
    try {
      const response = await sellerAPI.auth.getAllStaffByStoreId(storeId);

      if (response.statusCode === 200 && Array.isArray(response.data)) {
        // Lấy và định dạng lại chỉ với fullName và phoneNumber
        const formattedStaffs = response.data.map((staff) => ({
          fullName: staff.fullName,
          phoneNumber: staff.phoneNumber,
          userId: staff.userId
        }));
        setStaffs(formattedStaffs); 
      } else {
        console.error("Invalid data format or no data available.");
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  const fetchrOders = async () => {
    
    try {

      const response = await sellerAPI.report.getAllOrderByStoreId(storeId);

      if (response.statusCode === 200) {
        const formattedOrders = response.data.map((order) => ({
          orderId: order[0],
          fullName: order[2],
          phoneNumber: order[3],
          date: order[1],
          totalAmount: order[5]
        }));
        setInvoices(formattedOrders)
      }
    } catch (error) {
      console.error("Error fetching oders data:", error);
    }
  };


  const fetchOrderDetail = async () => {
  try {
    const response = await sellerAPI.report.getOrderDetailByStoreId(storeId);

    if (response.statusCode === 200) {
      const formattedOrderDetail = response.data.map((order) => ({
        orderId: order.orderId,
        fullName: order.customerName,
        phoneNumber: order.customerPhone,
        totalAmount: order.orderDetails.reduce((total, detail) => total + detail.price * detail.quantity, 0), // Tính tổng giá
        date: new Date(order.orderDate).toLocaleString("vi-VN"), // Định dạng ngày
        paymentMethod: order.paymentMethod,
        products: order.orderDetails.map((detail) => ({
          productName: detail.name,
          quantity: detail.quantity,
          price: detail.price,
          barcode: detail.barcode,
        })),
      }));
      return formattedOrderDetail; // Trả về dữ liệu đã định dạng
    } else {
      throw new Error("Lỗi khi lấy chi tiết đơn hàng");
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
    return [];
  }
};




  useEffect(() => {
    if (!storeId) return;

    const now = new Date();
    let start, end;

    switch (activeFilter) {
    case 'day':
        fetchReportDataByToday();
        break;
      case 'month':
        fetchReportDataByMonth();
        break;
      case 'year':
        fetchReportDataByYear();
        break;
      case 'custom':
        if (dateRange?.from && dateRange?.to) {
          start = dateRange.from;
          end = dateRange.to;
        } else {
          start = startOfMonth(now);
          end = endOfMonth(now);
        }
        break;
      default:
        console.error("Active filter không hợp lệ:", activeFilter);
        return; // Dừng lại nếu filter không hợp lệ
    }

    // Gọi API fetch dữ liệu nếu `start` và `end` đã xác định
    if (start && end) {
      fetchReportDataByDay(start, end);
    }

    if (storeId) {
      fetchStaffs();
      fetchReportTotal();
      fetchCustomers();
      fetchProducts();
      fetchrOders();
    }

  }, [activeFilter, dateRange, storeId]);

  
const chartData = activeFilter === 'custom' ? revenueData : activeFilter === 'day' ? dayData : activeFilter === 'month' ? monthData : yearData;



  const renderChart = () => {
    const ChartComponent = chartType === 'line' ? LineChart : BarChart;
    const DataComponent = chartType === 'line' ? Line : Bar;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ChartComponent data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <DataComponent type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" />
        </ChartComponent>
      </ResponsiveContainer>
    );
  };

  

  return (
<div className="flex w-fit h-fit flex-col bg-muted/40 ml-8 p-4">
      <Menu/>
      (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Bảng điều khiển doanh thu</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Bảng điều khiển doanh thu</CardTitle>
            <CardDescription>Xem xu hướng doanh thu theo thời gian</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <Button
                  variant={activeFilter === 'day' ? 'default' : 'outline'}
                  onClick={() => { setActiveFilter('day'); setDateRange(undefined); }}>
                  Ngày hôm nay
                </Button>
                <Button
                  variant={activeFilter === 'month' ? 'default' : 'outline'}
                  onClick={() => { setActiveFilter('month'); setDateRange(undefined); }}>
                  Tháng này
                </Button>
                <Button
                  variant={activeFilter === 'year' ? 'default' : 'outline'}
                  onClick={() => { setActiveFilter('year'); setDateRange(undefined); }}>
                  Năm nay
                </Button>
                 <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={activeFilter === 'custom' ? 'default' : 'outline'}
          className="w-[300px] justify-start text-left font-normal"
          onClick={() => setActiveFilter('custom')}
        >
<CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
              </>
            ) : (
              format(dateRange.from, 'LLL dd, y')
            )
          ) : (
            <span>Chọn ngày</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleDateSelect} // Gọi hàm xử lý chọn ngày
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
              </div>
              <Select defaultValue="line" onValueChange={setChartType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Biều đồ đường</SelectItem>
                  <SelectItem value="bar">Biểu đồ cột</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {renderChart()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sản phẩm được mua nhiều</CardTitle>
            <CardDescription>Sản phấm bán chạy nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productsData.map((product, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.sold} đã bán</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4">
              Xem thêm <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Khách hàng mua nhiều nhất</CardTitle>
            <CardDescription>Số lượng khách hàng mua</CardDescription>
          </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customersData.map((customer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.orders} đơn</p>
                  </div>
                </div>
                <Badge variant={customer.rank}>{customer.rank}</Badge>
              </div>
            ))}
</div>
        </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu của cửa hàng</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalOrder.data)}
          </div>  
          </CardContent>
        </Card>


             <div className="relative">
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách hoá đơn</CardTitle>
                  <CardDescription>Bấm vào để xem hoá đơn chi tiết</CardDescription>
                </CardHeader>
                <CardContent>
                  <button
                    className="bg-black text-white px-4 py-2 rounded"
                    onClick={() => setShowOverlay(true)}
                  >
                    Danh sách hoá đơn
                  </button>
                </CardContent>
              </Card>

              {/* Overlay - Danh sách hoá đơn */}
              {showOverlay && !selectedInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded shadow-lg w-full  relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                      onClick={() => setShowOverlay(false)}
                    >
                      Đóng
                    </button>
                    <h2 className="text-lg font-bold mb-4">Danh sách hoá đơn</h2>
                    <input
                      type="text"
                      placeholder="Tìm kiếm khách hàng..."
                      className="w-full p-2 border border-gray-300 rounded mb-4"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">ID Hoá Đơn</th>
                            <th className="border border-gray-300 px-4 py-2">Tên Khách Hàng</th>
                            <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                            <th className="border border-gray-300 px-4 py-2">Tổng giá</th>
                            <th className="border border-gray-300 px-4 py-2">Ngày mua</th>
                            <th className="border border-gray-300 px-4 py-2"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredInvoices.map((invoice) => (
                            <tr key={invoice.orderId} className="hover:bg-gray-100">
                              <td className="border border-gray-300 px-4 py-2">{invoice.orderId}</td>
                              <td className="border border-gray-300 px-4 py-2">{invoice.fullName}</td>
                              <td className="border border-gray-300 px-4 py-2">{invoice.phoneNumber}</td>
                              <td className="border border-gray-300 px-4 py-2">{invoice.totalAmount}</td>
                              <td className="border border-gray-300 px-4 py-2">{invoice.date}</td>
                              <td className="border border-gray-300 px-4 py-2">
                                <button
                                  className="bg-blue-500 text-white px-4 py-2 rounded"
                                  onClick={() => handleViewDetails(invoice.orderId)}
                                >
                                  Xem Chi Tiết
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay - Chi tiết hoá đơn */}
              {selectedInvoice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-4xl relative">
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                      onClick={closeShowLay}
                    >
                      Đóng
                    </button>
                    <h2 className="text-lg font-bold mb-4">Chi Tiết Hoá Đơn</h2>
                    <div className="mb-4">
                    <p><strong>ID Hoá Đơn:</strong> {selectedInvoice.orderId}</p>
                    <p><strong>Ngày giờ:</strong> {selectedInvoice.date}</p>
                    <p><strong>Tên Khách Hàng:</strong> {selectedInvoice.fullName}</p>
                    <p><strong>Số Điện Thoại:</strong> {selectedInvoice.phoneNumber}</p>
                    <p><strong>Phương Thức Thanh Toán:</strong> {selectedInvoice.paymentMethod}</p>
                  </div>
                  <h3 className="font-semibold mb-2">Danh Sách Sản Phẩm</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Tên Sản Phẩm</th>
                        <th className="border border-gray-300 px-4 py-2">Số Lượng</th>
                        <th className="border border-gray-300 px-4 py-2">Giá</th>
                        <th className="border border-gray-300 px-4 py-2">Barcode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.products.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="border border-gray-300 px-4 py-2">{product.productName}</td>
                          <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                          <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                          <td className="border border-gray-300 px-4 py-2">{product.barcode}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}
            </div>



        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Danh sách nhân viên</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* Hiển thị danh sách nhân viên */}
                <div className="space-y-2">
                 {staffs.map((staff, index) => (
                  <div key={index} className="flex justify-between text-sm font-medium">
                    <span>{staff.fullName}</span>
                    <span>{staff.phoneNumber}</span>
                    <button
                      onClick={() => {
                        console.log("Kiểm tra userId:", staff.userId); // Kiểm tra giá trị userId
                        if (staff.userId) {
                          handleDelete(staff.userId);
                        } else {
                          console.error("userId không hợp lệ cho nhân viên", staff);
                        }
                        showSuccessAlert("Xoá nhân viên", "Xoá thành công")
                        window.location.reload();
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                ))}

              </div>
            </CardContent>
          </Card>


         {/* New card to add staff */}
           <Card>
          <CardHeader>
            <CardTitle>Thêm Nhân Viên</CardTitle>
            <CardDescription>Click vào để thêm nhân viên mới</CardDescription>
          </CardHeader>
          <CardContent>
            {!isAddingStaff ? (
              <Button onClick={() => setIsAddingStaff(true)} variant="default">
                Thêm Nhân Viên
              </Button>
            ) : (
<div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <input
                  type="text"
                  placeholder="Nhập username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                />
                <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                />
                <input
                  type="text"
                  placeholder="Nhập tên đầy đủ"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                />
                <input
                  type="email"
                  placeholder="Nhập email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
                />
                <Button 
                  onClick={() => {
                    handleAddStaff(); 
                    setUsername('');
                    setPassword('');
                    setPhoneNumber('');
                    setFullName('');
                    setEmail('');
                    showSuccessAlert("Thêm nhân viên", "thêm thành công")
                    window.location.reload();
                  }}  
                  style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', transition: 'background-color 0.3s' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
                >
                  Thêm nhân viên
                </Button>
              </div>
)}
          </CardContent>
        </Card>
      </div>
    </div>)
    </div>
  );
}