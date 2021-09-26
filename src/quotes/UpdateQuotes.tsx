import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
} from 'reactstrap';

type QUProps = {
    toBeUpdated(quote: {}): void,

}

type QUState = {
    quoteBody: string

}

export default class QuoteUpdater extends React.Component<QUProps, QUState> {
    constructor(props: QUProps){
        super(props)
        this.state = {
            quoteBody: this.props.quoteBody
        }
    }


    render() {
        return(
            <>
            <p>You can update your quotes!</p>
            </>
        )
    }
}