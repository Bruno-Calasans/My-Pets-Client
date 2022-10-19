
import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;
    margin-right: auto;

    width: 80%;
    padding: 10px 0px;

    .pageName {
        width: 100%;
        text-align: center;
        font-size: 2rem;
        font-weight: bold;
        margin: 10px 0;
        color: var(--primaryColor);
    }

    .pageSubTitle {
        width: 100%;
        font-size:1rem;
        font-weight: bold;
        margin: 10px 0;
        color: var(--primaryColor);
    }

    @media (min-width: 1100px) {
        width: 1100px;
    }

`
