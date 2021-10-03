import React from 'react';
import {
    TD,
    SmallButton,
    SmallReverseButton,
    MyH1
} from '../styles/style';
import { Table } from 'reactstrap';
import APIURL from '../helpers/environment';

type UserAdminProps = {
    creatorToken: string,
    isAdmin: string,
    apiErr: string
}

type UserAdminState = {
    memberList: Member[]
}

type Member = {
    id: number,
    email: string,
    password: string,
    firstName: string,
    phoneNumber: string | null,
    isAdmin: boolean
}

export default class UserAdmin extends React.Component<UserAdminProps, UserAdminState> {
    constructor(props: UserAdminProps){
        super(props)
        this.state = {
            memberList: []
        }
    }

    viewAllMembers = async () => {
        const queryAllMemErr = 'The database cannot be queried at this time';
        const apiURL = `${APIURL}member/all`;
        try {
            const res = await fetch (apiURL, {
                method: 'GET',
                headers: new Headers ({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.creatorToken}`
                })
            })
            const memRes = await res.json();
            this.setState({memberList: memRes})
        } catch (err) {
            alert(`${queryAllMemErr}${this.props.apiErr}`)
            console.log(err)
        }
    }

    deleteMember = async (member: any) => {
        const confirm = prompt(`Are you sure you want to delete member ${member.email}`, "Yes");
        if (confirm) {
            const deleteMemErr = 'This member cannot be deleted at this time';
            const apiURL = `${APIURL}member/${member.id}`;
            try {
                const res = await fetch (apiURL, {
                    method: 'DELETE',
                    headers: new Headers ({
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.props.creatorToken}`
                    })
                })
                const delRes = await res.json();
                alert('Member has been deleted')
                this.viewAllMembers()
            } catch (err) {
                alert(`${deleteMemErr}${this.props.apiErr}`)
                console.log(err)
            }
        }
    }

    memberMapper = (): JSX.Element[] => {
        return this.state.memberList.map((member: Member) => {
            return(
                    <tbody>
                        <tr key={member.id}>
                            <TD>{member.email}</TD>
                            <TD>{member.firstName}</TD>
                            <TD>{member.phoneNumber}</TD>
                            <TD>{member.isAdmin}</TD>
                            {/* <TD><SmallButton onClick={e => {
                                e.preventDefault()
                                // this.editUpdateQuote(member)
                                // this.updateOn()
                            }} >Update</SmallButton></TD> */}
                            <TD><SmallReverseButton onClick={() => {this.deleteMember(member)}}>Delete</SmallReverseButton></TD>
                        </tr>
                    </tbody>
            )
        })
    }

    componentDidMount() {
        this.viewAllMembers()
    }

    render() {
        return(
            <div>
                <div>
                    <MyH1>All Members of You Are...</MyH1>
                    <Table>
                    {this.memberMapper()}
                    </Table>
                </div>
            </div>
        )
    }
}