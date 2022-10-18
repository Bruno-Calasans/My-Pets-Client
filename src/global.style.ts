import { createGlobalStyle } from "styled-components";

 const GlobalStyle = createGlobalStyle`
 
    :root {
        --primaryColor: #FA2A08;
        --secondaryColor: #FAC012;
        --gradient1: linear-gradient(to left, var(--primaryColor), var(--secondaryColor));
        --gradient2: linear-gradient(to right, var(--primaryColor), var(--secondaryColor));
        --confirmColor: green;
        --cancelColor: red;
        --editColor: orange;
        --deleteColor: red;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter Tight', sans-serif;
        font-style: normal;
        font-weight: 400;
    }

    a {
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        } 
    }


    body {
        background-color: lightgray;
    }

    #root {
        display: grid;
        grid-template-rows: 100px 1fr 80px;
        height: 100vh;
    }

    .highlight {
        color: var(--primaryColor);
        font-weight: bold;
    }

    .highlight2{
        color: var(--secondaryColor);
        font-weight: bold; 
    }

    .noContentMsg{
        font-size: 1.2em;
        font-weight: bold;
        text-align: center;
        
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .actionBtn{
        opacity: 0.8;
        font-size: 0.6rem;
        margin: 0;

        &:hover{
            opacity: 1;
        }

        &.confirmBtn{
            background-color: var(--confirmColor);
            &:hover{
                background-color: var(--confirmColor);
            }
        }

        &.cancelBtn{
            background-color: var(--cancelColor);

            &:hover{
                background-color: var(--cancelColor);
            }
        }

        &.editBtn{
            background-color: var(--editColor);
            &:hover{
                background-color: var(--editColor);
            }
        }

        &.deleteBtn{
            background-color: var(--deleteColor);
            &:hover{
                background-color: var(--deleteColor);
            }
        }

        &.refundBtn{
            background-color: var(--primaryColor);
            &:hover{
                background-color: var(--primaryColor);
            }
        } 
    }

    .addBtn {
        align-self: flex-start;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .accordion {
        
        color: black;
        width: 100%;

        .accordionHeader{
            padding-left: 0;

        }

        .accordionExpandIcon {
        }

        .accordionTitle {
            color: var(--primaryColor);
            font-weight: bold;
        }

        .accordionDetails {
            font-style: italic;
            font-size: 0.9em;
        }
    }

    .cap{
        text-transform: capitalize;
    }

`;
export default GlobalStyle
