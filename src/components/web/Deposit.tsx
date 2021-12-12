import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getUserId } from '../../utils';

function Deposit() {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [amount, setAmount] = useState('')
    const [cardId, setCardId] = useState('')
    const [vendorId, setVendorId] = useState('')
    const [types, setTypes] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [type, setType] = useState<boolean>(false)
    const [state, setState] = useState<boolean>(false)
    const [clientId, setClientId] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState('')
    const location = useLocation();

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
            case 'amount':
                setAmount(value)
                break;
            case 'cardId':
                setCardId(value)
                break;
            case 'vendorId':
                setVendorId(value)
                break;
            case 'type':
                setType(value === 'true')
                break;
            case 'clientId':
                setClientId(value)
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setErrMessage('')

        const amountVal = amount.trim()
        const cardIdVal = cardId.trim()
        const vendorIdVal = vendorId.trim()
        const typeVal = type
        const statusVal = status
        const clientIdVal = getUserId()


        //     if (amountVal && cardIdVal && vendorIdVal && typeVal && statusVal && clientIdVal) {
        //         if (newPasswordVal === confirmPasswordVal) {
        //             recoverPasswordService({ email:emailVal, token: tokenValue, password: newPasswordVal, confirmPassword: confirmPasswordVal })
        //                 .then(resp => {
        //                     if (resp.status === 200) {


        //                         window.location.href = '/login'
        //                     }
        //                 })
        //                 .catch(() => {
        //                     setErrMessage('Wrong credentaials')
        //                     setLoading(false)
        //                 });
        //         } else {
        //             setErrMessage('Passwords dont match')
        //             setLoading(false)
        //         }
        //     } else {
        //         setErrMessage('Fill in inputs')
        //         setLoading(false)
        //     }
        // }

        return (
            <>
                <section>
                    <div className="img-container">
                        <img src="/img/bg.jpg" alt="img-container" />
                    </div>
                </section>
                <div className="deposit-container">
                    <div className="content">
                        <div className="header">
                            <h4 className="title">Recover password</h4>
                        </div>
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" value={amount} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input type="password" name="new_password" value={cardId} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" name="confirm_password" value={vendorId} onChange={handleChange} className="form-control" />
                                </div>
                                {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
                                <div className="mb-3 form-check">
                                    <button type="submit" disabled={loading}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default Deposit
