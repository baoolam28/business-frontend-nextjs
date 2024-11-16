"use client";
import { useState, useEffect } from 'react'
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
  const [monthData, setMonthData] = useState([])
  const [yearData, setYearData] = useState([])
  const [totalOrder, setTotalOrder] = useState([])
  const [customersData, setCustomersData] = useState([])
  const [productsData, setProductsData] = useState([])

        // Hàm xử lý khi chọn ngày
  const handleDateSelect = (newDateRange) => {
    setDateRange(newDateRange);
      if (newDateRange?.from && newDateRange?.to) {
        setStartDate(newDateRange.from);
        setEndDate(newDateRange.to);
        setActiveFilter('custom');
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
        console.log("Dữ liệu đã được định dạng theo ngày:", JSON.stringify(formattedData));
    } else {
      setRevenueData(null)
    }
  } catch (error) {
    console.error('Error fetching report data:', error);
  }
};

const fetchReportDataByMonth = async () => {
  try {
    const response = await sellerAPI.report.getOrderByMonth(storeId);
    if (response.statusCode === 200) {
     const formattedData = response.data.map(item => ({
        date: `${item[0]}-${item[1]}-${item[2]}`,  // Định dạng date theo dạng 'yyyy-MM-dd' (năm-tháng-ngày)
        revenue: item[3],                          // Doanh thu của ngày đó           // Doanh thu
      }));
      setMonthData(formattedData);
      console.log("Month Data:", JSON.stringify(formattedData));
    }
  } catch (error) {
    console.error("Error fetching report data", error);
     
  }
}


const fetchReportDataByYear = async () => {
  try {
    const response = await sellerAPI.report.getOrderByYear(storeId);
    if (response.statusCode === 200) {

    const formattedData = response.data.map(item => ({
        date: `${item[0]}-${item[1]}`,  // Định dạng date theo dạng 'yyyy-MM' (năm-tháng)
        revenue: item[2],               // Tổng doanh thu trong tháng
      }));
      setYearData(formattedData);
      console.log("year " + JSON.stringify(formattedData))
    }
  } catch (error) {
    console.error("Error fetching report data", error);
  }
}

const fetchReportTotal = async () => {
  try {
    const response = await sellerAPI.report.getTotalOrder(storeId);
    if (response.statusCode === 200) {
      setTotalOrder(response);
      console.log("total " + JSON.stringify(response))
    }
  } catch (error) {
    console.error("Error fetching report total", error)
  }
}

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
      console.log("Top 3 customers: " + JSON.stringify(formattedCustomers));
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
      console.log("Top 3 products: " + JSON.stringify(formattedProducts));
    }

  } catch (error) {
    console.error("Error fetching products", error)
  }
}


useEffect(() => {
  if (!storeId) return;

  const now = new Date();
  let start, end;

  switch (activeFilter) {
   case 'day':
    const isToday = startOfDay(now).getTime() === startOfDay(new Date()).getTime();
    start = startOfDay(now);
    end = endOfDay(now);
  
    if (isToday) {
    // Truyền start và end vào hàm fetchReportDataByDay
      fetchReportDataByDay(start, end);
    }
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
    fetchReportTotal();
    fetchCustomers();
    fetchProducts();
  }

}, [activeFilter, dateRange, storeId]);

  
const chartData = 
  activeFilter === 'custom' 
    ? revenueData 
    : activeFilter === 'month' 
    ? monthData 
    : activeFilter === 'year' 
    ? yearData 
    : activeFilter === 'day' 
    ? revenueData 
    : null;


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
    (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Revenue Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>View revenue trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <Button
                  variant={activeFilter === 'day' ? 'default' : 'outline'}
                  onClick={() => { setActiveFilter('day'); setDateRange(undefined); }}>
                  Today
                </Button>
                <Button
                  variant={activeFilter === 'month' ? 'default' : 'outline'}
                  onClick={() => { setActiveFilter('month'); setDateRange(undefined); }}>
                  This Month
                </Button>
                <Button
                  variant={activeFilter === 'year' ? 'default' : 'outline'}
                  onClick={() => { setActiveFilter('year'); setDateRange(undefined); }}>
                  This Year
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
            <span>Pick a date range</span>
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
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {renderChart()}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productsData.map((product, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.sold} units sold</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4">
              View More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Based on number of purchases</CardDescription>
          </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customersData.map((customer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-sm text-gray-500">{customer.orders} orders</p>
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
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalOrder.data)}
          </div>  
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>)
  );
}