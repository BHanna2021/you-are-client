import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';
import {
    BasicReverseButton
} from '../styles/style';

type JUProps = {
    jToBeUpdated: {
        journalBody: string
        journalName: string
        id: number
    }
    jUpdateOff: () => void
    token: string
    viewMyJournals: () => void
    apiErr: string
}

type JUState = {
    jNameToUpdate: string
    jBodyToUpdate: string

}

export default class UpdateJournal extends React.Component<JUProps, JUState> {
    constructor(props: JUProps){
        super(props)
        this.state = {
            jBodyToUpdate: '',
            jNameToUpdate: ''
        }
    }; 

    handleJUpdate = async () => {
        const jUpdateErr = 'This journal could not be updated';
        const jUpdateAlert = this.props.jToBeUpdated.journalName;
        const apiURL = `http://localhost:3000/journal/${this.props.jToBeUpdated.id}`;
        const jEditBody = {
            Journal: {
                journalBody: this.state.jBodyToUpdate,
                journalName: this.state.jNameToUpdate
            }
        }
        try {
            const res = await fetch (apiURL, {
                method: "PUT",
                body: JSON.stringify(jEditBody),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
            const json = await res.json()
            alert(`Journal '${jUpdateAlert}' has been updated.` )
            this.props.jUpdateOff()
            this.props.viewMyJournals()
        } catch (err) {
            alert(`${jUpdateErr}${this.props.apiErr}`)
            console.log(err)
        }
    }




    render() {
        return(
            <Modal isOpen={true}>
                <ModalHeader style={{backgroundColor: 'indigo', color: 'antiquewhite'}}>Update your journal here:</ModalHeader>
                    <ModalBody style={{backgroundColor: 'blanchedalmond'}}>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            this.handleJUpdate()
                        }}>
                            <div>
                                <label htmlFor='journalName'>Journal Name to Update</label>
                                <br />
                                <input name='journalName' style={{width: "17em", backgroundColor: "cornsilk"}} defaultValue={this.props.jToBeUpdated.journalName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({jNameToUpdate: e.target.value})} />
                                <br />
                                <label htmlFor='journalBody'>Journal to Update</label>
                                <br />
                                <textarea name='journalBody' style={{height: "20em", width: "17em", backgroundColor: "cornsilk"}} defaultValue={this.props.jToBeUpdated.journalBody} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({jBodyToUpdate: e.target.value})} />
                                <br />
                                <BasicReverseButton type="submit">Update</BasicReverseButton>&nbsp;
                                <BasicReverseButton onClick={() => {this.props.jUpdateOff(); this.props.viewMyJournals()}}>Cancel</BasicReverseButton>
                            </div>
                        </form>
                    </ModalBody>
            </Modal>
        )
    }
}