import styled from "styled-components";

export const Container = styled.form`
    display: flex;
    flex-direction: column;

    width: 300px;

    & .avatarArea {
        justify-content: center;
        align-items: center;
    }

    & div {
        margin-top: 10px;
        margin-bottom: 10px;
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