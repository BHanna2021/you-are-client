import React from 'react';
import {
    FootStyle,
    FooterContainer,
    Column,
    Row,
    FooterLink,
    Heading,
    FooterP
} from '../styles/style';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export default class Footer extends React.Component {

    render() {
        return(
            <FootStyle>
            <FooterContainer>
                <Row>
                    <Column>
                        <Heading>Creators</Heading>
                        <FooterLink href="https://www.linkedin.com/in/bethany-hanna-311491208/" target="_blank"><LinkedInIcon /> Bethany Hanna </FooterLink>
                        <FooterLink href="https://github.com/BHanna2021" target="_blank"><GitHubIcon />  BHanna2021 </FooterLink>
                    </Column>
                    <Column>
                        <Heading>Disclaimers</Heading>
                        <FooterP>I am not a medical professional</FooterP>
                        <FooterLink style={{ fontSize: 12 }} href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" > Unless otherwise stated, the content of this page is licensed under Creative Commons Attribution-ShareAlike 3.0 License </FooterLink>
                    </Column>
                    <Column>
                        <Heading>Resources</Heading>
                        <FooterLink href="https://suicidepreventionlifeline.org/" target="_blank"> National Suicide Prevention Lifeline </FooterLink>
                        <FooterLink href="https://www.crisistextline.org/" target="_blank"> Crisis Text Line </FooterLink>
                        <FooterLink href="https://www.veteranscrisisline.net/" target="_blank"> Veterans Crisis Line </FooterLink>
                    </Column>
                    <Column>
                        <Heading>Issues</Heading>
                        <FooterLink href="https://github.com/BHanna2021/you-are-client/issues" target="_blank"><GitHubIcon /> GitHub Repository</FooterLink>
                    </Column>
                </Row>
            </FooterContainer>
            </FootStyle>
        )
    }
}