"use client"
import { useState, useEffect, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Banknote, CreditCard, QrCode } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import formatVND from "../../utils/formatVND"
import QrCodeCard  from "../../components/component/qrCodeCard"
import sellerAPI from "../../api/seller"
import PaymentSuccess from "../../components/component/payment-success"
import { PrinterCheck } from 'lucide-react';

export default function Component() {
    const [loading, setLoading] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState(0);
    const router = useRouter();
    const [selectedMethod, setSelectedMethod] = useState('cash');
    const [selecteStatus, setSelecteStatus] = useState(true)
    const [subtotal, setSubtotal] = useState(0);
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const [isPayment, setIsPayment] = useState(false);
    const [qrCode, setQrCode] = useState([]);
    const [qrData, setQrData] = useState({});
    const [error, setError] = useState('');
    const [order, setOrder] = useState([]); 

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        try {
          const response = await sellerAPI.order.getOrderById(orderId);
          console.log("response: ", response);

          if (response.statusCode === 200) {

            if(response.data && response.data.paymentStatus){
              setIsPayment(true);
              return;
            }

            setOrder(response.data);
            generateDataFromInvoice(response.data);
            console.log("Order data: ", response.data);

          } else {
            console.error("Không thể lấy đơn hàng:", response.status);
            setError("Không thể lấy đơn hàng. Vui lòng thử lại.");
          }
        } catch (err) {
          console.error("Lỗi khi lấy đơn hàng:", err);
          setError("Đã xảy ra lỗi khi lấy đơn hàng. Vui lòng thử lại.");
        } finally {
          setLoading(false);
        }
      };

      fetchOrder();
    } else {
      setError("Không tìm thấy orderId trong URL.");
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (order && order.orderDetails) {
      let payAmount = 0;
      order.orderDetails.forEach((detail) => {
        payAmount += detail.price * detail.quantity;
      });
      setPaymentAmount(payAmount);
    }
  }, [order]);

  useEffect(() => {
    console.log("isPayment: ", isPayment);
    console.log("selectedMethod: ", selectedMethod);
    console.log("qrData: ", qrData);
    
    if (!isPayment && selectedMethod === 'qr') {
        if (qrData.accountNo && qrData.amount) {
            GenerateQrCode();
        }
    }
}, [selectedMethod, qrData]);

const GenerateQrCode = useCallback(
    async () => {
        console.log("Generating QR Code with data: ", qrData);
        try {
            const qrCode = await sellerAPI.payment.createQrCode(qrData);
            setQrCode(qrCode.data);
            console.log("QR Code data: ", qrCode.data);
            console.log("QR Code: " + qrCode.data);
        } catch (error) {
            console.error("Failed to generate QR code: " + error.message);
        }
    },
    [qrData] // Include qrData to recreate when it changes
);

const GeneratePaymentData = (amount, addInfo) => {
    const qrData = {
        accountNo: process.env.NEXT_PUBLIC_ACCOUNT_NO,
        accountName: process.env.NEXT_PUBLIC_ACCOUNT_NAME,
        acqId: process.env.NEXT_PUBLIC_ACQ_ID,
        amount: amount,
        addInfo: addInfo,
        format: "text",
        template: process.env.NEXT_PUBLIC_TEMPLATE
    };
    console.log("qr data: " + qrData)

    return qrData; // Return the data object
};


  const generateDataFromInvoice = (invoice) => {
      const amount = invoice.orderDetails.reduce((acc, item) => acc + (item.quantity * item.price), 0);
      const addInfo = invoice.orderId;
      const paymentData = GeneratePaymentData(amount, addInfo);
      setSubtotal(amount);
      setQrData(paymentData);
      console.log("paymentData: " + paymentData);
  };

  const paymentByCash = async () => {
    try {
        const PaymentData = {
            paymentMethod: selectedMethod,
            paymentStatus: selecteStatus
        }
        console.log(PaymentData)
        const response = await sellerAPI.order.updateOrder(orderId, PaymentData);

        if(response.statusCode === 200){
            alert("Thanh toán thành công");
            router.push('/store/sale');
            return
        }

        alert("Thanh toán thất bại")
    } catch (error) {
        console.log("Failed to payment by cash: "+error.message);
    }
  };

  const printerOrder = async () => {
    setLoading(true);
    try {
      const invoice = await sellerAPI.invoice.printOrderOffline(orderId);
    } catch (error) {
      
    }finally {
      setLoading(false);
    }
  }

  if(isPayment) return <PaymentSuccess/>;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Trang thanh toán</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="cash" className="flex items-center justify-center">
                  <Banknote className="w-4 h-4 mr-2" />
                  Tiền mặt
                </TabsTrigger>
                <TabsTrigger value="qr" className="flex items-center justify-center">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </TabsTrigger>
              </TabsList>
              <TabsContent value="cash" className="mt-4">
                <p className="text-center text-gray-600">Vui lòng chuẩn bị số tiền chính xác để thanh toán bằng tiền mặt</p>
              </TabsContent>
              
              <TabsContent value="qr" className="mt-4">
                 <div className="flex justify-center">
                  <QrCodeCard 
                    accountName={qrData.accountName} 
                    accountNumber={qrData.accountNo}
                    qrCode={qrCode && qrCode.qrDataURL ? qrCode.qrDataURL : ''}
                  />
                </div> 
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="w-full lg:w-1/2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Hóa đơn</CardTitle>
                  <button
                    onClick={printerOrder}
                    className="flex items-center px-3 py-2 text-sm font-medium bg-orange-500 text-white rounded-lg hover:bg-orange-300"
                  >
                    <PrinterCheck />
                    In hóa đơn
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Khách hàng</span>
                    <span>{order.customerName || 'khong co du lieu'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Số điện thoại</span>
                    <span>{order.customerPhone || 'Khong co du lieu'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email</span>
                    <span>{order.customerEmail || 'Khong co du lieu'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Địa chỉ</span>
                    <span>{order.customerAddress || 'Khong co du lieu'}</span>
                  </div>
                </div>
                <ul className="space-y-2 border-t mt-4">
                  <li className="flex justify-between font-bold">
                    <span>Tên sản phẩm</span>
                    <span>Số lượng</span>
                    <span>Giá</span>
                    <span>Tổng giá</span>
                  </li>
                  {order.orderDetails ? (
                    order.orderDetails.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>(x{item.quantity})</span>
                        <span>{formatVND(item.price)}</span>
                        <span>{formatVND(item.quantity * item.price)}</span>
                      </li>
                    ))
                  ) : null}
                </ul>
              </CardContent>
              <CardFooter>
                <div className="w-full flex justify-between items-center">
                  <span className="text-lg font-semibold">Tổng cộng</span>
                  <span className="text-2xl font-bold">{formatVND(paymentAmount)}</span>
                </div>
              </CardFooter>
            </Card>

          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={paymentByCash}
            disabled={selectedMethod !== 'cash' ? true : false  }
          >
            Thanh toán
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}