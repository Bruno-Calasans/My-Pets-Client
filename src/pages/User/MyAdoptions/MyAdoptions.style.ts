import styled from 'styled-components'

export const Container = styled.section`
    display: flex;
    flex-direction: column;

    .card {
        
        width: 700px;
        margin: 5px 0;
        
        .cardArea{
            display: flex;
            flex-direction: row;
    
            margin: 0;
            padding: 5px;
            
            .cardContent {
                flex-grow: 1;
    
                .petName{
                    font-size: 1.4rem;
                    font-weight: bold;
                    color: var(--primaryColor);
                }
            }
    
            .adoptionContact{
                display: flex;
                flex-direction: column;
                flex-grow: 1;
            }
    
            .adoptionStatus{
                font-weight: bold;
                color: darkgreen;
                text-align: center;
                padding: 10px;
            }
        }

        .cardActions{
            padding-top: 0;
            justify-content: flex-end;
        }
    }

    @media (max-width: 600px){

        align-items: center;

        .card{
            width: 350px;

            .cardArea{

                flex-direction: column;
    
                .cardContent{
                    padding: 0;
                    width: 100%;
                    align-items: flex-start;
                }
            }

        }

        .adoptionContact{
            width: 100%;
            align-items: flex-start;
        }

    }

`