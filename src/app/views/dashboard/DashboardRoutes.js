import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';
import Reporting from 'app/views/dashboard/Reporting';
import Tracking from 'app/views/dashboard/Tracking';
import Domain from 'app/views/dashboard/Domain';
import Conversion from 'app/views/dashboard/Conversion';
import UrlRules from 'app/views/dashboard/UrlRules';
const AppCustomers = Loadable(lazy(() => import('./customers/customerForm/AppForm')));
const AppCustomersAdd = Loadable(lazy(() => import('./customers/customerForm/addNewForm/AddNewCustomerForm')));
const AppCustomerTable = Loadable(lazy(() => import('./customers/customerTable/AppTable')));
const AppInvoices = Loadable(lazy(() => import('./invoices/invoicesTable/AppTable')));
const AppInvoicesAdd = Loadable(lazy(() => import('./invoices/invoicesForm/AddInvoiceForm')));
const AppInvoicesUpdate = Loadable(lazy(() => import('./invoices/invoicesForm/AddInvoiceForm')));
const AppSettings = Loadable(lazy(() => import('./settings/AppForm')));

const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
  { path: '/dashboard', element: <Analytics />, auth: authRoles.guest },
  {
    path: '/reporting',
    element: <Reporting />
  },
  {
    path: '/tracking',
    element: <Tracking />
  },
  {
    path: '/domain',
    element: <Domain />
  },
  {
    path: '/conversion',
    element: <Conversion />
  },
  {
    path: '/url_rules',
    element: <UrlRules />
  },
  {
    path: '/customers/update/:id',
    element: <AppCustomers />,
  },
  {
    path: '/customers',
    element: <AppCustomerTable />,
  },
  {
    path: '/customers/add',
    element: <AppCustomersAdd />,
  },
  {
    path: '/invoices',
    element: <AppInvoices />,
  },
  {
    path: '/invoices/add',
    element: <AppInvoicesAdd />,
  },
  {
    path: '/invoices/update/:id',
    element: <AppInvoicesUpdate />,
  },
  {
    path: '/settings',
    element: <AppSettings />,
  },
];

export default dashboardRoutes;
