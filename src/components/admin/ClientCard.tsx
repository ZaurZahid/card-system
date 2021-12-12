import React from "react"
import Modal from './../helpers/Modal/index';
import {
    addAccountService,
    getAllClientCards,
    getCards, getClientCards,/* , addAccountService */
    getUsers
} from './../../utils/services/client_cards';
import Loading from './../helpers/Loading/index';
import { getAccounts } from './../../utils/services/accounts';

function ClientCard() {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(true);
    const [clientCards, setClientCards] = React.useState([]);
    const [disabled, setDisabled] = React.useState<boolean>(false)
    const [errMessage, setErrMessage] = React.useState('')


    const [users, setUsers] = React.useState([]);
    const [accounts, setAccounts] = React.useState([]);
    const [cards, setCards] = React.useState([]);

    const [loadingUsers, setLoadingUsers] = React.useState(true);
    const [loadingAccounts, setLoadingAccounts] = React.useState(true);
    const [loadingCards, setLoadingCards] = React.useState(true);

    const [selectedUser, setSelectedUser] = React.useState<string>('-1');
    const [selectedAccount, setSelectedAccount] = React.useState<number>(-1);
    const [selectedCard, setSelectedCard] = React.useState<number>(-1);

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        try {
            const { data, status } = await getAllClientCards()
            if (status === 200) {
                setClientCards(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUsers = async () => {
        setLoadingUsers(true)

        try {
            const { data, status } = await getUsers()
            if (status === 200) {
                setUsers(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingUsers(false)
        }
    }

    const fetchAccounts = async () => {
        setLoadingAccounts(true)

        try {
            const { data, status } = await getAccounts()
            if (status === 200) {
                setAccounts(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingAccounts(false)
        }
    }

    const fetchCards = async () => {
        setLoadingCards(true)

        try {
            const { data, status } = await getCards()
            if (status === 200) {
                setCards(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingCards(false)
        }
    }

    const openModal = () => {
        setModalOpen(true)

        if (!users.length) fetchUsers()
        if (!accounts.length) fetchAccounts()
        if (!cards.length) fetchCards()

        console.log(users)
        console.log(accounts)
        console.log(cards)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'user':
                setSelectedUser(value)
                break;
            case 'account':
                setSelectedAccount(+value)
                break;
            case 'card':
                setSelectedCard(+value)
                break;

            default:
                break;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDisabled(true)
        setErrMessage('')

        const selectedUserVal = selectedUser !== '-1'
        const selectedCardVal = selectedCard !== -1
        const selectedAccountVal = selectedAccount !== -1

        if (selectedUserVal && selectedCardVal && selectedAccountVal) {
            addAccountService({ clientId: selectedUser, cardId: selectedCard, accountId: selectedAccount })
                .then(resp => {
                    if (resp.status === 200) {
                        setSelectedUser('-1')
                        setSelectedAccount(-1)
                        setSelectedCard(-1)
                        setDisabled(false)

                        closeModal()
                        fetchData()
                    }
                })
                .catch((e) => {
                    setErrMessage(e.message)
                    setDisabled(false)
                });
        } else {
            setErrMessage('Select values')
            setDisabled(false)
        }
    }

    return (
        <Loading isLoading={loading}>
            <div className="link">
                <button type="button" className="btn btn-success m-2" onClick={openModal}>Add</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Client Id</th>
                        <th scope="col">Account Number</th>
                        <th scope="col">Card Number</th>
                    </tr>
                </thead>
                <tbody>
                    {clientCards.length ? (
                        <>
                            {clientCards.map((clientCard: { client: { userName: string }, account: any, card: any }, index: any) =>
                                <tr key={index}>
                                    <th scope="row">{clientCard.client.userName}</th>
                                    <td>{clientCard.account.accountNumber}</td>
                                    <td>{clientCard.card.number}</td>
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
                        <h3 className="mb-3 text-danger">One account number can only have one card</h3>
                        <div className="mb-3">
                            <label className="me-3">Client</label>

                            <select name="user" value={selectedUser} onChange={handleChange} disabled={loadingUsers}>
                                <option value={'-1'}>select</option>
                                {users
                                    ? users.map((user: { id: string, userName: string }, index: any) =>
                                        <option value={user.id} key={index}>{user.userName}</option>
                                    )
                                    : null
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="me-3">Account</label>

                            <select name="account" value={selectedAccount} onChange={handleChange} disabled={loadingAccounts}>
                                <option value={-1}>select</option>
                                {accounts
                                    ? accounts.map((account: { id: string, accountNumber: string }, index: any) =>
                                        <option value={account.id} key={index}>{account.accountNumber}</option>
                                    )
                                    : null
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="me-3">Card</label>
                            <select name="card" value={selectedCard} onChange={handleChange} disabled={loadingCards}>
                                <option value={-1}>select</option>
                                {cards
                                    ? cards.map((card: { id: string, number: string }, index: any) =>
                                        <option value={card.id} key={index}>{card.number}</option>
                                    )
                                    : null
                                }
                            </select>
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

export default ClientCard
