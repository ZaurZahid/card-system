import React, { useState } from 'react'
import { setRefreshToken } from '../../utils'
import { setAccessToken } from './../../utils/index';
import { loginService } from '../../utils/services/auth';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState('')

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

    return (
        <>
            <section>
                <div className="img-container">
                    <img src="/img/bg.jpg" alt="img-container" />
                </div>
            </section>
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
                                <a href="./f-pass.html" className="forgot-link"> Forgot your password ?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
