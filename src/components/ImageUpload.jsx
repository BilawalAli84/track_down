import React, { useState } from 'react';

const ImageUpload = () => {
    const [imagePreview, setImagePreview] = useState(null);

    // Handle the image file input change
    const handleImageUpload = (event) => {
        const file = event.target.files[0];

        // Check if a file is selected
        if (file) {
            const reader = new FileReader();

            // Read the uploaded image file as a data URL
            reader.readAsDataURL(file);

            // When the file is loaded, set the imagePreview state to the data URL
            reader.onload = () => {
                setImagePreview(reader.result);
            };
        }
    };

    return (
        <div>
            <h2>Image Upload</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}

            // You can add more attributes here, such as multiple, if needed
            />
            {imagePreview && (
                <div>
                    <h3>Thumbnail</h3>
                    <img
                        src={imagePreview}
                        alt="Uploaded Thumbnail"
                        style={{ width: '100px', height: '100px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;