import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client.js';
import { Link } from 'react-router-dom';


const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyZipCode, setCompanyZipCode] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');
    const [companyCity, setCompanyCity] = useState('');

    // const history = useHistory();

    const fetchCustomers = async () => {
        try {
            const response = await axiosClient.get('/customers');
            console.log(response.data.data);
            setCustomers(response.data.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAddCustomer = async () => {
        try {
            const response = await axiosClient.post('/customers', {
                name,
                companyName,
                companyAddress,
                companyZipCode,
                companyCountry,
                companyCity,
            });
            setName('');
            setCompanyName('');
            setCompanyAddress('');
            setCompanyZipCode('');
            setCompanyCountry('');
            setCompanyCity('');
            fetchCustomers();
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const handleDeleteCustomer = async (customerId) => {
        try {
            await axiosClient.delete(`/customers/${customerId}`);
            fetchCustomers();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };


    const handleInvoiceCreation = (customer) => {
        // Redirect to the Invoice component and pass customer details as state
        history.push('/invoices', { customer });
    };

    return (
        <div className="invoice-container">
            <h1>Customers</h1>
            <div>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                <input type="text" placeholder="Company Address" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
                <input type="text" placeholder="Company Zip Code" value={companyZipCode} onChange={(e) => setCompanyZipCode(e.target.value)} />
                <input type="text" placeholder="Company Country" value={companyCountry} onChange={(e) => setCompanyCountry(e.target.value)} />
                <input type="text" placeholder="Company City" value={companyCity} onChange={(e) => setCompanyCity(e.target.value)} />
                <button onClick={handleAddCustomer}>Add Customer</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Creation Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 ? (
                        <tr>
                            <td colSpan="4">No record found</td>
                        </tr>
                    ) : (
                        customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.id}</td>
                                <td>{customer.name}</td>
                                <td>{customer.created_at}</td>
                                <td>
                                    <Link to={'/customers/' + customer.id}>Edit</Link>
                                    <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                                    <button onClick={() => handleInvoiceCreation(customer.id)}>Create Invoice</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
