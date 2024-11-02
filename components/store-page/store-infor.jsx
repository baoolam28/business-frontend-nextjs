import { MapPin, Phone, FileText, Tag, CreditCard, User, Mail } from "lucide-react"
import Image from "next/image"


export default function StoreInfo( {storeInfo}) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-purple-600 to-pink-500 p-1 rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-white rounded-3xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
              <Image
                src={storeInfo ? storeInfo.logoUrl : null}
                alt={`${storeInfo.storeName} logo`}
                width={128}
                height={128}
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-0 h-0 border-solid border-white border-b-[100px] border-r-[100px] border-r-transparent"></div>
          <div className="absolute bottom-0 right-0 w-0 h-0 border-solid border-white border-b-[100px] border-l-[100px] border-l-transparent"></div>
        </div>
        <div className="px-6 py-8">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">{storeInfo.name ? storeInfo.name : '' }</h1>
          <div className="grid gap-4 text-gray-600">
            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
              <User className="w-5 h-5 text-orange-500" />
              <p>Owner: {storeInfo.managerName ? storeInfo.managerName : ''}</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
              <Mail className="w-5 h-5 text-teal-500" />
              <p>Email: {storeInfo.storeEmail ? storeInfo.storeEmail : ''}</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
              <MapPin className="w-5 h-5 text-red-500" />
              <p>{storeInfo.storeLocation ? storeInfo.storeLocation : ''}</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
              <Phone className="w-5 h-5 text-green-500" />
              <p>{storeInfo.storeTaxCode ? storeInfo.storeTaxCode : ''}</p>
            </div>
            <div className="flex items-start gap-3 bg-gray-100 p-3 rounded-lg">
              <FileText className="w-5 h-5 text-blue-500 mt-1" />
              <p>{storeInfo.storeDescription ? storeInfo.storeDescription : ''}</p>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-lg">
              <CreditCard className="w-5 h-5 text-indigo-500" />
              <p>Bank Account: {storeInfo.storeBankAccount ? storeInfo.storeBankAccount : ''}</p>
            </div>
          </div>
        </div>
        <div className="h-16 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 relative">
          <div className="absolute top-0 left-0 w-0 h-0 border-solid border-white border-t-[50px] border-r-[50px] border-r-transparent"></div>
          <div className="absolute top-0 right-0 w-0 h-0 border-solid border-white border-t-[50px] border-l-[50px] border-l-transparent"></div>
        </div>
      </div>
    </div>
  )
}