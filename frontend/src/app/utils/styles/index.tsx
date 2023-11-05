import styled from 'styled-components'
import { InputContainerProps, PageProps } from './styleTypes';

export const InputField = styled.input`
    background-color: #1e1b34;
    border: none;
    color : #fff;
    font-family: 'Inter';
    font-size: 18px;
    width: 100%;
    margin : 4px 0;

`;



export const Body = styled.body`
    margin: 0;
    padding: 0;
    background-color: var(--dark-purple-color);
    background-image: url("/assets/background.svg");
    background-repeat: no-repeat;
    background-size: cover;
    overflow-x: hidden;
`;

export const InputContainer = styled.div<InputContainerProps>`
    background-color: ${(prop) => prop.backgroundColor || '#1e1b34'};
    padding: 12px 16px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;

`;

export const InputLabel = styled.label`
    display: block;
    color: 	#808080;
    font-size : 14px;
    margin: 4px 0;

`;

export const Button = styled.button`
    width: 100%;
    background-color: #fc7785;
    color: #1e1b3;
    border: none;
    outline: none;
    font-family: 'Inter'
    font-size: 12px;
    border-radius: 10px;
    padding: 10px 0;
    font-weight: 500;
    transition: 250ms background-color ease;
    &:focus{
        background-color: #972f39;
        border: 2px solid #fff;
    }
    &:hover {
        cursor: pointer;
        background-color: #972f39;
        border: 2px solid #fff;
    }
    &:active {
        background-color: #498cda;
    }

`;
export const Page = styled.div<PageProps>`
   
    height: 100%;
    display: ${(props) => props.display};
    justify-content: ${(props) => props.alignItems}
`;


export const Conversation = styled.aside`
    position: absolute;
    top:0;
    left:0;
    width: 350px;
    height: 100%;
    border-right: 3px solid #1e1b34;
    overflow-y: scroll;

    & header{
        background-color:#1e1b34;
        height: 80px;
        color : #fff;
        & h1 {
            font-weight: 500;
        }
        align-items : center;
        justify-content: space-between;
        border-bottom: 3px solid #498cda;
        padding : 0 57px;
        
    }
    &::-webkit-scrollbar{
       
       display: none;
    }
   
    
  
`;

export const ConversationChannelStyle = styled.div`
    position: absolute;
    top:0;
    margin-left: 350px;
    width: 100%;
    height: 100%;
    align-items: center;
    overflow-y: scroll;

    background-color: #1d1a33;

    
`;

export const ConversationPannelStyle = styled.div`
    position: absolute;
    top:0;
    margin-left: 350px;
    width: 100%;
    height: 100%;
    align-items: center;
    overflow-y: scroll;

    background-color: #1d1a33;

`;

export const ConversationSideBarContainer = styled.div `
    padding: 40px;
`;

export const ConversationSideBarItem = styled.div `
    padding: 9px 2px;
    display: flex;
    align-items: center;
    height: 100%;
    gap: 20px;
    border-bottom: 1px solid #1e1b34;
    box-sizing: border-box;


`;

export const ModalContentBodyStyle = styled.div `

        padding: 18px;


`;

export const OverlayStyle = styled.div `

    height: 100%;
    width: 100%;
    background-color : #0000008a;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;

`;



export const ModalHeadersStyle = styled.header`
    width: 100%;
    background-color:#423f5a;
    padding: 10px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & h2 {
        font-weight:500;
        margin: 0;
        margin-top:23px; 
        
    }
`;

export const ModalContainerStyle = styled.div `

    background-color: #121212;
    width: 650px;
    box-sizing: border-box;
    border-radius: 10px;
`;


export const TextField = styled.textarea`
    
    background-color: #1e1b34;
    border: none;
    color : #fff;
    font-family: 'Inter';
    font-size: 18px;
    width: 100%;
    margin : 4px 0;
`;

export const MessagePanelStyle = styled.div `

    background : inherit;
    height : 100%;
    box-sizing : border-box;
    position : relative;
    display: flex;
    width: 100%;
    justify-content: ;
`;
export const MessagePannelBody = styled.div `

    height: 100%;
    display : flex;
    flex-direction : column;
    padding : 32px;
    box-sizing : border-box;
`

export const MessagePannelHeaderStyle = styled.header `
    backgound-color: #fff;
    border-buttom: 1px solid #5454543d;
    border-left : 1px solid #5454543d;
    heigt: 100px;
    display: flex;
    justify-content : space-between;
    align-items: center;
    padding : 0 32px;
    box-sizing : border-box;
    position : absolute;
    top: 0;
    left: 0;
    width: 100%;
`

export const MessageContainerStyle = styled.div `
    height: 100%;
    box-sizing : border-box;
    color: #fff;
    display : flex;
    flex-direction : column-reverse;
    overflow-y : scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const MessageInputFieldContainer = styled.div `
    box-sizing : border-box;
    margin: 12px;
    background-color : #292547;
    border-radius : 5px;
`;

export const MessageInput = styled.input `
    background-color: inherit;
    outline : none;
    border: none;
    color : #fff;
    font-family : 'Inter';
    font-size: 18px;
    box-sizing: border-box;
    width : 100%;
    padding :9px;
    margin : 4px 0;
    resize : none;

  
`;

export const MessageItemContainer = styled.div `
        display : flex;
        gap : 20px;
        align-items: center;
        padding : 8px;
`;


export const MessageItemAvatar = styled.div`
    width : 50px;
    height : 50px;
    background-color : #fff;
    border-radius : 50%;
`;


export const MessageItemDetails = styled.div `

`;

export const MessageItemHeader = styled.div `
    display: flex;
    align-items : center;
    gap : 12px;
    .time{
        color : #6d6d6d;
        font-size : 12px;
        font-weight : bold;
    }
    .senderName {
        font-weight : 600;
        dont-size : 14px;
        font-weight : bold;
    }
`;

export const  MessageItemContent = styled.div `
      
`;

export const Dark = '#131313'