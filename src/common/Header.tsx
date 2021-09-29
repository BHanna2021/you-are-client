import React from "react";
import {
    HeadStyle
} from '../styles/style';

type HeaderState = {
    activeIndex: number;
    animating: boolean;
    words: string[];
    anchorEl: Element | ((element: Element) => Element) | null | undefined
};

export default class Header extends React.Component<{}, HeaderState> {
    constructor(props: {}) {
    super(props);
    this.state = {
        activeIndex: 0,
        animating: false,
        words: [
            "amazing",
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
        anchorEl: null
    };
    }

    render(){
        return(
            <HeadStyle>
                <h1>You are...strong</h1>
            </HeadStyle>
        )
    }
}