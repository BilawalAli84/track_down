import { Box, styled, Button, Fab, Icon, IconButton, } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./PaginationTable";
import { Link } from 'react-router-dom';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));



const AppButtonRoot = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .button': { margin: theme.spacing(1) },
  '& .input': { display: 'none' },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));


const AppTable = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Dashboard", path: "/dashboard" }, { name: "Customers" }]} />
      </Box>
      <AppButtonRoot>
        <Box py="12px" />

        <SimpleCard title="different size buttons">
          <Fab size="small" color="secondary" aria-label="Add" className="button">
            <Icon>add</Icon>
          </Fab>
          <Fab size="small" color="primary" aria-label="Add" className="button">
            <Icon>add</Icon>
          </Fab>
          <Fab size="small" color="error" aria-label="Delete" className="button">
            <Icon>remove</Icon>
          </Fab>

          <Link to={'/dashboard'}>
            <StyledButton variant="contained">
              Link
            </StyledButton>
          </Link>
        </SimpleCard>

        <Box py="12px" />

        <SimpleCard title="outlined buttons">


          <Fab color="secondary" aria-label="Edit" className="button">
            <Icon>edit_icon</Icon>
          </Fab>

          <Fab variant="extended" aria-label="Delete" className="button">
            <Icon sx={{ mr: 4 }}>navigation</Icon>
            Extended
          </Fab>

          <Fab disabled aria-label="Delete" className="button">
            <Icon>delete</Icon>
          </Fab>
        </SimpleCard>
      </AppButtonRoot>


      <SimpleCard title="Pagination Table">
        <Link to={'/customers/add'}>
          <StyledButton variant="contained" align="right">
            Add Customer
          </StyledButton>
        </Link>
        <PaginationTable />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
