import React, { useState } from 'react'
import { recoverPasswordService } from '../../utils/services/auth'
import { useLocation } from 'react-router-dom';
import Loading from './../helpers/Loading/index';
import { addDepositService, getVendors } from '../../utils/services/transaction';
import { getCards } from '../../utils/services/cards';
import Modal from './../helpers/Modal/index';

function Deposit() {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [disabled, setDisabled] = React.useState<boolean>(false)
    const [amount, setAmount] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState('')

    const [cards, setCards] = React.useState([]);
    const [vendors, setVendors] = React.useState([]);

    const [loadingCards, setLoadingCards] = React.useState(true);
    const [loadingVendors, setLoadingVendors] = React.useState(true);

    const [selectedCard, setSelectedCard] = React.useState<number>(-1);
    const [selectedVendor, setSelectedVendor] = React.useState<number>(-1);



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

    const fetchVendors = async () => {
        setLoadingVendors(true)

        try {
            const { data, status } = await getVendors()
            if (status === 200) {
                setVendors(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingVendors(false)
        }
    }


    const openModal = () => {
        setModalOpen(true)

        if (!cards.length) fetchCards()
        if (!vendors.length) fetchVendors()

        console.log(vendors)
        console.log(cards)
    }

    const closeModal = () => {
        setModalOpen(false)
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'amount':
                setAmount(+value)
                break;
            default:
                break;
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'card':
                setSelectedCard(+value)
                break;
            case 'vendor':
                setSelectedVendor(+value)
                break;

            default:
                break;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setErrMessage('')

        const selectedCardVal = selectedCard !== -1
        const selectedVendorVal = selectedVendor !== -1

        const amountVal = amount >= 0


        if (amountVal && selectedCard && selectedVendor) {
            addDepositService({ cardVal: selectedCard, vendorVal: selectedVendor, amount: amount })
                .then(resp => {
                    if (resp.status === 200) {

                        window.location.href = '/mytransactions'
                    }
                })
                .catch(() => {
                    setErrMessage('Error occured')
                    setLoading(false)
                });
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
                        <button type="button" className="btn btn-success m-2" onClick={openModal}>Add deposit to your card</button>
                    </div>
                    <img src="/img/bg.jpg" alt="img-container" />
                </div>
            </section>


            {modalOpen &&
                <Modal onClose={closeModal}>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="me-3">Card</label>

                            <select name="card" value={selectedCard} onChange={handleSelectChange} disabled={loadingCards}>
                                <option value={'-1'}>select</option>
                                {cards
                                    ? cards.map((card: { id: string, number: string }, index: any) =>
                                        <option value={card.id} key={index}>{card.number}</option>
                                    )
                                    : null
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="me-3">Vendor</label>

                            <select name="vendor" value={selectedVendor} onChange={handleSelectChange} disabled={loadingVendors}>
                                <option value={-1}>select</option>
                                {vendors
                                    ? vendors.map((vendor: { id: string, name: string }, index: any) =>
                                        <option value={vendor.id} key={index}>{vendor.name}</option>
                                    )
                                    : null
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Amount</label>
                            <input type="number" name={'amount'} value={amount} onChange={handleChange}
                                placeholder="Enter Amount" required />
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

export default Deposit
