import React from "react";
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
} from "reactstrap";

type HeaderState = {
    activeIndex: number;
    animating: boolean;
    words: string[];
};

// type CarouselProps = {
//     children: Element,
//     activeIndex: number
// }

// type Word = {
//     word: string
// }

export default class Header extends React.Component<{}, HeaderState> {
    constructor(props: {}) {
    super(props);
    this.state = {
        activeIndex: 0,
        animating: false,
        words: [
        "worthy",
        "exceptional",
        "loved",
        "incredible",
        "unique",
        "strong",
        "marvelous",
        "awesome",
        "capable",
        "incredible",
        "rare",
        "fascinating",
        "memorable",
        "wonderful",
        "extraordinary",
        "tenacious",
        "YOU",
        ],
    };
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

    slides = (): JSX.Element[] => {
        return this.state.words.map((word) => {
            return(
                <CarouselItem
                    onExiting={() => this.setState({ animating: true })}
                    onExited={() => this.setState({ animating: false })}
                >
                    <CarouselCaption captionText={word} />
                </CarouselItem>
            )
        })
    }

    render(){
        return(
            <div>
                <h1>You are...incredible</h1>
            </div>
        )
    }

    // render() {
    //     return (
    //         <div>
    //             <h1>You are...
    //                 <Carousel
    //                 activeIndex={this.state.activeIndex}>
    //                     <CarouselIndicators words={this.state.words} activeIndex={this.state.activeIndex} />
    //                     {this.slides}
    //                 </Carousel>
    //             </h1>
    //         </div>
    //     );
    // }
}
