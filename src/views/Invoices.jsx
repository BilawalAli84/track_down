import React, { useState, } from 'react';
import axiosClient from '../axios-client';
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import ImageDisplay from '../components/ImageDisplay';
import ImageUpload from '../components/ImageUpload';

function Invoices() {
    // const [image, setImage] = useState(null);
    const [image, setImageBase64] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState('');
    const [generatedBy, setGeneratedBy] = useState('');
    const [sentTo, setSentTo] = useState('');
    const [lineItems, setLineItems] = useState([
        { description: '', amount: 0 },
    ]);
    const navigate = useNavigate();
    let { id } = useParams();
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/customers/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setCustomer(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const addLineItem = () => {
        setLineItems([...lineItems, { description: '', amount: 0 }]);
    };

    const handleLineItemChange = (index, field, value) => {
        const updatedLineItems = [...lineItems];
        updatedLineItems[index][field] = value;
        setLineItems(updatedLineItems);
    };

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

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                setImageBase64(base64String); // Store the Base64 string in a state variable
            };
            reader.readAsDataURL(file); // Read the file as Data URL
        }


    };
    const removeLineItem = (index) => {
        const updatedLineItems = [...lineItems];
        updatedLineItems.splice(index, 1);
        setLineItems(updatedLineItems);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                setImageBase64(base64String); // Store the Base64 string in a state variable
            };
            reader.readAsDataURL(file); // Read the file as Data URL
        }
    };
    const generateInvoice = () => {
        // Logic to generate and save the invoice data
        // You can send this data to the server or process it as needed

        const invoiceData = {
            image,
            date,
            generatedBy,
            sentTo,
            lineItems,
        };

        console.log(invoiceData);
        axiosClient.post('/invoices', invoiceData, {
            responseType: 'blob', // Indicate that the response is binary data (a Blob)
        })
            .then((response) => {
                // Create a Blob from the response data
                const blob = new Blob([response.data], { type: 'application/pdf' });

                // Create a URL for the Blob
                const url = window.URL.createObjectURL(blob);

                // Create a link to trigger the download
                const link = document.createElement('a');
                link.href = url;
                link.download = 'invoice.pdf';

                // Trigger the download by clicking the link
                link.click();

                // Release the Blob URL
                window.URL.revokeObjectURL(url);
                setNotification('User was successfully updated')
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            });
        console.log('Generated Invoice Data:', invoiceData);
    };


    return (
        <div className="invoice-container">
            <h1>Invoice Generator</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}

            // You can add more attributes here, such as multiple, if needed
            />
            {image && <img src={image} alt="Preview" width="200" />}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input
                type="text"
                placeholder="Generated By"
                value={generatedBy}
                onChange={(e) => setGeneratedBy(e.target.value)}
            />
            <input
                type="text"
                placeholder="Invoice Sent To"
                value={sentTo}
                onChange={(e) => setSentTo(e.target.value)}
            />
           
            <h2>Line Items</h2>
            {lineItems.map((item, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => handleLineItemChange(index, 'amount', parseFloat(e.target.value))}
                    />
                    <button onClick={() => removeLineItem(index)}>Remove</button>
                </div>
            ))}
            <button onClick={addLineItem}>Add Line Item</button>

            <button onClick={generateInvoice}>Generate Invoice</button>

        </div>

    );
}

export default Invoices;