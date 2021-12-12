import React, { useState } from 'react'
import { getUserId } from '../../utils';
import { getClientCard, getClientCards } from './../../utils/services/client_cards';
import Loading from './../helpers/Loading/index';

function ClientCards() {
    const [selectedCard, setSelectedCard] = useState<{ number: any, cvv: any, expirationDate: string } | null>(null)
    const [clientCards, setClientCards] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedCardLoading, setSelectedCardLoading] = React.useState(true);

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        try {
            const { data, status } = await getClientCards(getUserId())
            if (status === 200) {
                setClientCards(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchSingleCard = async (id: number) => {
        setSelectedCardLoading(true)

        try {
            const { data, status } = await getClientCard(id)
            if (status === 200) {
                setSelectedCard(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSelectedCardLoading(false)
        }
    }

    const handleSelectCard = (id: number | null) => {
        if (!id) setSelectedCard(null)
        if (id) fetchSingleCard(id)
    }

    const renderTableContent = () => {
        let content = (
            <Loading isLoading={loading}>
                <div className="title">Account</div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Account number</th>
                            <th scope="col">Card number</th>
                            <th scope="col">Go to Card</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientCards.map((clientCard: { client: { userName: string }, account: any, card: any,cardId:any }, index: any) =>
                            <tr key={index}>
                                <th scope="row">{clientCard.client.userName}</th>
                                <td>{clientCard.account.accountNumber}</td>
                                <td>{clientCard.card.number}</td>
                                <td><button type="button" onClick={() => handleSelectCard(clientCard.cardId)}>Card</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Loading>
        )

        if (selectedCard) {
            content = (
                <Loading isLoading={selectedCardLoading}>
                    <div className="title">Card</div>
                    <button type="button" onClick={() => handleSelectCard(null)}>Back</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Number</th>
                                <th scope="col">CVV</th>
                                <th scope="col">Expiration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCard &&
                                <tr>
                                    <td>{selectedCard.number}</td>
                                    <td >{selectedCard.cvv}</td>
                                    <td>{new Date(selectedCard.expirationDate).toISOString().substring(0, 10)}</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </Loading>
            )
        }

        return content
    }

    return (
        <section>
            <div className="img-container">
                <img src="/img/bg.jpg" alt="img-container" />
            </div>
            <div className="registered-cards">
                {renderTableContent()}
            </div>
        </section>
    )
}

export default ClientCards
