import React, { useState } from 'react'
import { setRefreshToken, setUserId } from '../../utils'
import { setAccessToken } from './../../utils/index';
import { loginService } from '../../utils/services/auth';
import { forgetPasswordService } from './../../utils/services/auth';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState('')

    const [openForgetForm, setOpenForgetForm] = useState(false)
    const [forgetEmail, setForgetEmail] = useState('')
    const [loadingForget, setLoadingForget] = useState<boolean>(false)
    const [forgetPassSuccessMessage, setForgetPassSuccessMessage] = useState('')
    const [forgetPassErrMessage, setForgetPassErrMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'email':
                setEmail(value)
                break;
            case 'password': 
                setPassword(value)
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
        const passwordVal = password.trim()

        if (emailVal && passwordVal) {
            loginService({ email, password })
                .then(resp => {
                    if (resp.status === 200) {
                        const { refreshToken, jwt } = resp.data
                        
                        setRefreshToken(refreshToken.token);
                        setUserId(resp.data.id)
                        setAccessToken(jwt.token);
                        setLoading(false)

                        window.location.reload();
                    }
                })
                .catch(() => {
                    setErrMessage('Wrong credentaials')
                    setLoading(false)
                });
        } else {
            setErrMessage('Fill in inputs')
            setLoading(false)
        }
    }

    const handleSubmitForget = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoadingForget(true)
        setForgetPassErrMessage('')

        const emailVal = forgetEmail.trim()

        if (emailVal) {
            forgetPasswordService({ email: emailVal })
                .then(resp => {
                    if (resp.status === 200) {
                        setForgetPassSuccessMessage('Link was sent. Please, check your email')
                    }
                })
                .catch(() => {
                    setForgetPassErrMessage('No Accounts Registered')
                    setLoadingForget(false)
                });
        } else {
            setForgetPassErrMessage('Fill in inputs')
            setLoadingForget(false)
        }
    }

    const renderLoginContent = () => {
        let content = (
            <div className="log-in-container">
                <div className="content">
                    <div className="header">
                        <h4 className="title">Log In</h4>
                    </div>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="email" name="email" value={email} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" value={password} onChange={handleChange} className="form-control" />
                            </div>
                            {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
                            <div className="mb-3 form-check">
                                <button type="submit" disabled={loading}>Log In</button>
                            </div>
                            <div className="mb-3">
                                <span onClick={() => setOpenForgetForm(true)} style={{ textDecoration: "underline", color: "blue", cursor: "default" }}> Forgot your password ?</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )

        if (openForgetForm) {
            content = (
                <div className="form">
                    <h5 className="title">Forgot Your Password ?</h5>
                    <span onClick={() => setOpenForgetForm(false)} style={{ cursor: "default" }}> Back</span>

                    <form onSubmit={handleSubmitForget}>
                        <label> Email</label>
                        <input type="email" name="email" value={forgetEmail} onChange={(e) => setForgetEmail(e.target.value)} className="form-control" placeholder="Enter Your Email" />
                        {forgetPassErrMessage && <p style={{ color: "red" }}>{forgetPassErrMessage}</p>}
                        <button type="submit" className="form-control" disabled={loadingForget}>Submit</button>
                    </form>
                </div>
            )
        }

        if (forgetPassSuccessMessage) {
            content = (
                <div className="form" style={{ height: "auto" }}>
                    <h5 className="title">{forgetPassSuccessMessage}</h5>
                </div>
            )
        }

        return content
    }

    return (
        <>
            <section>
                <div className="img-container">
                    <img src="/img/bg.jpg" alt="img-container" />
                </div>
            </section>
            {renderLoginContent()}
        </>
    )
}

export default Login
