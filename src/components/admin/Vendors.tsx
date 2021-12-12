import React from "react"
import Modal from './../helpers/Modal/index';
import { getVendors, addVendorService } from './../../utils/services/vendors';
import { VendorParams } from './../../utils/interfaces/Params.interface';
import Loading from './../helpers/Loading/index';

function Vendors() {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(true);
    const [vendors, setVendors] = React.useState([]);
    const [disabled, setDisabled] = React.useState<boolean>(false)
    const [name, setName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [errMessage, setErrMessage] = React.useState('')

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        try {
            const { data, status } = await getVendors()
            if (status === 200) {
                setVendors(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'name':
                setName(value)
                break;
            case 'phone':
                setPhone(value)
                break;
            case 'email':
                setEmail(value)
                break;

            default:
                break;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDisabled(true)
        setErrMessage('')

        const nameVal = name.trim()
        const phoneVal = phone.trim() 
        const emailVal = email.trim() 

        if (nameVal && phoneVal && emailVal) {
            addVendorService({ nameVal,phoneVal,emailVal })
                .then(resp => {
                    if (resp.status === 200) {
                        setName('')
                        setPhone('')
                        setEmail('')
                        closeModal()
                        fetchData()
                    }
                })
                .catch(() => {
                    setErrMessage('Account wasn\'t added')
                    setDisabled(false)
                });
        } else {
            setErrMessage('Fill in inputs')
            setDisabled(false)
        }
    }

    return (
        <Loading isLoading={loading}>
            <div className="link">
                <button type="button" className="btn btn-success m-2" onClick={openModal}>Add </button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {vendors.length ? (
                        <>
                            {vendors.map((vendor: VendorParams, index: any) =>
                                <tr key={index}>
                                    <td>{vendor.name}</td>
                                    <td>{vendor.phone}</td>
                                    <td>{vendor.email}</td>
                                </tr>
                            )}
                        </>
                    ) : (
                        <p>empty</p>
                    )}
                </tbody>
            </table>

            {modalOpen &&
                <Modal onClose={closeModal}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="me-3" >Name:</label>
                            <input type="text" name={'name'} value={name} onChange={handleChange}
                             placeholder="Enter Your  Name" required/>
                        </div>
                        <div className="mb-3">
                            <label className="me-3">Phone:</label>
                            <input type="phone" name={'phone'} value={phone} onChange={handleChange}
                             placeholder="Enter Your Phone" required />
                        </div>
                        <div className="mb-3">
                            <label className="me-3">Email:</label>
                            <input type="email" name={'email'} value={email} onChange={handleChange}
                             placeholder="Enter Your Email" required />
                        </div>
                        {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
                        <div className="mb-3">
                            <button type="submit" className="btn btn-success" disabled={disabled}>Submit</button>
                        </div>
                    </form>
                </Modal>
            }
        </Loading>
    )
}

export default Vendors
