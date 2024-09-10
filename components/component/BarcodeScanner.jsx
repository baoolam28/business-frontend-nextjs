"use client";

import { useState, useEffect } from 'react';
import validateBarcode from '../../utils/CheckDigit';

const BarcodeScanner = ({ onValidBarcode, onInvalidBarcode }) => {
  const [barcode, setBarcode] = useState('');
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }

      if (event.key === 'Enter') {
        if (barcode) {
          const valid = validateBarcode(barcode);
          if (valid) {
            onValidBarcode(barcode);
          } else {
            onInvalidBarcode(barcode);
          }
          setBarcode('');
        }
        return;
      }

      if (event.key !== 'Shift') {
        setBarcode(prevBarcode => prevBarcode + event.key);
      }

      const newIntervalId = setInterval(() => {
        setBarcode('');
        clearInterval(newIntervalId);
        setIntervalId(null);
      }, 300);

      setIntervalId(newIntervalId);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [barcode, intervalId, onValidBarcode, onInvalidBarcode]);

  return null;
};

export default BarcodeScanner;
