import React from "react";
import {
    HeadStyle
} from '../styles/style';

type HeaderState = {
    words: string[];
    displayWord: string
};

export default class Header extends React.Component<{}, HeaderState> {
    constructor(props: {}) {
    super(props);
    this.state = {
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
        displayWord: ''
    };
    }

    randomWord = () => {
        const newWord = Math.floor((Math.random() * this.state.words.length-1) + 1);
        this.setState({ displayWord: this.state.words[newWord] })
    }

    componentDidMount() {
        this.randomWord()
    }

    render(){
        return(
            <HeadStyle>
                <h1>You are...{this.state.displayWord}</h1>
            </HeadStyle>
        )
    }
}