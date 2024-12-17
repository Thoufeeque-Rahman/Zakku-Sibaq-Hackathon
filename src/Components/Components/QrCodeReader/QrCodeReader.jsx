import React, { useState } from 'react';
import jsQR from 'jsqr';
import './QrCodeReader.css';

const QRCodeImageScanner = ({ setUpiUrl, upiUrl }) => {
  const [qrCodeData, setQrCodeData] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError('No file selected');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        // Create a canvas to process the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the uploaded image on the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Extract image data from the canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Decode the QR code
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          console.log('QR Code Data:', code.data); // Debug log
          setQrCodeData(code.data); // Save the decoded data
          setUpiUrl(code.data); // Use code.data directly
          setError(''); // Clear any previous error
        } else {
          setQrCodeData('');
          setUpiUrl('');
          setError('QR code not found in the image.');
        }
      };

      img.onerror = () => {
        setError('Error loading the image.');
      };
    };

    reader.onerror = () => {
      setError('Error reading the file.');
    };

    reader.readAsDataURL(file); // Read the file as a data URL
  };

  return (
    <div className="form-group gap-1 mb-3 w-100 rounded-4 p-3 text-break text-center text-success" style={{ border: '1px dotted' }}>
      <h1 className='fs-6 mx-auto'>Upload your UPI QR Code Image</h1>
      <input type="file" accept="image/*" style={{ padding: '6px 7px' }} onChange={handleImageUpload} className='form-control mb-3' name="" id="" />
      {error && <p className='text-danger text-center mx-auto'>{error}</p>}
      {qrCodeData && (
        <div className='text-center text-success w-100'>
          {qrCodeData && <p className='mx-auto'>UPI id: {qrCodeData.match(/pa=([^&]*)/)[1]}</p>}
          {/* <a href={qrCodeData} target='_blank'>Pay Now</a> */}
        </div>
      )}
    </div>
  );
};

export default QRCodeImageScanner;