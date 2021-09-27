import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

type QUProps = {
    toBeUpdated: {
        quoteBody: string
        id: number
    }
    updateOff: () => void
    token: string
    viewMyQuotes: () => void
    isAdmin: string
}

type QUState = {
    quoteToUpdate: string

}

export default class QuoteUpdater extends React.Component<QUProps, QUState> {
    constructor(props: QUProps){
        super(props)
        this.state = {
            quoteToUpdate: ''
        }
    }; 

    handleQUpdate = async () => {
        const updateAlert = this.props.toBeUpdated.quoteBody;
        const apiURL = `http://localhost:3000/quote/${this.props.toBeUpdated.id}`;
        const qEditBody = {
            Quote: {
                quoteBody: this.state.quoteToUpdate
            }
        }
        try {
            const res = await fetch (apiURL, {
                method: "PUT",
                body: JSON.stringify(qEditBody),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
            const json = await res.json()
            alert(`Quote '${updateAlert}' has been updated.` )
            this.props.updateOff()
            this.props.viewMyQuotes()
        } catch (err) {
            console.log(err)
        }
    }




    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader>Update your quote here:</ModalHeader>
                    <ModalBody>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            this.handleQUpdate()
                        }}>
                            <label htmlFor='quoteBody'>Quote to Update</label>
                            <br />
                            <textarea name='quotebody' style={{height: "20em", width: "25em"}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({quoteToUpdate: e.target.value})}>{this.props.toBeUpdated.quoteBody}</textarea>
                            <br />
                            <button type="submit">Update</button>
                            <button onClick={() => {this.props.updateOff(); this.props.viewMyQuotes()}}>Cancel</button>
                        </form>
                    </ModalBody>
            </Modal>
        )
    }
}