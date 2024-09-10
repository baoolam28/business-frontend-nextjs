import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import BarcodePagePrinter from './BarcodePagePrinter';

const PrintButton = ({ contentPrinter }) => {
  // Create a ref to the BarcodePagePrinter component
  const componentRef = useRef();

  return (
    <div>
      {/* Render the BarcodePagePrinter component and attach the ref */}
      <div style={{ display: 'none' }}>
        <BarcodePagePrinter ref={componentRef} contentPrinter={contentPrinter} />
      </div>
      
      {/* Button to trigger printing */}
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-primary">
            Print <PrinterIcon className="h-5 w-5" />
          </button>
        )}
        content={() => componentRef.current}
      />
    </div>
  );
};

function PrinterIcon(props) {
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
      strokeLinejoin="round">
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  );
}

export default PrintButton;