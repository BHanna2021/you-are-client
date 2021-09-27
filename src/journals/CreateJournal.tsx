import React from 'react';
import {
    FormInput,
    Label,
    CreateButton
} from '../styles/style';

type JCreateProps = {
    creatorToken: string
    apiErr: string
}

type JCreateState = {
    journalBody: string,
    journalName: string
}

export default class CreateJournal extends React.Component<JCreateProps, JCreateState> {
    constructor(props: any){
        super(props)
        this.state = {
            journalBody: '',
            journalName: ''
        }
    }

    handleJCreate = async () => {
        const jCreateErr = 'This journal could not be created';
        const apiURL = 'http://localhost:3000/journal/';
        const jCreateBody = {
            Journal: {
                journalBody: this.state.journalBody,
                journalName: this.state.journalName
            }
        }
        try {
            const res = await fetch (apiURL, {
                method: "POST",
                body: JSON.stringify(jCreateBody),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.creatorToken}`
                })
            })
            // console.log(res)
            const json = await res.json()
            alert(`Journal '${json.journalName}' has been created.` )
        } catch (err) {
            alert(`${jCreateErr}${this.props.apiErr}`)
            console.log(err)
        }
    }



    render() {
        return(
            <form onSubmit={(e) => {
                e.preventDefault()
                this.handleJCreate()
                this.setState({journalBody: ''})
                this.setState({journalName: ''})
            }}>
            <h1>Add a new entry here:</h1>
            <div>
                <Label htmlFor='journalname'>Journal Title</Label>
                <br />
                <FormInput name='journalname' value={this.state.journalName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({journalName: e.target.value})} />
                <br />
                <br />
                <Label htmlFor='journalbody'>Journal Entry</Label>
                <br />
                <textarea name='journalbody' value={this.state.journalBody} style={{height: "20em", width: "19em", backgroundColor: "mintcream"}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({journalBody: e.target.value})}/>
                <br />
                <CreateButton type='submit' style={{fontSize: "x-large"}}>Create &#x270D;</CreateButton>
            </div>
            </form>
        )
    }
}