import React, { useState, useEffect } from 'react';
// import axiosClient from 'app/axios-client/axios-client.js';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, Grid, Icon, Radio, RadioGroup, styled, Box } from "@mui/material";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const SimpleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyZipCode, setCompanyZipCode] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (id) {
  //     setLoading(false);
  //     // axiosClient.get(`/customers/${id}`)
  //     //   .then(({ data }) => {
  //     //     setLoading(false);
  //     //     setName(data.data.name);
  //     //     setCompanyName(data.data.company_name);
  //     //     setCompanyAddress(data.data.company_address);
  //     //     setCompanyZipCode(data.data.company_zipcode);
  //     //     setCompanyCountry(data.data.company_country);
  //     //     setCompanyCity(data.data.company_city);
  //     //   })
  //     //   .catch(() => {
  //     //     setLoading(false);
  //     //   });
  //   }
  // }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      const customer = {
        name,
        companyName,
        companyZipCode,
        companyAddress,
        companyCountry,
        companyCity,
      };
      // axiosClient.put(`/customers/${id}`, customer)
      //   .then(() => {
      //     // Handle success
      //     navigate('/customers');
      //   })
      //   .catch(err => {
      //     const response = err.response;
      //     if (response && response.status === 422) {
      //       setErrors(response.data.errors);
      //     }
      //   });
    }
  };

  return (
    <>
      <div >
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <Grid container spacing={12} justifyContent="center" alignItems="center">

              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Full Name"
                />

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
                <TextField
                  type="text"
                  name="companyZipCode"
                  value={companyZipCode}
                  onChange={(e) => setCompanyZipCode(e.target.value)}
                  label="Company Zip Code"
                />
                


                <Button color="primary" variant="contained" type="submit">
                  <Icon>add</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Save</Span>
                </Button>
              </Grid>


            </Grid>


          </ValidatorForm>
        )}
      </div>

    </>
  );
};

export default SimpleForm;
