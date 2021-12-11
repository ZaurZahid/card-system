import React from "react"
import Modal from './../helpers/Modal/index';
import {
    addAccountService,
    getCards, getClientCards,/* , addAccountService */
    getUsers
} from './../../utils/services/client_cards';
import { AccountParams } from './../../utils/interfaces/Params.interface';
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
            const { data, status } = await getClientCards()
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
                .catch(() => {
                    setErrMessage('Wrong credentaials')
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
                <button type="button" onClick={openModal}>Add</button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">clientId</th>
                        <th scope="col">accountId</th>
                        <th scope="col">cardId</th>
                    </tr>
                </thead>
                <tbody>
                    {clientCards.length ? (
                        <>
                            {clientCards.map((clientCard: { client: { userName: string }, accountId: any, cardId: any }) =>
                                <tr>
                                    <th scope="row">{clientCard.client.userName}</th>
                                    <td>{clientCard.accountId}</td>
                                    <td>{clientCard.cardId}</td>
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
                            <label>ClientId</label>

                            <select name="user" value={selectedUser} onChange={handleChange} disabled={loadingUsers}>
                                <option value={'-1'}>select</option>
                                {users
                                    ? users.map((user: { id: string, userName: string }) =>
                                        <option value={user.id}>{user.userName}</option>
                                    )
                                    : null
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Account Id</label>

                            <select name="account" value={selectedAccount} onChange={handleChange} disabled={loadingAccounts}>
                                <option value={-1}>select</option>
                                {accounts
                                    ? accounts.map((account: { id: string, accountNumber: string }) =>
                                        <option value={account.id}>{account.accountNumber}</option>
                                    )
                                    : null
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Card Id</label>
                            <select name="card" value={selectedCard} onChange={handleChange} disabled={loadingCards}>
                                <option value={-1}>select</option>
                                {cards
                                    ? cards.map((card: { id: string, number: string }) =>
                                        <option value={card.id}>{card.number}</option>
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