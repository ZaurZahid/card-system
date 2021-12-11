import React from "react"
import Modal from './../helpers/Modal/index';
import { getAccounts, addAccountService } from './../../utils/services/accounts';
import { AccountParams } from './../../utils/interfaces/Params.interface';
import Loading from './../helpers/Loading/index';

function Accounts() {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(true);
    const [accounts, setAccounts] = React.useState([]);
    const [disabled, setDisabled] = React.useState<boolean>(false)
    const [accountNumber, setAccountNumber] = React.useState('')
    const [balance, setBalance] = React.useState('')
    const [errMessage, setErrMessage] = React.useState('')

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        try {
            const { data, status } = await getAccounts()
            if (status === 200) {
                setAccounts(data)
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
            case 'accountNumber':
                setAccountNumber(value)
                break;
            case 'balance':
                setBalance(value)
                break;

            default:
                break;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDisabled(true)
        setErrMessage('')

        const accountNumberVal = accountNumber.trim()
        const balanceVal = balance.trim() ? +balance.trim() : ''

        if (accountNumberVal && balanceVal) {
            addAccountService({ accountNumberVal, balanceVal })
                .then(resp => {
                    if (resp.status === 200) {
                        setAccountNumber('')
                        setBalance('')
                        closeModal()
                        fetchData()
                    }
                })
                .catch(() => {
                    setErrMessage('Wrong credentaials')
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
                <button type="button" onClick={openModal}>Add </button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">accountNumber</th>
                        <th scope="col">balance</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.length ? (
                        <>
                            {accounts.map((account: AccountParams) =>
                                <tr>
                                    <th scope="row">{account.id}</th>
                                    <td>{account.accountNumber}</td>
                                    <td>{account.balance}</td>
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
                            <label>Account Number</label>
                            <input type="text" name={'accountNumber'} value={accountNumber} onChange={handleChange} placeholder="Enter account number" required minLength={16} maxLength={16} />
                        </div>
                        <div className="mb-3">
                            <label>Balance</label>
                            <input type="number" name={'balance'} value={balance} onChange={handleChange} placeholder="Enter balance" required />
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

export default Accounts
