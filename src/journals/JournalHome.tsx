import React from 'react';

type JHProps = {
    userToken: string
}

export default class JournalHome extends React.Component<JHProps, {}> {


    render() {
        return(
            <div>
                <p>View my journal entries.</p>
                
            </div>
        )
    }
}