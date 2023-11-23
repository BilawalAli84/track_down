import React, { useState } from 'react';
import './InvoiceForm.css'; // Import your CSS file for styling
import {useStateContext} from "../context/ContextProvider.jsx";
function InvoiceForm() {
  const [invoiceData, setInvoiceData] = useState({
    image: '',
    heading: 'Invoice',
    companyName: '',
    yourName: '',
    companyAddress: '',
    cityStateZip: '',
    clientCompanyName: '',
    clientAddress: '',
    clientCityStateZip: '',
    country: '',
    invoiceNumber: '',
    invoiceDate: '',
    lineItems: [
      { description: '', quantity: 0, unitPrice: 0 },
    ],
    notes: '',
    termsAndConditions: '',
  });

  const addLineItem = () => {
    setInvoiceData({
      ...invoiceData,
      lineItems: [...invoiceData.lineItems, { description: '', quantity: 0, unitPrice: 0 }],
    });
  };

  const handleLineItemChange = (index, field, value) => {
    const updatedLineItems = [...invoiceData.lineItems];
    updatedLineItems[index][field] = value;
    setInvoiceData({
      ...invoiceData,
      lineItems: updatedLineItems,
    });
  };

  const removeLineItem = (index) => {
    const updatedLineItems = [...invoiceData.lineItems];
    updatedLineItems.splice(index, 1);
    setInvoiceData({
      ...invoiceData,
      lineItems: updatedLineItems,
    });
  };

  const calculateTotal = () => {
    return invoiceData.lineItems.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h1>{invoiceData.heading}</h1>
        <img src={invoiceData.image} alt="Invoice Logo" />
      </div>
      <div className="invoice-section">
        <div className="invoice-section-left">
          <div className="invoice-address">
            <input  value={invoiceData.companyName}/>
            <p>Your Name: {invoiceData.yourName}</p>
            <p>Company Address: {invoiceData.companyAddress}</p>
            <p>City, State Zip: {invoiceData.cityStateZip}</p>
          </div>
          <div className="invoice-address">
            <p>Client Company Name: {invoiceData.clientCompanyName}</p>
            <p>Client Address: {invoiceData.clientAddress}</p>
            <p>City, State Zip: {invoiceData.clientCityStateZip}</p>
            <p>Country: {invoiceData.country}</p>
          </div>
        </div>
        <div className="invoice-section-right">
          <p>Invoice Number: {invoiceData.invoiceNumber}</p>
          <p>Invoice Date: {invoiceData.invoiceDate}</p>
        </div>
      </div>
      <div className="invoice-line-items">
        <h2>Line Items</h2>
        {invoiceData.lineItems.map((item, index) => (
          <div key={index} className="line-item">
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleLineItemChange(index, 'description', e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleLineItemChange(index, 'quantity', parseInt(e.target.value))}
            />
            <input
              type="number"
              placeholder="Unit Price"
              value={item.unitPrice}
              onChange={(e) => handleLineItemChange(index, 'unitPrice', parseFloat(e.target.value))}
            />
            <button onClick={() => removeLineItem(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addLineItem}>Add Line Item</button>
        <div className="invoice-total">
          <p>Total: {calculateTotal()}</p>
        </div>
      </div>
      <div className="invoice-notes">
        <h2>Notes</h2>
        <textarea
          placeholder="Notes"
          value={invoiceData.notes}
          onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
        />
      </div>
      <div className="invoice-terms">
        <h2>Terms and Conditions</h2>
        <textarea
          placeholder="Terms and Conditions"
          value={invoiceData.termsAndConditions}
          onChange={(e) => setInvoiceData({ ...invoiceData, termsAndConditions: e.target.value })}
        />
      </div>
    </div>
  );
}

export default InvoiceForm;
