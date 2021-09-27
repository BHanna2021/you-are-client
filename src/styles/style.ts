import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: top;
    color: papayawhip;
    background-color: #01579B;
    // border: 1px solid red;
    height: 86vh;
`

export const Form = styled.form`
    display: block;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    color: papayawhip;
    background-color: #01579B;
    // border: 1px solid pink;
    width: 75%;
    height: 75vh;
    padding: 1%;
`

export const Button = styled.button`
    border-radius: 5px;
    color: #4527A0;
    border: 2px solid #4527A0;
    background-color: antiquewhite;
    margin: 1em 2em;
    padding: 0.25em 1em;
`

export const ReverseButton = styled.button`
    border-radius: 5px;
    color: antiquewhite;
    border: 2px solid antiquewhite;
    background-color: indigo;
    margin: 1em 2em;
    padding: 0.25em 1em;
`

export const BasicButton = styled.button`
    border-radius: 5px;
    color: indigo;
    border: 2px solid indigo;
    background-color: papayawhip;
    padding: 0.25em 1em;
    margin-left: 1%;
    width: 12em;
    font-size: large
`

export const BasicReverseButton = styled.button`
    border-radius: 5px;
    color: antiquewhite;
    border: 2px solid antiquewhite;
    background-color: indigo;
    margin-left: 1%;
    padding: 0.25em 1em;
`

export const CreateButton = styled.button`
    border-radius: 5px;
    color: indigo;
    border: 2px solid indigo;
    background-color: papayawhip;
    margin-left: 2%;
    margin-bottom: 2%;
    padding: 0.25em 1em;
    font-size: x-large;
`

export const SmallButton = styled.button`
    border-radius: 5px;
    color: indigo;
    background-color: papayawhip;
    border: 2px solid papayawhip;
`

export const SmallReverseButton = styled.button`
    border-radius: 5px;
    color: papayawhip;
    background-color: indigo;
    border: 1px solid indigo;
`

export const Input = styled.input`
    background-color: antiquewhite;
    width: 15em;
`

export const FormInput = styled.input`
    background-color: mintcream;
    width: 19em;
`

export const Label = styled.label`
    color: mintcream;
    font-size: large;
    margin-left: 2%;
`

export const AuthHeader = styled.div`
    display: block;
    justify-content: space-evenly;
    color: papayawhip;
    text-align: center;
    // border: 1px solid red;
    background-color: indigo;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: -1%
`

export const SideStyle = styled.div`
    display: flex;
    background-color: #01579B;
    color: antiquewhite;
    // border: 1px solid antiquewhite;
    justify-item: left;
    width: 100%;
    min-height: 75vh;
    padding-top: 3%;
    padding-left: 1%;
    position: relative;
`

export const HeadStyle = styled.div`
    display: flex;
    background-color: indigo;
    color: antiquewhite;
    // border: 1px solid white;
    justify-content: space-evenly;
    width: 100%;

`

export const FootStyle = styled.div`
    display: flex;
    background-color: #424242;
    color: antiquewhite;
    // border: 1px solid black;
    justify-content: space-evenly;
    width: 100%;
    height: 20vh;
    position: relative;
`

export const TD = styled.td`
    color: mintcream;
`

export const TH = styled.td`
    color: mintcream;
`