// "use client"
// import { useState, useEffect, useCallback } from 'react'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
// import { Input } from "../../components/ui/input"
// import { Button } from "../../components/ui/button"
// import { Banknote, CreditCard, QrCode } from 'lucide-react'
// import { useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/navigation';
// import orderAPI from '../../api/order'
// import formatVND from "../../utils/formatVND"
// import QrCodeCard from "../../components/component/qrCodeCard"
// import PaymentSuccess from "../../components/component/paymentSuccess"
// // import PaymentAPI from "../../api/payment"

// export default function Component() {
//     const router = useRouter();
//     const [selectedMethod, setSelectedMethod] = useState('cash');
//     const [subtotal, setSubtotal] = useState(0);
//     const searchParams = useSearchParams();
//     const orderId = searchParams.get('orderId');
//     const [isPayment, setIsPayment] = useState(false);
//     const [qrCode, setQrCode] = useState([]);
//     const [qrData, setQrData] = useState({});

//     const [order, setOrder] = useState([]); 

//   useEffect(() => {
//     const fetchOrder = async () =>{
//       try {
//         const invoice = await orderAPI.getOrder(orderId);
//         console.log(invoice);

//         if(invoice && invoice.paymentStatus){
//             setIsPayment(true);
//             return;
//         }

        
//         setOrder(invoice);
//         generateDataFromInvoice(invoice);
        
//       } catch (error) {
//         console.error("fetch order failed", error);
//       }
//     }
    
//     fetchOrder();
//   },[]);

//   useEffect(() => {
//       console.log(selectedMethod)
//       if(!isPayment && selectedMethod === 'qr'){
//         GenerateQrCode();
//       }

//   },[selectedMethod]);

//   const GenerateQrCode = useCallback(
//     async () => {
//       try {
//         const qrCode = await PaymentAPI.generateQrCode(qrData);
//         setQrCode(qrCode.data);
//         console.log("QR Code: " + qrCode.data)
//       } catch (error) {
//         console.error("Failed to generate QR code: " + error.message);
//       }
//     },
//     [order] // Recreate only when order changes
//   );

//   const GeneratePaymentData = (amount, addInfo) => {
//     const paymentData = {
//       accountNo: process.env.NEXT_PUBLIC_ACCOUNT_NO,
//       accountName: process.env.NEXT_PUBLIC_ACCOUNT_NAME,
//       acqId: process.env.NEXT_PUBLIC_ACQ_ID,
//       amount: amount,
//       addInfo: addInfo,
//       format: "text",
//       template: process.env.NEXT_PUBLIC_TEMPLATE
//     };

//     return paymentData; // Chuyển đối tượng thành chuỗi JSON
//   };


//   const generateDataFromInvoice = (invoice) => {
//       const amount = invoice.orderDetails.reduce((acc, item) => acc + (item.quantity * item.price), 0);
//       const addInfo = `HD: ${invoice.orderId} - tổng: ${amount}`;
//       const paymentData = GeneratePaymentData(amount, addInfo);
//       setSubtotal(amount);
//       setQrData(paymentData);
//       console.log("paymentData: " + paymentData);
//   };



//   const tax = 0
//   const total = subtotal + tax

//   const paymentByCash = async () => {
//     try {
//         const PaymentData = {
//             orderId: orderId,
//             paymentMethod: selectedMethod,
//         }
//         console.log(PaymentData)
//         const response = await orderAPI.paymentByCash(PaymentData);

//         if(response.paymentStatus){
//             alert("Thanh toán thành công");
//             router.push('/dashboard/sale');
//             return 
//         }

//         alert("Thanh toán thất bại")
//     } catch (error) {
//         console.log("Failed to payment by cash: "+error.message);
//     }
//   };

//   if(isPayment) return <PaymentSuccess/>;

//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
//       <Card className="w-full ">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Payment Dashboard</CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col lg:flex-row gap-6">
//           <div className="w-full lg:w-1/2">
//             <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="cash" className="flex items-center justify-center">
//                   <Banknote className="w-4 h-4 mr-2" />
//                   Cash
//                 </TabsTrigger>
//                 <TabsTrigger value="qr" className="flex items-center justify-center">
//                   <QrCode className="w-4 h-4 mr-2" />
//                   QR Code
//                 </TabsTrigger>
//               </TabsList>
//               <TabsContent value="cash" className="mt-4">
//                 <p className="text-center text-gray-600">Please prepare the exact amount for cash payment.</p>
//               </TabsContent>
              
//               <TabsContent value="qr" className="mt-4">
//                 <div className="flex justify-center">
//                   <QrCodeCard 
//                     accountName={qrData.accountName} 
//                     accountNumber={qrData.accountNo}
//                     qrCode={qrCode.qrDataURL}
//                   />
//                 </div>
                
//               </TabsContent>
//             </Tabs>
//           </div>
          
//           <div className="w-full lg:w-1/2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Invoice Summary</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                     <div className="flex justify-between">
//                         <span>customer</span>
//                         <span>{order.customer ? order.customer.name : ''}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>phone</span>
//                         <span>{order.customer ? order.customer.phone : ''}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>email</span>
//                         <span>{order.customer ? order.customer.email : ''}</span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span>address</span>
//                         <span>{order.customer ? order.customer.address : ''}</span>
//                     </div>
//                 </div>
//                 <ul className="space-y-2 border-t mt-4">
//                   {order.orderDetails ? order.orderDetails.map((item, index) => (
//                     <li key={index} className="flex justify-between">
//                       <span>{item.productName} (x{item.quantity})</span>
//                       <span>{formatVND((item.quantity * item.price))}</span>
//                     </li>
//                   )) : null}
//                 </ul>
//                 <div className="mt-4 pt-4 border-t">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Tax (0%)</span>
//                     <span>{formatVND(tax)}</span>
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <div className="w-full flex justify-between items-center">
//                   <span className="text-lg font-semibold">Total</span>
//                   <span className="text-2xl font-bold">{total.toFixed(2)}</span>
//                 </div>
//               </CardFooter>
//             </Card>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button
//             className="w-full"
//             onClick={paymentByCash}
//             disabled={selectedMethod !== 'cash' ? true : false  }
//           >
//             Pay Now
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }