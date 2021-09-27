import React from 'react';
import { Table } from 'reactstrap';

type QSProps = {
    userToken: string
    apiErr: string
}

type QSState = {
    foundQuotes: DBQuote[]
}

type DBQuote = {
    quoteBody: string,
    id: number
}

export default class QuoteDBSearch extends React.Component<QSProps, QSState> {
    constructor(props: QSProps){
        super(props)
        this.state = {
            foundQuotes: []
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

    componentDidMount(){
        this.searchAllQuotes()
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

    render() {
        return(
            <div>
            <h1>Other quotes for you:</h1>
            <Table>
                {this.allQuoteMapper()}
            </Table>
            </div>
        )
    }
}