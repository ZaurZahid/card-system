import React from "react"
import Modal from '../helpers/Modal/index';
import { getCards, addCardService } from '../../utils/services/cards';
import { CardParams } from '../../utils/interfaces/Params.interface';
import Loading from '../helpers/Loading/index';
import { getStates, getTypes } from "../../utils/services/deposit";
import { stat } from "fs/promises";

function Cards() {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(true);
    const [cards, setCards] = React.useState([]);
    const [types, setTypes] = React.useState([]);
    const [states, setStates] = React.useState([]);
    const [disabled, setDisabled] = React.useState<boolean>(false)
    const [number, setNumber] = React.useState('')
    const [cvv, setCvv] = React.useState('')
    const [selectedState, setSelectedState] = React.useState<number>(-1);
    const [selectedType, setSelectedType] = React.useState<number>(-1);
    const [valid, setValid] = React.useState<Boolean>(false);
    const [dateRegistered, setDateRegistered] = React.useState<Date>();
    const [expirationDate, setExpirationDate] = React.useState<Date>();
    const [errMessage, setErrMessage] = React.useState('')

    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)

        try {
            const { data, status } = await getCards()
            if (status === 200) {
                setCards(data)
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchTypes = async () => {

        try {
            const { data, status } = await getTypes()
            if (status === 200) {
                setTypes(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            //setLoadingUsers(false)
        }
    }

    const fetchStates = async () => {

        try {
            const { data, status } = await getStates()
            if (status === 200) {
                setStates(data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            //setLoadingUsers(false)
        }
    }

    const openModal = () => {
        setModalOpen(true)

        if (!types.length) fetchTypes()
        if (!states.length) fetchStates()

        console.log(types)
        console.log(states)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'number':
                setNumber(value)
                break;
            case 'cvv':
                setCvv(value)
                break;
            case 'valid':
                setValid(value === 'true')
                break;
            case 'dateRegistered':
                setDateRegistered(new Date(value))
                break;
            case 'expirationDate':
                setExpirationDate(new Date(value))
                break;

            default:
                break;
        }
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.name
        const value = e.target.value

        switch (name) {
            case 'state':
                setSelectedState(+value)
                break;
            case 'type':
                setSelectedType(+value)
                break;

            default:
                break;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setDisabled(true)
        setErrMessage('')
        const numberVal = number.trim()
        const cvvVal = cvv.trim() 
        const stateVal = selectedState
        const typeVal = selectedType
        const validVal = valid
        const dateRegisteredVal = dateRegistered
        const expirationDateVal = expirationDate

        var curr = new Date();
        curr.setDate(curr.getDate());
        var defaultDate = curr.toISOString().substr(0,10);


        if (numberVal && cvvVal  && stateVal && typeVal &&validVal && dateRegisteredVal && expirationDateVal) {
            addCardService({ numberVal, cvvVal,validVal, stateVal , typeVal ,dateRegisteredVal,
                expirationDateVal})
                .then(resp => {
                    if (resp.status === 200) {
                        setNumber('')
                        setCvv('')
                        setValid(false)
                        setSelectedState(-1)
                        setSelectedType(-1)
                        setDateRegistered(curr)
                        setExpirationDate(curr)
                        closeModal()
                        fetchData()
                    }
                })
                .catch(() => {
                    setErrMessage('Account wasn\'t added')
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
                <button type="button" onClick={openModal} className="btn btn-success m-2">Add </button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Cvv</th>
                        <th scope="col">Date Registered</th>
                        <th scope="col">Expiration Date</th>
                        <th scope="col">Valid</th>
                       
                        <th scope="col">State Name</th>
                        <th scope="col">Type Name</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.length ? (
                        <>
                            {cards.map((card: CardParams, index: any) =>
                                <tr key={index}>
                                    <td >{card.number}</td>
                                    <td >{card.cvv}</td>
                                    <td>{card.dateRegistered}</td>
                                    <td>{card.expirationDate}</td>
                                    <td>{card.valid?'true':'false'}</td>
                                    <td>{card.stateName}</td>
                                    <td>{card.typeName}</td>
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
                    <form onSubmit={handleSubmit} className="card-form">
                        <div className="mb-3">
                            <label>Number</label>
                            <input type="number" name={'number'} value={number} onChange={handleChange}
                             placeholder="Enter Card Number" required minLength={16} maxLength={16} />
                        </div>
                        <div className="mb-3">
                            <label>CVV</label>
                            <input type="number" name={'cvv'} value={cvv} onChange={handleChange}
                             placeholder="Enter Card CVV" required minLength={3} maxLength={3}/>
                        </div>
                        <div className="mb-3">
                            <label>Expire Date</label>
                            <input type="date" name={'expirationDate'} value={expirationDate?.toDateString()} onChange={handleChange}
                             placeholder="Choose expire date" required />
                        </div>
                        <div className="mb-3">
                        <label className="mb-">Validity</label>
                        <select name={'valid'} value={valid?'true':'false'} onChange={handleSelectChange}>
                               <option value="true">True</option>
                               <option value="false">False</option>

                        </select>
                        </div>
                        <div className="mb-3">
                        <label className="mb-">State Name</label>
                        <select name={'valid'} value={valid?'true':'false'} onChange={handleSelectChange}>
                               <option value="true">True</option>
                               <option value="false">False</option>

                        </select>
                        </div>
                        <div className="mb-3">
                        <label className="mb-">Type Name</label>
                        <select name={'valid'} value={valid?'true':'false'} onChange={handleSelectChange}>
                               <option value="true">True</option>
                               <option value="false">False</option>

                        </select>
                        </div>
                        {/* <div className="mb-3">
                            <select onChange={handleSelectChange}>
                           <option  name={'state'} value={state} ></option>

                            </select>
                        </div> */}
                        {errMessage && <p style={{ color: "red" }}>{errMessage}</p>}
                        <div className="mb-3">
                            <button type="submit" className="btn btn-success w-25" disabled={disabled}>Submit</button>
                        </div>
                    </form>
                </Modal>
            }
        </Loading>
    )
}

export default Cards
