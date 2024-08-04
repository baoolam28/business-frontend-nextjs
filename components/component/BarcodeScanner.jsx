"use client"; 
import { useEffect, useRef, useState } from 'react';
import Quagga from 'quagga';

// Hàm xác thực mã EAN-13
const validateEAN13 = (code) => {
  // Kiểm tra độ dài mã vạch
  if (code.length !== 13) return false;

  // Kiểm tra xem tất cả ký tự đều là số
  if (!/^\d{13}$/.test(code)) return false;

  // Tính toán kiểm tra modulo 10
  const checkDigit = parseInt(code[12], 10);
  let sum = 0;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(code[i], 10) * (i % 2 === 0 ? 1 : 3);
  }

  const calculatedCheckDigit = (10 - (sum % 10)) % 10;

  return checkDigit === calculatedCheckDigit;
};

const BarcodeScanner = () => {
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const [barcode, setBarcode] = useState(null);

  useEffect(() => {
    // Khởi tạo QuaggaJS
    Quagga.init({
      inputStream: {
        type: 'LiveStream',
        target: scannerRef.current, // Camera stream sẽ được hiển thị ở đây
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment' // Sử dụng camera sau
        }
      },
      decoder: {
        readers: ['code_128_reader', 'ean_reader', 'ean_8_reader', 'code_39_reader'] // Định dạng mã vạch hỗ trợ
      }
    }, (err) => {
      if (err) {
        setError('Error initializing QuaggaJS: ' + err.message);
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      const code = data.codeResult.code;
      if (validateEAN13(code)) {
        setBarcode(code);
        alert(`Barcode detected and validated: ${code}`);
        // Quagga.stop();
      } else {
        setError('Invalid EAN-13 barcode detected.');
      }
    });

    Quagga.onProcessed((result) => {
      if (result && result.codeResult) {
        console.log(result.codeResult.code);
      }
    });

    // Cleanup
    return () => {
      Quagga.offDetected();
      Quagga.offProcessed();
      Quagga.stop();
    };
  }, []);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {barcode && <p>Scanned Barcode: {barcode}</p>}
      <div ref={scannerRef} style={{ width: '640px', height: '480px' }} />
    </div>
  );
};

export default BarcodeScanner;
