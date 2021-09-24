import React from 'react';
import { Table } from 'reactstrap';

type JHProps = {
    userToken: string
}

type JHState = {
    myJournals: Journal[]
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
            myJournals: []
        }
    }

    viewMyJournals = async () => {
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
            console.log(this.state.myJournals)
        } catch (err) {
            console.log(err)
        }
    }

componentDidMount() {
    this.viewMyJournals()
}

deleteJournal = async (journal: any) => {
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
        console.log(err)
    }
}

    journalMapper = (): JSX.Element[] => {
        return this.state.myJournals.map((journal: Journal, index: number) => {
            return(
                    <tbody>
                        <tr key={index}>
                            <td>{journal.journalName}</td>&nbsp;
                            <td>{journal.journalBody}</td>&nbsp;
                            <td><button value={journal.id}>Update</button></td>&nbsp;
                            <td><button onClick={() => {this.deleteJournal(journal)}}>Delete</button></td>
                        </tr>
                    </tbody>
            )
        })
    }

    render() {
        return(
            <div>
                <div>
                    <h1><button style={{fontSize: "xx-large"}}>&#x1F4D6; Add a Journal Entry &#x1F4D6;</button></h1>
                </div>
                <div>
                    <h1>My Journals:</h1>
                    <Table>
                    {this.journalMapper()}
                    </Table>
                </div>
            </div>
        )
    }
}