import React, { forwardRef } from 'react';
import BarcodeRender from './BarcodeRender';

const BarcodePagePrinter = forwardRef(({ contentPrinter }, ref) => {

  // Function to render barcodes according to their quantity
  const renderBarcodeByQuantity = (content) => {
    // Create an array with the quantity and map over it to generate barcodes
    return Array.from({ length: content.quantity }, (_, index) => (
      <div
        key={`${content.barcode}-${index}`}  // Unique key for each barcode
        className="border border-gray-300 p-2 rounded-lg bg-gray-50 shadow-sm"
        style={{ width: '2in', height: '1.22in' }}
      >
        <p className="text-xs text-center font-semibold">{content.productName}</p>
        <BarcodeRender value={content.barcode} width={1.1} height={50} />
      </div>
    ));
  };

  // Flatten all barcodes, limit to 32 items, and render them
  const allBarcodes = contentPrinter.flatMap(content => renderBarcodeByQuantity(content));


  return (
    <div className="bg-gray-100 min-h-screen">
      <div ref={ref} className="max-w-screen-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-4 gap-2">
          {allBarcodes}
        </div>
      </div>
    </div>
  );
});

export default BarcodePagePrinter;
