import React from "react"
import Modal from './../helpers/Modal/index';
import { getUsers, addUserService } from './../../utils/services/users';
import { UserParams } from './../../utils/interfaces/Params.interface';

import Loading from './../helpers/Loading/index';

function Users() {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const [disabled, setDisabled] = React.useState<boolean>(false)
    const [firstName, setFirstName] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [errMessage, setErrMessage] = React.useState('')

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        try {
            const { data, status } = await getUsers()
            if (status === 200) {
                setUsers(data)
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
            case 'firstName':
                setFirstName(value)
                break;
            case 'lastName':
                setLastName(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'password':
                setPassword(value)
                break;
            case 'confirmPassword':
                setConfirmPassword(value)
                break;

            default:
                break;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDisabled(true)
        setErrMessage('')

        const firstNameVal = firstName.trim()
        const lastNameVal = lastName.trim() 
        const emailVal = email.trim() 
        const passwordVal = password.trim() 
        const confirmPasswordVal = confirmPassword.trim() 

        if (firstNameVal && lastNameVal && emailVal && passwordVal && confirmPasswordVal) {
            addUserService({ firstNameVal, lastNameVal,emailVal,passwordVal,confirmPasswordVal})
                .then(resp => {
                    if (resp.status === 200) {
                        setFirstName('')
                        setLastName('')
                        setPassword('')
                        setConfirmPassword('')
                        closeModal()
                        fetchData()
                    }
                })
                .catch(() => {
                    setErrMessage('User wasn\'t added')
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

                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Email</th>
                        <th scope="col">Last Login Time</th>
                        <th scope="col">Last Password Change Date</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {users.length ? (
                        <>
                            {users.map((user: UserParams, index: any) =>
                                <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.lastLoginTime}</td>
                                    <td>{user.lastPasswordChangeDate}</td>
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
                            <label>Firstname</label>
                            <input type="text" name={'firstName'} value={firstName} onChange={handleChange} 
                            placeholder="Enter your Firstname" required />
                        </div>
                        <div className="mb-3">
                            <label>Lastname</label>
                            <input type="text" name={'lastName'} value={lastName} onChange={handleChange} 
                            placeholder="Enter your Lastname" required  />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" name={'email'} value={email} onChange={handleChange} 
                            placeholder="Enter your Email" required />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" name={'password'} value={password} onChange={handleChange} 
                            placeholder="Enter your Passsword" required minLength={4} />
                        </div>
                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input type="confirmPassword" name={'confirmPassword'} value={confirmPassword} onChange={handleChange} 
                            placeholder="Confirm Passsword" required minLength={4} />
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

export default Users
