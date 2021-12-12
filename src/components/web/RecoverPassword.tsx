import React, { useState } from 'react'
import { recoverPasswordService } from '../../utils/services/auth'
import { useLocation } from 'react-router-dom';

function RecoverPassword() {
    const [email, setEmail] = useState('')
    const [new_password, setNewPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState('')
    const location = useLocation();

    const getAccessTokenFromQuery = () => {
        const queryString = location.search;
        const params = new URLSearchParams(queryString);
        const accessToken = params.get('accessToken')
        return accessToken || ''
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'email':
                setEmail(value)
                break;
            case 'new_password':
                setNewPassword(value)
                break;
            case 'confirm_password':
                setConfirmPassword(value)
                break;
            default:
                break;
        }
    }
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setErrMessage('')

        const emailVal = email.trim()
        const newPasswordVal = new_password.trim()
        const confirmPasswordVal = confirm_password.trim()
        let tokenValue = getAccessTokenFromQuery()
        
        tokenValue = tokenValue.replaceAll(" ", "+");

        if (emailVal && newPasswordVal && confirmPasswordVal) {
            if (newPasswordVal === confirmPasswordVal) {
                recoverPasswordService({ email:emailVal, token: tokenValue, password: newPasswordVal, confirmPassword: confirmPasswordVal })
                    .then(resp => {
                        if (resp.status === 200) {
                        
                           
                            window.location.href = '/login'
                        }
                    })
                    .catch(() => {
                        setErrMessage('Wrong credentaials')
                        setLoading(false)
                    });
            } else {
                setErrMessage('Passwords dont match')
                setLoading(false)
            }
        } else {
            setErrMessage('Fill in inputs')
            setLoading(false)
        }
    }

    return (
        <>
            <section>
                <div className="img-container">
                    <img src="/img/bg.jpg" alt="img-container" />
                </div>
            </section>
            {getAccessTokenFromQuery()
                ? <div className="log-in-container">
                    <div className="content">
                        <div className="header">
                            <h4 className="title">Recover password</h4>
                        </div>
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" name="email" value={email} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <input type="password" name="new_password" value={new_password} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" name="confirm_password" value={confirm_password} onChange={handleChange} className="form-control" />
                                </div>
                                {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
                                <div className="mb-3 form-check">
                                    <button type="submit" disabled={loading}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}

export default RecoverPassword
