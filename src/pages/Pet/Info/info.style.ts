import styled from 'styled-components'

export const Container = styled.section`

    .card {
        max-width: 600px;
        margin-top: 30px;

        .imageList{
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 16px;
        }

        .cardContent {

            .petName{
                font-size: 1.9rem;
                text-align: center;
                text-transform: capitalize;
                font-weight: bold;
                color: var(--primaryColor);
                border-top: 1px solid var(--primaryColor);
                border-bottom: 1px solid var(--primaryColor)
            }
    
            .petInfo{
                display: flex;
                flex-direction: column;
                justify-content: center;
                font-weight: bold;
                color: var(--Color);
            }

            .petDescription{
                font-style: italic;
                margin-top: 5px;
                border-top: 1px solid var(--primaryColor);
            }

        }

        .cardActions{

            display: flex;
            justify-content: left;
            padding: 16px;

            .scheduleAdoptionMsg{
                flex-grow: 1;
                text-align: center;
                font-weight: bold;
                color: green;
            }

            .scheduleAdoptionBtn {
                align-self: center;
            }
        }       

    }

     @media (max-width: 470px){

        .card{

            /* .imageList{
                grid-template-columns: 1fr;
            } */
        }

    }

`

export const Hightlight = styled.span`
    font-weight: bold;

`