import React from 'react';
import { Table } from 'reactstrap';
import {
    TD,
    TH,
    MyH1
} from '../styles/style';
import APIURL from '../helpers/environment';

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
        const searchDBURL = `${APIURL}quote/`;
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
        const shareSearch = `${APIURL}quote/share`;
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
                        <TD>{quote.quoteBody}</TD>
                    </tr>
                </tbody>
            )
        })
    }

    shareQuoteMapper = (): JSX.Element[] => {
        return this.state.shareQuotes.map((quote: AdminQuote) => {
            return(
                <tbody>
                    <tr key={quote.id}>
                        <TD>{quote.id}</TD>
                        <TD>{quote.quoteBody}</TD>
                        <TD><input type='checkbox' defaultChecked={quote.share} /></TD>
                        <TD><input type='checkbox' style={{backgroundColor: 'mintcream'}} /></TD>
                    </tr>
                </tbody>
            )
        })
    }

    render() {
        return(
            this.props.isAdmin === 'true' ?
            <div>
            <MyH1>Quotes to be approved:</MyH1>
            <Table>
                <thead>
                    <tr>
                        <TH>Quote Id</TH>
                        <TH>Quote</TH>
                        <TH>Share</TH>
                        <TH>Allow?</TH>
                    </tr>
                </thead>
                {this.shareQuoteMapper()}
            </Table>
            </div> :
            <div>
            <MyH1>Other quotes for you:</MyH1>
            <Table>
                {this.allQuoteMapper()}
            </Table>
            </div>
        )
    }
}