import React, { useState, useEffect } from 'react';
import axiosClient from 'axios.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, Grid, Icon, Radio, RadioGroup, styled, Box, Card, CardMedia, CardContent } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const [userSettings, setUserSettings] = useState(null);
  const [image, setImage] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [cityZipCode, setCityZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [userId, setUserId] = useState('');
  const [id, setId] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  function getResults() {
    // axiosClient.get('/settings') // Adjust the URL as needed
    //   .then(({ data }) => {

    //     setUserSettings(data);

    //     setCityZipCode(data.city_zip_code)
    //     setImage(data.image)
    //     setCompanyName(data.company_name)
    //     setCompanyAddress(data.company_address)
    //     setCityZipCode(data.city_zip_code)
    //     setCountry(data.country)
    //     setUserId(data.user_id)
    //     setId(data.id)
    //     // console.log("Response data", userSettings);
    //     // setUserSettings(response);
    //   })
    //   .catch((error) => {
    //     // Handle error
    //     console.error('Error while fetching user settings:', error);
    //   });
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


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       setImage(e.target.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      image,
      companyName,
      companyAddress,
      cityZipCode,
      companyCountry,
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setImagePreview(e.target.result); // Set image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div >

        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
          <Grid container spacing={12} justifyContent="center" alignItems="center">

            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

              <div>
                <label>Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="imageInput"
                />
                <label htmlFor="imageInput">
                  <Button component="span">
                    Upload Image
                  </Button>
                </label>
                {imagePreview && (
                  <Card>
                    <CardMedia
                      component="img"
                      alt="Image Preview"
                      height="140"
                      image={imagePreview}
                    />
                    <CardContent>

                    </CardContent>
                  </Card>
                )}
              </div>
              <Box py="12px" />
              <TextField
                type="text"
                name="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                label="Company Name"
              />

              <TextField
                type="text"
                name="companyAddress"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                label="Company Address"
              />

              <TextField
                type="text"
                name="cityZipCode"
                value={cityZipCode}
                onChange={(e) => setCityZipCode(e.target.value)}
                label="Company Zip Code"
              />
              <TextField
                type="text"
                name="companyCity"
                value={companyCity}
                onChange={(e) => setCompanyCity(e.target.value)}
                label="Company City"
              />
              <TextField
                type="text"
                name="companyCountry"
                value={companyCountry}
                onChange={(e) => setCompanyCountry(e.target.value)}
                label="Company Country"
              />



              <Button color="primary" variant="contained" type="submit">
                <Icon>update</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Update</Span>
              </Button>
            </Grid>


          </Grid>


        </ValidatorForm>

      </div>

    </>
  );
};

export default SimpleForm;
