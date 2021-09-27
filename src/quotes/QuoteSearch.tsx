import React from 'react';
import { Table } from 'reactstrap';

type QSProps = {
    userToken: string
    apiErr: string
    isAdmin: string
}

type QSState = {
    foundQuotes: DBQuote[]
    shareQuotes: AdminQuote[]
}

type DBQuote = {
    quoteBody: string,
    id: number
}

type AdminQuote = {
    quoteBody: string
    id: number
    share: boolean
    approvedForAll: boolean
}

export default class QuoteDBSearch extends React.Component<QSProps, QSState> {
    constructor(props: QSProps){
        super(props)
        this.state = {
            foundQuotes: [],
            shareQuotes: []
        }
    }

    searchAllQuotes = async () => {
        const allQuotesErr = 'This search cannot be performed at this time';
        const searchDBURL = 'http://localhost:3000/quote/';
        try {
            const res = await fetch (searchDBURL, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.userToken}`
                })
            })
            const dbquotes = await res.json();
            this.setState({foundQuotes: dbquotes})
        } catch (err) {
            alert(`${allQuotesErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    searchShareableQuotes = async () => {
        const ShareQErr = 'This search cannot be performed at this time';
        const shareSearch = 'http://localhost:3000/quote/share';
        try {
            const res = await fetch (shareSearch, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.userToken}`
                })
            })
            const shdbquotes = await res.json();
            this.setState({shareQuotes: shdbquotes})
        } catch (err) {
            alert(`${ShareQErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    componentDidMount(){
        if (this.props.isAdmin === 'true'){
            this.searchShareableQuotes()
        } else {
            this.searchAllQuotes()
        }
    }

    allQuoteMapper = (): JSX.Element[] => {
        return this.state.foundQuotes.map((quote: DBQuote, index: number) => {
            return(
                <tbody>
                    <tr key={index}>
                        <td>{quote.quoteBody}</td>
                    </tr>
                </tbody>
            )
        })
    }

    shareQuoteMapper = (): JSX.Element[] => {
        return this.state.shareQuotes.map((quote: AdminQuote, index: number) => {
            return(
                <tbody>
                    <tr key={index}>
                        <td>{quote.id}</td>
                        <td>{quote.quoteBody}</td>
                        <td><input type='checkbox' checked={quote.share} /></td>
                        <td><input type='checkbox' checked={quote.approvedForAll} /></td>
                    </tr>
                </tbody>
            )
        })
    }

    render() {
        return(
            this.props.isAdmin === 'true' ?
            <div>
            <h1>Quotes to be approved:</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Quote Id</th>
                        <th>Quote</th>
                        <th>Share</th>
                        <th>Allow?</th>
                    </tr>
                </thead>
                {this.shareQuoteMapper()}
            </Table>
            </div> :
            <div>
            <h1>Other quotes for you:</h1>
            <Table>
                {this.allQuoteMapper()}
            </Table>
            </div>
        )
    }
}