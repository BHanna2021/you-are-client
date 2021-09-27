import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import {
    BasicReverseButton,
} from '../styles/style';


type QUProps = {
    toBeUpdated: {
        quoteBody: string
        id: number
    }
    updateOff: () => void
    token: string
    viewMyQuotes: () => void
    isAdmin: string
    apiErr: string
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
        const updateQErr = 'This quote cannot be updated at this time';
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
            alert(`${updateQErr}${this.props.apiErr}`)
            console.log(err)
        }
    }




    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader style={{backgroundColor: 'indigo', color: 'antiquewhite'}}>Update your quote here:</ModalHeader>
                    <ModalBody style={{backgroundColor: 'blanchedalmond'}}>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            this.handleQUpdate()
                        }}>
                            <label htmlFor='quoteBody'>Quote to Update</label>
                            <br />
                            <textarea name='quotebody' style={{height: "20em", width: "22em", backgroundColor: "cornsilk"}} defaultValue={this.props.toBeUpdated.quoteBody} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({quoteToUpdate: e.target.value})} />
                            <br />
                            <BasicReverseButton type="submit">Update</BasicReverseButton>&nbsp;
                            <BasicReverseButton onClick={() => {this.props.updateOff(); this.props.viewMyQuotes()}}>Cancel</BasicReverseButton>
                        </form>
                    </ModalBody>
            </Modal>
        )
    }
}