import React from 'react';
import {
    Route,
    Link,
    Switch,
} from 'react-router-dom';
import QuoteDBSearch from '../quotes/QuoteSearch';
import QuoteHome from '../quotes/QuoteHome';
import JournalHome from '../journals/JournalHome';
import QuoteCreator from '../quotes/CreateQuotes';
import JournalCreator from '../journals/CreateJournal';
import UserAdmin from '../member/Admin';
import {
    BasicButton
} from '../styles/style';

type SidebarProps = {
    currentToken: string,
    clickLogout(): void,
    isAdmin: string
    apiErr: string
}


export default class Sidebar extends React.Component<SidebarProps, {}> {

    render(){
        return(
        this.props.isAdmin === 'true' ?
            <div>
                <div>
                    <Link to="/myjournal" ><h4 style={{justifySelf: 'center'}}><BasicButton>&#x1F4D3;&nbsp; My Journal &nbsp;&#x1F4D3;</BasicButton></h4></Link>
                    <Link to ="/createjournal"><h4><BasicButton>&#x1F4D6;&nbsp; Add a Journal &nbsp;&#x1F4D6;</BasicButton></h4></Link>
                    <Link to="/myquotes" ><h4><BasicButton>&#x1F4DC;&nbsp; My Quotes &nbsp;&#x1F4DC;</BasicButton></h4></Link>
                    <Link to="/createquote"><h4><BasicButton>&#x1F49F;&nbsp; Add a Quote &nbsp;&#x1F49F;</BasicButton></h4></Link>
                    <Link to="/quotesearch" ><h4><BasicButton>&#x1F50E;&nbsp; Search Quotes &nbsp;&#x1F50D;</BasicButton></h4></Link>
                    <Link to="/useradmin" ><h4><BasicButton>&#x1F30C;&nbsp; User Admin &nbsp;&#x1F30C;</BasicButton></h4></Link>
                    <h4><BasicButton style={{fontSize: "large"}} onClick={() => this.props.clickLogout()}>&#x1F6AA;&nbsp; Logout &nbsp;&#x1F6AA;</BasicButton></h4>
                </div>
                <div className='sidebar-route'>
                    <Switch>
                        <Route exact path="/myjournal"><JournalHome userToken={this.props.currentToken} apiErr={this.props.apiErr} /></Route>
                        <Route exact path="/myquotes"><QuoteHome userToken={this.props.currentToken} isAdmin={this.props.isAdmin} apiErr={this.props.apiErr} /></Route>
                        <Route exact path="/quotesearch"><QuoteDBSearch userToken={this.props.currentToken} apiErr={this.props.apiErr} isAdmin={this.props.isAdmin} /></Route>
                        <Route exact path="/createquote"><QuoteCreator creatorToken={this.props.currentToken} isAdmin={this.props.isAdmin} apiErr={this.props.apiErr} /></Route>
                        <Route exact path="/createjournal"><JournalCreator creatorToken={this.props.currentToken} apiErr={this.props.apiErr} /></Route>
                        <Route exact path="/useradmin"><UserAdmin creatorToken={this.props.currentToken} isAdmin={this.props.isAdmin} apiErr={this.props.apiErr} /></Route>
                    </Switch>
                </div>
            </div>
        :
            <div>
                <div>
                    <Link to="/myjournal" ><h4 style={{justifySelf: 'center'}}><BasicButton>&#x1F4D3;&nbsp; My Journal &nbsp;&#x1F4D3;</BasicButton></h4></Link>
                    <Link to ="/createjournal"><h4><BasicButton>&#x1F4D6;&nbsp; Add a Journal &nbsp;&#x1F4D6;</BasicButton></h4></Link>
                    <Link to="/myquotes" ><h4><BasicButton>&#x1F4DC;&nbsp; My Quotes &nbsp;&#x1F4DC;</BasicButton></h4></Link>
                    <Link to="/createquote"><h4><BasicButton>&#x1F49F;&nbsp; Add a Quote &nbsp;&#x1F49F;</BasicButton></h4></Link>
                    <Link to="/quotesearch" ><h4><BasicButton>&#x1F50E;&nbsp; Search Quotes &nbsp;&#x1F50D;</BasicButton></h4></Link>
                    <h4><BasicButton style={{fontSize: "large"}} onClick={() => this.props.clickLogout()}>&#x1F6AA;&nbsp; Logout &nbsp;&#x1F6AA;</BasicButton></h4>
                </div>
                <div className='sidebar-route'>
                    <Switch>
                        <Route exact path="/myjournal"><JournalHome userToken={this.props.currentToken} apiErr={this.props.apiErr} /></Route>
                        <Route exact path="/myquotes"><QuoteHome userToken={this.props.currentToken} isAdmin={this.props.isAdmin} apiErr={this.props.apiErr} /></Route>
                        <Route exact path="/quotesearch"><QuoteDBSearch userToken={this.props.currentToken} apiErr={this.props.apiErr} isAdmin={this.props.isAdmin} /></Route>
                        <Route path="/createquote"><QuoteCreator creatorToken={this.props.currentToken} isAdmin={this.props.isAdmin} apiErr={this.props.apiErr} /></Route>
                        <Route path="/createjournal"><JournalCreator creatorToken={this.props.currentToken} apiErr={this.props.apiErr} /></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}