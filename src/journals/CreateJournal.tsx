import React from 'react';

type JCreateProps = {
    creatorToken: string
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
            <h1>Add your journal entry here:</h1>
            <div>
                <label htmlFor='journalname'>Journal Title</label>
                <br />
                <input name='journalname' value={this.state.journalName} style={{width: "25em"}} onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({journalName: e.target.value})} />
                <br />
                <br />
                <label htmlFor='journalbody'>Journal Entry</label>
                <br />
                <textarea name='journalbody' value={this.state.journalBody} style={{height: "20em", width: "25em"}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({journalBody: e.target.value})}/>
                <br />
                <button type='submit' style={{fontSize: "x-large"}}>Create &#x270D;</button>
            </div>
            </form>
        )
    }
}