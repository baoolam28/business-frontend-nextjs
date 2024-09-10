import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeRender = ({ value, width = 2, height = 80 }) => {
    const barcodeRef = useRef();

    useEffect(() => {
        if (barcodeRef.current) {
            const barcodeValue = value && /^[0-9]{13}$/.test(value) ? value : '0000000000000';
            JsBarcode(barcodeRef.current, barcodeValue, {
                format: 'EAN13',
                displayValue: true,
                width: width,  // Customize the width here
                height: height, // Customize the height here
            });
        }
    }, [value, width, height]);

    return (
        <svg ref={barcodeRef} />
    );
}

export default BarcodeRender;
