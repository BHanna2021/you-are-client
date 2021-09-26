import React from 'react';

type QSProps = {
    userToken: string
}

export default class QuoteDBSearch extends React.Component<QSProps, {}> {

    render() {
        return(
            <>
            <p>You can search the db for quotes!</p>
            </>
        )
    }
}