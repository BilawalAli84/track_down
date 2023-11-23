import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function CustomerForm() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyZipCode, setCompanyZipCode] = useState('');
    const [companyCountry, setCompanyCountry] = useState('');
    const [companyCity, setCompanyCity] = useState('');

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const { setNotification } = useStateContext()

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/customers/${id}`)
                .then(({ data }) => {

                    setLoading(false);
                    setName(data.data.name);
                    setCompanyName(data.data.company_name);
                    setCompanyAddress(data.data.company_address);
                    setCompanyZipCode(data.data.company_zipcode);
                    setCompanyCountry(data.data.company_country);
                    setCompanyCity(data.data.company_city);

                    // setCustomer(data)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, [])
    }

    const onSubmit = ev => {
        ev.preventDefault()
        if (id) {
            const customer = {
                name,
                companyName,
                companyZipCode,
                companyAddress,
                companyCountry,
                companyCity,
            };
            axiosClient.put(`/customers/${id}`, customer)
                .then(() => {
                    setNotification('Customer was successfully updated')
                    navigate('/customers')
                })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors)
                    }
                })
        }
    }

    return (
        <>
            {id && <h1>Update Customer: {name}</h1>}

            <div className="card animated fadeInDown invoice-container">
                {loading && (
                    <div className="text-center">
                        Loading...
                    </div>
                )}
                {errors &&
                    <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }
                {!loading && (
                    // <form onSubmit={onSubmit}>
                    //     <input value={customer.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder="Name" />
                    //     <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    //     <input value={customer.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder="Email" />
                    //     <input type="password" onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder="Password" />
                    //     <input type="password" onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder="Password Confirmation" />
                    //     <button className="btn">Save</button>

                    <div>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        <input type="text" placeholder="Company Address" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
                        <input type="text" placeholder="Company Zip Code" value={companyZipCode} onChange={(e) => setCompanyZipCode(e.target.value)} />
                        <input type="text" placeholder="Company Country" value={companyCountry} onChange={(e) => setCompanyCountry(e.target.value)} />
                        <input type="text" placeholder="Company City" value={companyCity} onChange={(e) => setCompanyCity(e.target.value)} />
                        <button >Update Customer</button>
                    </div>
                    // </form>
                )}
            </div>
        </>
    )
}