import React, { useState } from 'react'
import { editProfileService, getUserService } from '../../utils/services/profile'
import { useLocation } from 'react-router-dom';
import Modal from './../helpers/Modal/index';
import Loading from './../helpers/Loading/index';
import { getUserId } from '../../utils';

function Profile() {

    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [disabled, setDisabled] = React.useState<boolean>(false)

    const [email, setEmail] = useState<any>('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [new_password, setNewPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [user, setUser] = useState<{ id: any, firstName: any, lastName: any, email: string } | null>(null)
    const [loading, setLoading] = useState(true);
    const [errMessage, setErrMessage] = useState('')

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        try {
            const { data, status } = await getUserService(getUserId())
            if (status === 200) {
                setUser(data)

            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const openModal = () => {
        setModalOpen(true)

        if (!user) fetchData();

        setEmail(user?.email);
        setFirstName(user?.firstName);
        setLastName(user?.lastName);


        console.log(user)
    }

    const closeModal = () => {
        setModalOpen(false)
        setEmail('');
        setFirstName('');
        setLastName('');
        setNewPassword('');
        setConfirmPassword('');
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'firstName':
                setFirstName(value)
                break;
            case 'lastName':
                setLastName(value)
                break;
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
        const firstNameVal = firstName.trim()
        const lastNameVal = lastName.trim()
        const newPasswordVal = new_password.trim()
        const confirmPasswordVal = confirm_password.trim()

        if (emailVal && firstNameVal && lastNameVal) {
            if (newPasswordVal === confirmPasswordVal) {
                editProfileService({ userId: getUserId(), email: emailVal, firstName: firstNameVal, lastName: lastNameVal, password: newPasswordVal, confirmPassword: confirmPasswordVal })
                    .then(resp => {
                        if (resp.status === 200) {

                            setEmail('');
                            setFirstName('');
                            setLastName('');
                            setNewPassword('');
                            setConfirmPassword('');

                            window.location.href = '/Profile'
                        }
                    })
                    .catch(() => {
                        setErrMessage('Profile was not updated')
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
        <Loading isLoading={loading}>

            <section>
                <div className="img-container">
                    <div className="link text-center">
                        <button type="button" className="btn btn-success m-2" onClick={openModal}>Edit Profile</button>
                    </div>
                    <img src="/img/bg.jpg" alt="img-container" />
                </div>
            </section>


            {modalOpen &&
                <Modal onClose={closeModal}>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" value={email} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Firstname</label>
                            <input type="firstName" name="firstName" value={firstName} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Lastname</label>
                            <input type="lastName" name="lastName" value={lastName} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input type="password" name="new_password" value={new_password} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" name="confirm_password" value={confirm_password} onChange={handleChange} />
                            {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
                            <div className="mb-3">
                                <button className="btn btn-success" type="submit" disabled={loading}>Edit  Profile</button>
                            </div>
                        </div>
                    </form>


                </Modal>
            }

        </Loading>
    )
}

export default Profile
