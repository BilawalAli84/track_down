import React from 'react';

const ImageDisplay = ({ base64Image }) => {
  // Create a data URL from the base64 image data
//   const imageUrl = `data:image/png;base64,${base64Image}`; // Adjust the MIME type as needed
  const imageUrl = base64Image; // Adjust the MIME type as needed

  return (
    <div>
      <h2>Image Display</h2>
      <img src={imageUrl} alt="Base64 Image" />
    </div>
  );
};

export default ImageDisplay