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

type SidebarProps = {
    currentToken: string,
    clickLogout(): void
}


export default class Sidebar extends React.Component<SidebarProps, {}> {


    render(){
        return(
            <div>
                <div>
                    <ul>
                        <li style={{listStyle: "none"}}><Link to="/" style={{color: 'antiquewhite'}}>Home</Link></li>
                        <li style={{listStyle: "none"}}><Link to="/myjournal" style={{color: 'antiquewhite'}}>My Journal</Link></li>
                        <li style={{listStyle: "none"}}><Link to="/myquotes" style={{color: 'antiquewhite'}}>My Quotes</Link></li>
                        <li style={{listStyle: "none"}}><Link to="/quotesearch" style={{color: 'antiquewhite'}}>Search Quotes</Link></li>
                    </ul>
                    <button onClick={() => this.props.clickLogout()}>Logout</button>
                </div>
                <div className='sidebar-route'>
                    <Switch>
                        <Route exact path="/"><Home /></Route>
                        <Route exact path="/myjournal"><JournalHome userToken={this.props.currentToken} /></Route>
                        <Route exact path="/myquotes"><QuoteHome /></Route>
                        <Route exact path="/quotesearch"><QuoteDBSearch/></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}