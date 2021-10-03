import React from 'react';
import {
    Label,
    CreateButton
} from '../styles/style';
import APIURL from '../helpers/environment';

type QCreateProps = {
    creatorToken: string,
    isAdmin: string
    apiErr: string
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
        const qCreateErr = 'This quote cannot be created at this time';
        const apiURL = `${APIURL}quote/`;
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
            alert(`${qCreateErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    handleAdQCreate = async () => {
        const adQCreateErr = 'This quote cannot be created at this time';
        const apiURL = `${APIURL}quote/add`;
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
            alert(`${adQCreateErr}${this.props.apiErr}`)
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
            <h1 style={{color: 'mintcream'}}>Add your quote here:</h1>
            <div>
                <Label htmlFor='quotebody'>New Quote</Label>
                <br />
                <textarea name='quotebody' value={this.state.quoteBody} style={{height: "20em", width: "19em", backgroundColor: 'mintcream'}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({quoteBody: e.target.value})}/>
                <br />
                <br />
                <Label htmlFor='shareable'>Share?</Label>&nbsp;
                <input style={{backgroundColor: 'mintcream'}} type='checkbox' checked={this.state.share} onChange={() => this.setState({share: true})} name='shareable' />&nbsp;&nbsp;
                <Label htmlFor='allowforall'>Allow Search?</Label>&nbsp;
                <input style={{backgroundColor: 'mintcream'}} type='checkbox' checked={this.state.approvedForAll} onChange={() => this.setState({approvedForAll: true})} name='allowforall' />
                <br />
                <br />
                <CreateButton type='submit' >Create &#x270D;</CreateButton>
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
                <textarea name='quotebody' value={this.state.quoteBody} style={{height: "20em", width: "19em", backgroundColor: 'mintcream'}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({quoteBody: e.target.value})}/>
                <br />
                <Label htmlFor='shareable' title='Check this box if you want to share this quote with others.'>Share?</Label>&nbsp;
                <input style={{backgroundColor: 'mintcream'}} type='checkbox' checked={this.state.share} onChange={() => this.setState({share: true})} name='shareable' />
                <br />
                <CreateButton type='submit' style={{fontSize: "x-large"}}>Create &#x270D;</CreateButton>
            </div>
            </form>
        )
    }
}