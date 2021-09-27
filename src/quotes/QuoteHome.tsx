import React from 'react';
import { Table } from 'reactstrap';
import QuoteUpdater from './UpdateQuotes';

type QHProps = {
    userToken: string,
    isAdmin: string
    apiErr: string
}

type QHState = {
    myQuotes: MyQuote[],
    updateActive: boolean,
    quoteToUpdate: MyQuote
};

type MyQuote = {
    quoteBody: string,
    id: number
}

export default class QuoteHome extends React.Component<QHProps, QHState> {
    constructor(props: QHProps){
        super(props)
        this.state = {
            myQuotes: [],
            updateActive: false,
            quoteToUpdate: {
                quoteBody: '',
                id: 0
            }
        }
    }

    viewMyQuotes = async () => {
        const myQErr = 'Your quotes cannot be viewed at this time';
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
            alert(`${myQErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    componentDidMount() {
        this.viewMyQuotes()
    }

    deleteQuote = async (quote: any) => {
        const confirm = prompt("Are you sure you want to delete this quote?", "Yes")
        if (confirm){
            const deleteQErr = 'This quote cannot be deleted at this time';
            const deleteURL = `http://localhost:3000/quote/${quote.id}`
            try {
                const byeQuote = await fetch (deleteURL, {
                    method: "DELETE",
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.props.userToken}`
                    })
                })
                alert('This quote has now been deleted.')
                this.viewMyQuotes()
            } catch (err) {
                alert(`${deleteQErr}${this.props.apiErr}`)
                console.log(err)
            }
        }
    }

    editUpdateQuote = (editQuote: any) => {
        this.setState({ quoteToUpdate: {quoteBody: editQuote.quoteBody,  id: editQuote.id} })
    };

    updateOn = (): void => {
        this.setState({ updateActive: true })
    };

    updateOff = (): void => {
        this.setState({ updateActive: false })
    };

    quoteMapper = (): JSX.Element[] => {
        return this.state.myQuotes.map((quote: MyQuote, index: number) => {
            return(
                    <tbody>
                        <tr key={index}>
                            <td>{quote.quoteBody}</td>
                            <td><button onClick={e => {
                                e.preventDefault()
                                this.editUpdateQuote(quote)
                                this.updateOn()
                            }} >Update</button></td>
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
                {this.state.updateActive ? <QuoteUpdater apiErr={this.props.apiErr} toBeUpdated={this.state.quoteToUpdate} updateOff={this.updateOff} token={this.props.userToken} viewMyQuotes={this.viewMyQuotes} isAdmin={this.props.isAdmin} /> : <></>}
                </div>
            </div>
        )
    }
}