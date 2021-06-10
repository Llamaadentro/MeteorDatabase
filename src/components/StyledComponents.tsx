import { Button } from 'antd';
import styled from "styled-components";

//App-generic styled components

export const AppStyle = styled.div`
  height: 100vh;
  background: #eeeeee;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none; 
  ::-webkit-scrollbar { 
    display: none;
  }
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const HeaderBar = styled.div`
    text-align: center;
    background: linear-gradient(black, #444444);
    width: 100%;
    height: 55px;
`;

export const WidePageWrapper = styled.div`
    width: 92%;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 10px;
    margin-right: auto;
    margin-left: auto;
    min-width: 700px;
`;

export const TableTextRow = styled.p`
    margin: 0;
    width: 100px;
`; 
  
export const TableNameRow = styled(TableTextRow)`
    width: 180px;
    word-wrap: break-word;
    word-break: break-all;
`;

export const QueryBar = styled.div`
	text-align: center;
	transition: height 0.5s;
    position: relative;
	margin-right: auto;
	margin-left: auto;
	width: 60%;
	height: 90px;
	background: black;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    -webkit-box-shadow: rgba(0,0,0,1) 0px 0 10px;
    -moz-box-shadow: rgba(0,0,0,1) 0 0 10px;
    box-shadow: rgba(0,0,0,1) 0 0 10px;
	margin-top: 10px;
    margin-bottom: 30px;
`;

export const LabelText = styled.span`
	font-size: 27px;
	width: 120px;
    padding-left: 10px;
    margin: 3px; 
	color: #ffcc00;
`;

export const ButtonText = styled.p`
    font-size: 27px;
    font-weight: 500;
    line-height: 23px;
    margin-bottom: 0;
`;

export const SmallButtonText = styled(ButtonText)`
    font-size: 21px;
`;

export const BarInput = styled.input`
    font-size: 27px;
    ${({width}) => `width: ${width}`}; 
    margin: 0;
    padding: 0; 
`;

export const FilterButton = styled(Button)`
    && {
        background: #ffcc00;
        border-color: #ffcc00;    
    }
    &&:hover, &&:focus {
        background-color: yellow;
        border-color: yellow;
        color: black;
    }
    font-size: 23px;
    height: 45px;
    margin: 7px 15px 4px 10px;
`;

export const BottomPlank = styled.div`
    font-size: 21px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    background: black;
    height: 30px;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-radius: 0 0 20px 20px;
`;

export const BarMenuButton = styled(Button)`
    && {
        background: #ffcc00;
        border-color: #ffcc00;
    }
    &&:hover, &&:focus {
        background-color: yellow;
        border-color: yellow;
        color: black;
    }
    float: left;
    width: 49.5%;
    height: 30px;
    ${({side}: {side:string}) => `border-radius: ${side === 'left' ? '0 0 0 20px': '0 0 20px 0'}`}; 
    ${({side}) => `${side === 'left' ? 'margin-right: 0.5%': 'margin-left: 0.5%'}`}; 
`;  