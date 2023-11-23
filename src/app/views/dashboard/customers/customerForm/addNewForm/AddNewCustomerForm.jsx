import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleForm from "./SimpleForm";
// import StepperForm from "./StepperForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AddNewCustomerForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Customers", path: "/customers" }]} />
      </Box>

      <Stack >
        <SimpleCard title="Add Customer"  sx={{ display: "flex", justifyContent: "center" }} >
          <SimpleForm />
        </SimpleCard>

        
      </Stack>
    </Container>
  );
};

export default AddNewCustomerForm;
