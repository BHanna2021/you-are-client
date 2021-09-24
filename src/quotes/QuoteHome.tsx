import React from 'react';

type QHProps = {
    userToken: string
}

type QHState = {
    myQuotes: Quote[]
}

type Quote = {
    quoteBody: string
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
            console.log(mqjson)
            this.setState({myQuotes: mqjson})
            console.log(this.state.myQuotes)
        } catch (err) {
            console.log(err)
        }
    }

componentDidMount() {
    this.viewMyQuotes()
}

    quoteMapper = (): JSX.Element[] => {
        return this.state.myQuotes.map((quote: Quote) => {
            return(
                <p>{quote.quoteBody}</p>
            )
        })
    }

    render() {
        return(
            <div>
                <p>View my quotes.  Where the fuck is this landing???</p>
                {this.quoteMapper()}
                
            </div>
        )
    }
}