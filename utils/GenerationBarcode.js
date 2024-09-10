const generateBarcode = {

    generateEAN8() {
        let barcode = '';
        for (let i = 0; i < 7; i++) {
            barcode += Math.floor(Math.random() * 10);
        }

        let sum = 0;
        for (let i = 0; i < 7; i++) {
            let num = parseInt(barcode[i]);
            sum += i % 2 === 0 ? num * 3 : num;
        }

        const checkDigit = (10 - (sum % 10)) % 10;
        return barcode + checkDigit;
    },

    generateUPC() {

        let barcode = '';
        for (let i = 0; i < 11; i++) {
            barcode += Math.floor(Math.random() * 10);
        }

        let sum = 0;
        for (let i = 0; i < 11; i++) {
            let num = parseInt(barcode[i]);
            sum += i % 2 === 0 ? num : num * 3;
        }

        const checkDigit = (10 - (sum % 10)) % 10;
        return barcode + checkDigit;
    },
    
    generateEAN13() {
        let barcode = '';
        for (let i = 0; i < 12; i++) {
            barcode += Math.floor(Math.random() * 10);
        }

        let sum = 0;
        for (let i = 0; i < 12; i++) {
            let num = parseInt(barcode[i]);
            sum += i % 2 === 0 ? num : num * 3;
        }

        const checkDigit = (10 - (sum % 10)) % 10;
        return barcode + checkDigit;
    },

    generateISBN10() {
        let barcode = '';
        for (let i = 0; i < 9; i++) {
            barcode += Math.floor(Math.random() * 10);
        }

        let sum = 0;
        for (let i = 0; i < 9; i++) {
            let num = parseInt(barcode[i]);
            sum += num * (10 - i);
        }

        let checkDigit = (11 - (sum % 11)) % 11;
        checkDigit = checkDigit === 10 ? 'X' : checkDigit;

        return barcode + checkDigit;
    },

    generateISBN13() {
        let barcode = '';
        for (let i = 0; i < 12; i++) {
            barcode += Math.floor(Math.random() * 10);
        }

        let sum = 0;
        for (let i = 0; i < 12; i++) {
            let num = parseInt(barcode[i]);
            sum += i % 2 === 0 ? num : num * 3;
        }

        const checkDigit = (10 - (sum % 10)) % 10;
        return barcode + checkDigit;
    }



};

export default generateBarcode;