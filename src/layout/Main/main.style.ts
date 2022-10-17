
import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
    min-width: 320px;
    /* width: 100%; */
 
    padding: 10px;

    .pageName {
        width: 100%;
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 10px;
        color: var(--primaryColor);
    }

`