/*import React, { useState } from 'react';
import axiosClient from 'axios'; // Import your axios client

const Settings = () => {
  const [image, setImage] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [cityZipCode, setCityZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare data to send to the server
    const data = {
      image, // Base64-encoded image
      companyName,
      companyAddress,
      cityZipCode,
      country,
    };
    console.log(data);
    // Send data to the server using axiosClient
    axiosClient
      .post('/api/settings', data) // Adjust the URL as needed
      .then((response) => {
        // Handle success
        console.log('Data saved successfully:', response.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error while saving data:', error);
      });
  };

  return (
    <div className="invoice-container">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {image && <img src={image} alt="Preview" width="200" />}
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label>Company Address:</label>
          <input
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
        </div>
        <div>
          <label>City/Zip Code:</label>
          <input
            type="text"
            value={cityZipCode}
            onChange={(e) => setCityZipCode(e.target.value)}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Settings;*/
import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client.js';

const Settings = () => {
  const [userSettings, setUserSettings] = useState(null);
  const [image, setImage] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [cityZipCode, setCityZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [userId, setUserId] = useState('');
  const [id, setId] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  function getResults() {
    axiosClient.get('/settings') // Adjust the URL as needed
      .then(({ data }) => {

        setUserSettings(data);

        setCityZipCode(data.city_zip_code)
        setImage(data.image)
        setCompanyName(data.company_name)
        setCompanyAddress(data.company_address)
        setCityZipCode(data.city_zip_code)
        setCountry(data.country)
        setUserId(data.user_id)
        setId(data.id)
        // console.log("Response data", userSettings);
        // setUserSettings(response);
      })
      .catch((error) => {
        // Handle error
        console.error('Error while fetching user settings:', error);
      });
  }

  useEffect(() => {
    // Fetch user settings if they exist
    axiosClient.get('/settings') // Adjust the URL as needed
      .then(({ data }) => {

        setUserSettings(data);

        setCityZipCode(data.city_zip_code);
        setImage(data.image);
        setCompanyName(data.company_name);
        setCompanyAddress(data.company_address);
        setCityZipCode(data.city_zip_code);
        setCountry(data.country);
        setUserId(data.user_id);
        setId(data.id);
        // console.log("Response data", userSettings);
        // setUserSettings(response);
      })
      .catch((error) => {
        // Handle error
        console.error('Error while fetching user settings:', error);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      image,
      companyName,
      companyAddress,
      cityZipCode,
      country,
      id
    };
    console.log("Response data", userSettings);

    if (userSettings) {

      console.log('user settings set');
      // If user settings exist, update them
      axiosClient
        .put(`/settings/${id}`, data) // Use the appropriate endpoint for updating
        .then((response) => {
          console.log('User settings updated successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error while updating user settings:', error);
        });
    } else {
      // If user settings don't exist, create new settings
      console.log('not user settings set');
      axiosClient
        .post('/settings', data) // Use the appropriate endpoint for creating
        .then((response) => {
          setUserSettings(response.data);
          console.log('User settings created successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error while creating user settings:', error);
        });
    }
  };

  return (
    <div className="invoice-container">
      <h1>User Settings</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {image && <img src={image} alt="Preview" width="200" />}
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label>Company Address:</label>
          <input
            type="text"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          />
        </div>
        <div>
          <label>City/Zip Code:</label>
          <input
            type="text"
            value={cityZipCode}
            onChange={(e) => setCityZipCode(e.target.value)}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <button type="submit">{userSettings ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default Settings;
