import React from 'react';

type QSProps = {
    userToken: string
}

export default class QuoteDBSearch extends React.Component<QSProps, {}> {

    componentDidMount() {
        console.info("QuoteSearch")
    }

    render() {
        return(
            <>
            <p>You can search the db for quotes!</p>
            </>
        )
    }
}