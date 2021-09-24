import React from 'react';
import { Table } from 'reactstrap';

type QHProps = {
    userToken: string
}

type QHState = {
    myQuotes: Quote[]
}

type Quote = {
    quoteBody: string,
    id: number
}

export default class QuoteHome extends React.Component<QHProps, QHState> {
    constructor(props: QHProps){
        super(props)
        this.state = {
            myQuotes: []
        }
    }

    viewMyQuotes = async () => {
        const apiURL = 'http://localhost:3000/quote/mine';
        try {
            const res = await fetch (apiURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.userToken}`
                }
            })
            const mqjson = await res.json();
            this.setState({myQuotes: mqjson})
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount() {
        this.viewMyQuotes()
    }

    deleteQuote = async (quote: any) => {
        const deleteURL = `http://localhost:3000/quote/${quote.id}`
        try {
            const byeQuote = await fetch (deleteURL, {
                method: "DELETE",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.userToken}`
                })
            })
            console.log(byeQuote)
            this.viewMyQuotes()
        } catch (err) {
            console.log(err)
        }
    }

    quoteMapper = (): JSX.Element[] => {
        return this.state.myQuotes.map((quote: Quote, index: number) => {
            return(
                    <tbody>
                        <tr key={index}>
                            <td>{quote.quoteBody}</td>
                            <td><button value={quote.id}>Update</button></td>
                            <td><button onClick={() => {this.deleteQuote(quote)}}>Delete</button></td>
                        </tr>
                    </tbody>
            )
        })
    }

    render() {
        return(
            <div>
                <div>
                    <h1><button style={{fontSize: "xx-large"}}>&#x1F49F; Add a Quote &#x1F49F;</button></h1>
                </div>
                <div>
                <h1>Quotes I've added:</h1>
                <Table>
                {this.quoteMapper()}
                </Table>
                </div>
            </div>
        )
    }
}