export default function Component({ accountName, accountNumber, qrCode }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="from-primary to-secondary p-3 text-center">
          <h2 className="text-2xl font-bold text-white">QR Code for Payment</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <div className="bg-gray-200 rounded-lg">
              <img 
                className="object-cover w-48 h-48" 
                src={qrCode} 
                alt="QR Code" 
              />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-gray-700">
              <span className="font-semibold">{accountName}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">STK:</span> {accountNumber}
            </p>
          </div>
          <div className="text-center text-sm text-gray-500 flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Scan to complete your payment securely</span>
          </div>
        </div>
      </div>
    </div>
  );
}