import React from 'react';
import { Table } from 'reactstrap';
import QuoteUpdater from './UpdateQuotes';

type QHProps = {
    userToken: string
}

type QHState = {
    myQuotes: Quote[],
    updateActive: boolean,
    quoteToUpdate: {}
}

type Quote = {
    quoteBody: string,
    id: number
}

export default class QuoteHome extends React.Component<QHProps, QHState> {
    constructor(props: QHProps){
        super(props)
        this.state = {
            myQuotes: [],
            updateActive: false,
            quoteToUpdate: {}
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
        const confirm = prompt("Are you sure you want to delete this quote?", "Yes")
        if (confirm){
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
    }

    editUpdateQuote = (quote: {}) => {
        this.setState({quoteToUpdate: quote})
    };

    updateOn = () => {
        this.setState({updateActive: true})
    };

    updateOff = () => {
        this.setState({updateActive: false})
    };

    quoteMapper = (): JSX.Element[] => {
        return this.state.myQuotes.map((quote: Quote, index: number) => {
            return(
                    <tbody>
                        <tr key={index}>
                            <td>{quote.quoteBody}</td>
                            <td><button value={quote.id} onClick={() => {this.editUpdateQuote(quote.id)}} >Update</button></td>
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
                <h1>Quotes I've added:</h1>
                <Table>
                {this.quoteMapper()}
                </Table>
                {this.state.updateActive ? <QuoteUpdater toBeUpdated={this.state.quoteToUpdate} updateOff={this.updateOff} token={this.props.userToken} viewMyQuotes={this.viewMyQuotes} /> : <></>}
                </div>
            </div>
        )
    }
}