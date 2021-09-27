import React from 'react';
import {
    Route,
    Link,
    Switch,
} from 'react-router-dom';
import Home from './Home';
import QuoteDBSearch from '../quotes/QuoteSearch';
import QuoteHome from '../quotes/QuoteHome';
import JournalHome from '../journals/JournalHome';
import QuoteCreator from '../quotes/CreateQuotes';
import JournalCreator from '../journals/CreateJournal';

type SidebarProps = {
    currentToken: string,
    clickLogout(): void,
    isAdmin: string
}


export default class Sidebar extends React.Component<SidebarProps, {}> {


    render(){
        return(
            <div>
                <div>
                    <Link to="/" ><h4><button style={{fontSize: "large"}}>&#x1F3E1; Home</button></h4></Link>
                    <Link to="/myjournal" ><h4><button style={{fontSize: "large"}}>&#x1F4D3; My Journal</button></h4></Link>
                    <Link to ="/createjournal"><h4><button style={{fontSize: "large"}}>&#x1F4D6; Add a Journal</button></h4></Link>
                    <Link to="/myquotes" ><h4><button style={{fontSize: "large"}}>&#x1F4DC; My Quotes</button></h4></Link>
                    <Link to="/createquote"><h4><button style={{fontSize: "large"}}>&#x1F49F; Add a Quote</button></h4></Link>
                    <Link to="/quotesearch" ><h4><button style={{fontSize: "large"}}>&#x1F50E; Search Quotes</button></h4></Link>
                    <h4><button style={{fontSize: "large"}} onClick={() => this.props.clickLogout()}>&#x1F6AA; Logout</button></h4>
                </div>
                <div className='sidebar-route'>
                    <Switch>
                        <Route exact path="/"><Home /></Route>
                        <Route exact path="/myjournal"><JournalHome userToken={this.props.currentToken} /></Route>
                        <Route exact path="/myquotes"><QuoteHome userToken={this.props.currentToken} isAdmin={this.props.isAdmin} /></Route>
                        <Route exact path="/quotesearch"><QuoteDBSearch userToken={this.props.currentToken} /></Route>
                        <Route path="/createquote"><QuoteCreator creatorToken={this.props.currentToken} isAdmin={this.props.isAdmin} /></Route>
                        <Route path="/createjournal"><JournalCreator creatorToken={this.props.currentToken} /></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}