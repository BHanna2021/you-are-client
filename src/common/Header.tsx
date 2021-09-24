import React from 'react';
// import {
//     Carousel,
//     CarouselItem,
//     CarouselControl,
//     CarouselIndicators,
//     CarouselCaption
// } from 'reactstrap';

type HeaderState = {
    activeIndex: number,
    animating: boolean,
    words: string[]
}

// type Word = {
//     word: string
// }

export default class Header extends React.Component<{}, HeaderState> {
    constructor(props: {}){
        super(props)
        this.state = {
            activeIndex: 0,
            animating: false,
            words: [
                'amazing',
                'worthy',
            'exceptional',
            'loved',
            'incredible',
            'unique',
            'strong',
            'marvelous',
            'awesome',
            'capable',
            'incredible',
            'rare',
            'fascinating',
            'memorable',
            'wonderful',
            'extraordinary',
            'tenacious',
            'YOU'
            ]
        }
    }

    // words = [
    //     'amazing',
    //     'worthy',
    //     'exceptional',
    //     'loved',
    //     'incredible',
    //     'unique',
    //     'strong',
    //     'marvelous',
    //     'awesome',
    //     'capable',
    //     'incredible',
    //     'rare',
    //     'fascinating',
    //     'memorable',
    //     'wonderful',
    //     'extraordinary',
    //     'tenacious',
    //     'YOU'
    // ]

//     slides() {
//         return <>{
//         this.state.words.map(word => 
//             <CarouselItem
//             onExiting={() => this.setState({animating: true})}
//             onExited={() => this.setState({animating: false})}>
//                 <CarouselCaption captionText={word} />
//             </CarouselItem>
//         )
//     } 
//     </>
// }


    render(){
        return(
            <div>
                <h1>You are...incredible</h1>
            </div>
        )
    }
}

// render(){
//     return(
//         <div className={"youAreCaro"}>
//             <h1>You are...
//                 <div className={"carousel slide"} data-ride={"carousel"}>
//                     <div className={"carousel-inner"}>
//                         <div className={"carousel-item active"} data-interval={"3500"}>amazing</div>
//                             {this.state.words.map((word) => {
//                                 return(
//                                     <div className={"carousel-item"} data-interval={"3500"}>{word}</div>
//                                 )
//                             })}
//                     </div>
//                 </div>
//             </h1>
//         </div>
//     )
// }