import React from 'react';

type QCreateProps = {
    creatorToken: string,
    isAdmin: string
}

type QCreateState = {
    quoteBody: string,
    share: boolean,
    approvedForAll: boolean
}

export default class QuoteCreator extends React.Component<QCreateProps, QCreateState> {
    constructor(props: any) {
        super(props)
        this.state = {
            quoteBody: '',
            share: false,
            approvedForAll: false
        }
    }

    handleQCreate = async () => {
        const apiURL = 'http://localhost:3000/quote/';
        console.log(apiURL)
        const qCreateBody = {
            Quote: {
                quoteBody: this.state.quoteBody,
                share: this.state.share
            }
        }
        try {
            const res = await fetch (apiURL, {
                method: "POST",
                body: JSON.stringify(qCreateBody),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.creatorToken}`
                })
            })
            const json = await res.json()
            alert(`Quote '${json.quoteBody}' has been created.` )
        } catch (err) {
            console.log(err)
        }
    }

    handleAdQCreate = async () => {
        const apiURL = 'http://localhost:3000/quote/add';
        const qCreateBody = {
            Quote: {
                quoteBody: this.state.quoteBody,
                share: this.state.share,
                approvedForAll: this.state.approvedForAll
            }
        }
        try {
            const res = await fetch (apiURL, {
                method: "POST",
                body: JSON.stringify(qCreateBody),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.creatorToken}`
                })
            })
            const json = await res.json()
            alert(`Quote '${json.quoteBody}' has been created.` )
        } catch (err) {
            console.log(err)
        }
    }


    render() {
        return(
            this.props.isAdmin === 'true' ?
            <form onSubmit={(e) => {
                e.preventDefault()
                this.handleAdQCreate()
                this.setState({quoteBody: ''})
                this.setState({share: false})
                this.setState({approvedForAll: false})
            }}>
            <h1>Add your quote here:</h1>
            <div>
                <label htmlFor='quotebody'>New Quote</label>
                <br />
                <textarea name='quotebody' value={this.state.quoteBody} style={{height: "20em", width: "25em"}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({quoteBody: e.target.value})}/>
                <br />
                <br />
                <label htmlFor='shareable'>Share?</label>&nbsp;
                <input type='checkbox' checked={this.state.share} onChange={() => this.setState({share: true})} name='shareable' />&nbsp;&nbsp;
                <label htmlFor='allowforall'>Allow Search?</label>&nbsp;
                <input type='checkbox' checked={this.state.approvedForAll} onChange={() => this.setState({approvedForAll: true})} name='allowforall' />
                <br />
                <br />
                <button type='submit' style={{fontSize: "x-large"}}>Create &#x270D;</button>
            </div>
            </form> :
            <form onSubmit={(e) => {
                e.preventDefault()
                this.handleQCreate()
                this.setState({quoteBody: ''})
            }}>
            <h1>Add your quote here:</h1>
            <div>
                <label htmlFor='quotebody'>New Quote</label>
                <br />
                <textarea name='quotebody' value={this.state.quoteBody} style={{height: "20em", width: "25em"}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({quoteBody: e.target.value})}/>
                <br />
                <button type='submit' style={{fontSize: "x-large"}}>Create &#x270D;</button>
            </div>
            </form>
        )
    }
}