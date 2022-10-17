
import styled from "styled-components";

export const Container = styled.form`
    display: flex;
    flex-direction: column;

    width: 300px;

    & div {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    button {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    a {
        align-self: center;
    }

    a:hover {
        color: var(--primaryColor);
    }

`
