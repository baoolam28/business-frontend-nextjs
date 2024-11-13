'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Eye, Filter, MoreHorizontal, Search } from 'lucide-react'
import { ScrollArea } from "../../components/ui/scroll-area"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Loading from "../../components/component/loading-lottie"
import Animation from "../../utils/lottie-animations/astronot.json"
import SellerAPI from "../../api/seller"
import { useStore } from "../../context/StoreContext"
import FormatAsVND from "../../utils/formatVND"
export default function DocumentDashboard() {
  const { storeId } = useStore();
  const [loading, setLoading] = useState(true)
  const [documents, setDocuments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDocument, setSelectedDocument] = useState(null)

  useEffect(() => {
    if(!storeId) return;

    fetchDocuments(storeId);

  },[storeId])

  const fetchDocuments = async (storeId) => {
    setLoading(true);
    try {
      const response = await SellerAPI.document.getDocumentByStore(storeId);
      if(response.statusCode === 200) {
        setDocuments(response.data);
      }
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false);
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const handlePaymentStatusChange = (docId) => {
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.docId === docId ? { ...doc, paymentStatus: !doc.paymentStatus } : doc
      )
    )
  }

  const filteredDocuments = documents.filter((doc) =>
    [doc.docNumberOne, doc.companyId].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if(loading){
    return <Loading animation={Animation}/>;
  }

  return (
    <div className="container mx-auto py-10 ">
      <h1 className="text-3xl font-bold mb-6">Quản lý chứng từ</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8 w-64"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>
      <div className="mt-6 border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Số chứng từ</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Mã công ty</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái thanh toán</TableHead>
              <TableHead>Chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.docId}>
                <TableCell>{doc.docNumberOne}</TableCell>
                <TableCell>{doc.date ? format(doc.date, 'dd/MM/yyyy') : ''}</TableCell>
                <TableCell>{doc.companyId}</TableCell>
                <TableCell>{FormatAsVND(doc.totalAmount.toFixed(2))}</TableCell>
                <TableCell>
                  <Badge variant={doc.paymentStatus ? "success" : "destructive"}>
                    {doc.paymentStatus ? 'Đã thanh toán' : 'chưa thanh toán'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setSelectedDocument(doc)}>
                        <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handlePaymentStatusChange(doc.docId)}>
                        Toggle Payment Status
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>  
        </Table>
      </div>
      <Dialog open={!!selectedDocument} onOpenChange={(open) => !open && setSelectedDocument(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Chi tiết chứng từ</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết số {selectedDocument?.docNumberOne}
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin chứng từ</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-2 gap-2">
                      <dt className="font-semibold">Số chứng từ:</dt>
                      <dd>{selectedDocument.docNumberOne}</dd>
                      <dt className="font-semibold">Ngày:</dt>
                      <dd>{selectedDocument.date ? format(selectedDocument.date, 'dd/MM/yyyy') : ''}</dd>
                      <dt className="font-semibold">Mã công ty:</dt>
                      <dd>{selectedDocument.companyId}</dd>
                      <dt className="font-semibold">Tổng tiền:</dt>
                      <dd>{FormatAsVND(selectedDocument.totalAmount.toFixed(2))}</dd>
                      <dt className="font-semibold">Đã thanh toán:</dt>
                      <dd>{FormatAsVND(selectedDocument.paidAmount.toFixed(2))}</dd>
                      <dt className="font-semibold">tỷ lệ thanh toán:</dt>
                      <dd>{selectedDocument.paymentPercentage}%</dd>
                      <dt className="font-semibold">Trạng thái thanh toán:</dt>
                      <dd>
                        <Badge variant={selectedDocument.paymentStatus ? "success" : "destructive"}>
                          {selectedDocument.paymentStatus ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </Badge>
                      </dd>
                    </dl>
                  </CardContent>
                </Card>
                <div className="grid grid-row-2 gap-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bên đại diện</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-2">
                        <dt className="font-semibold">Đại diện 1:</dt>
                        <dd>{selectedDocument.representOne}</dd>
                        <dt className="font-semibold">Đại diện 2:</dt>
                        <dd>{selectedDocument.representTwo}</dd>
                      </dl>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Tiếp nhận</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-2">
                        <dt className="font-semibold">Ngày tạo:</dt>
                        <dd>{selectedDocument.createdDate ? format(selectedDocument.createdDate, 'dd/MM/yyyy') : ''}</dd>
                        <dt className="font-semibold">người tạo:</dt>
                        <dd>{selectedDocument.createdBy}</dd>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
                
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Chi tiết chứng từ</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-full">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Barcode</TableHead>
                          <TableHead>Tên sản phẩm</TableHead>
                          <TableHead>Số lượng</TableHead>
                          <TableHead>Giá</TableHead>
                          <TableHead>Tổng</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedDocument.documentDetails.map((detail) => (
                          <TableRow key={detail.docDetailId}>
                            <TableCell>{detail.productBarcode}</TableCell>
                            <TableCell>{detail.productName}</TableCell>
                            <TableCell>{detail.quantity}</TableCell>
                            <TableCell>{FormatAsVND(detail.price.toFixed(2))}</TableCell>
                            <TableCell>{FormatAsVND(detail.totalPrice.toFixed(2))}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
