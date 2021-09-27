import React from 'react';
import { Table } from 'reactstrap';
import UpdateJournal from './UpdateJournal';
import {
    TD,
    SmallButton,
    SmallReverseButton
} from '../styles/style';

type JHProps = {
    userToken: string
    apiErr: string
}

type JHState = {
    myJournals: Journal[]
    jToBeUpdated: Journal
    jUpdateActive: boolean
}

type Journal = {
    journalBody: string,
    journalName: string,
    id: number
}

export default class JournalHome extends React.Component<JHProps, JHState> {
    constructor(props: JHProps){
        super(props)
        this.state = {
            myJournals: [],
            jToBeUpdated: {
                journalBody: '',
                journalName: '',
                id: 0
            },
            jUpdateActive: false
        }
    }

    viewMyJournals = async () => {
        const myJournalErr = 'The search for your journals has failed'
        const apiURL = 'http://localhost:3000/journal/';
        try {
            const res = await fetch (apiURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.userToken}`
                }
            })
            const mjjson = await res.json();
            this.setState({myJournals: mjjson})
        } catch (err) {
            alert(`${myJournalErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

componentDidMount() {
    this.viewMyJournals()
}

deleteJournal = async (journal: any) => {
    const confirm = prompt("Are you sure you want to delete this journal?", "Yes")
    if (confirm) {
        const deleteJErr = 'This journal could not be deleted';
        const deleteURL = `http://localhost:3000/journal/${journal.id}`
        try {
            const byeJournal = await fetch (deleteURL, {
                method: "DELETE",
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.userToken}`
                })
            })
            console.log(byeJournal)
            this.viewMyJournals()
        } catch (err) {
            alert(`${deleteJErr}${this.props.apiErr}`)
            console.log(err)
        }
    }
}

    editUpdateJournal = (editJournal: any) => {
        this.setState({ jToBeUpdated: {journalBody: editJournal.journalBody, journalName: editJournal.journalName, id: editJournal.id} })
    };

    jUpdateOn = (): void => {
        this.setState({ jUpdateActive: true })
    };

    jUpdateOff = (): void => {
        this.setState({ jUpdateActive: false })
    };

    journalMapper = (): JSX.Element[] => {
        return this.state.myJournals.map((journal: Journal, index: number) => {
            return(
                    <tbody>
                        <tr key={index}>
                            <TD>{journal.journalName}</TD>
                            <TD>{journal.journalBody}</TD>
                            <TD><SmallButton onClick={e => {
                                e.preventDefault()
                                this.editUpdateJournal(journal)
                                this.jUpdateOn()
                            }}>Update</SmallButton></TD>
                            <TD><SmallReverseButton onClick={() => {this.deleteJournal(journal)}}>Delete</SmallReverseButton></TD>
                        </tr>
                    </tbody>
            )
        })
    }

    render() {
        return(
            <div>
                <div>
                    <h1>My Journal Entries:</h1>
                    <Table>
                    {this.journalMapper()}
                    </Table>
                    {this.state.jUpdateActive ? <UpdateJournal apiErr={this.props.apiErr} jToBeUpdated={this.state.jToBeUpdated} jUpdateOff={this.jUpdateOff} token={this.props.userToken} viewMyJournals={this.viewMyJournals} /> : <></>}
                </div>
            </div>
        )
    }
}