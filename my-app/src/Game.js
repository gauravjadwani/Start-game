import React, { Component } from 'react';
// import {Button} from 'react-bootstrap';
import FaIcon from 'react-icons/lib/fa/star';
import Check from 'react-icons/lib/fa/check';
import Times from 'react-icons/lib/fa/times-circle';
import Ref from 'react-icons/lib/fa/refresh';
import * as lodash from 'lodash';


const Stars=(props)=>{
console.log(props);

  return(
  <div className="col-md-5">
  {lodash.range(props.starsstate).map(i=> <i key={i} className="fa fa-star"><FaIcon/></i>)}

  </div>
);
};
const Button=(props)=>{
  console.log(props,'button props');
  let button;
  switch (props.answerIsCorrect) {
    case true:
    button=
    <button type="button" className="btn btn-success" onClick={() => props.acceptAnswer()}>
    <i className="fa fa-check"><Check/></i>
    </button>
      break;
      case false:
      button=
      <button type="button" className="btn btn-danger">
      <i className="fa fa-times">
      <Times/></i>
      </button>
        break;
    default:
    button=
    <button type="button" className="btn btn-success" onClick={()=> props.checkAnswer()}>
    =
    </button>

  }
  console.log(props.noofredraw);
  return(
  <div className="col-md-2">
  {button}
  <br/>
  <br/>
  <Redraw redraw={props.redraw} noofredraw={props.noofredraw}/>
  </div>
  );
}
const Answer=(props)=>{
  return(
    <div className="col-md-5">
    {props.selectedNumbers.map((number,i) =>
      <span key={i} onClick={() => props.unselectedNumber(number)}>
      {number}
      </span>
    )}
    </div>
);
}

const Redraw=(props) =>{
  // console.log(props.noofredraw);
  return(<div>
    <button className="btn btn-warning btn-sm" onClick={() => props.redraw()}
    disabled={props.noofredraw===0}
    >

    <Ref/>
    {props.noofredraw}
    </button>
    </div>)
}

const Numbers=(props)=>{
  const check=(number)=>{
    if(props.usedNumbers.indexOf(number)>=0){
      return 'used ';
    }
    if(props.selectedNumbers.indexOf(number)>=0){
      return 'selected';
    }
  }
  return(
  <div className=" card ">
  {Numbers.list.map((number,i) =>
    <span key={i} className={check(number)} onClick={() => props.selectedNumber(number)}>{number}
    </span>
  )}

  </div>
);
}

const Done=(props)=>{
  return (<div>
    {props.doneStatus}
    </div>
  )
}

Numbers.list=lodash.range(1,10);
class Game extends Component{
  static randomNumber=()=>1+Math.floor(Math.random()*9)
  state={
    selectedNumbers:[],
    randomnoofstarts:1+Math.floor(Math.random()*9),
    answerIsCorrect:null,
    usedNumbers:[],
    noofredraw:5,
    doneStatus:null
  }
  selectedNumber=(clickedNumber)=>{
      if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){
        return;
      }
    this.setState(prevState=>({
      answerIsCorrect:null,
      selectedNumbers:prevState.selectedNumbers.concat(clickedNumber)
    }))

  };
  unselectedNumber=(clickedNumber)=>{

  this.setState(prevState=>({
    selectedNumbers:prevState.selectedNumbers.filter(number=>number !== clickedNumber )
  }))

  };
  checkAnswer=()=>{
    console.log('clicked');
    this.setState(prevState=>({
      answerIsCorrect:(prevState.randomnoofstarts===prevState.selectedNumbers.reduce((sum,number)=>sum+number))
    }))
    console.log(this.state.answerIsCorrect,'query');
  };
  acceptAnswer=()=>{
    // save the state of used numbers
    console.log('answer accepted');
    this.setState(prevState=>({
      usedNumbers:(prevState.usedNumbers.concat(prevState.selectedNumbers)),
      selectedNumbers:[],
      answerIsCorrect:null,
      randomnoofstarts:1+Math.floor(Math.random()*9)
    }))
  };

  redraw=()=>{
    console.log('redraw clicked');
    // console.log('previous redraw',prevState.noofredraw--);
    this.setState(prevState=>({
      usedNumbers:[],
      selectedNumbers:[],
      answerIsCorrect:null,
      randomnoofstarts:1+Math.floor(Math.random()*9),
      noofredraw:prevState.noofredraw - 1
    }))
  }

  render(){
    // const {
    //   selectedNumbers,
    //   randomnoofstarts,
    //   answerIsCorrect
    // }=this.state;
  return (
    <div className="container">
    <h3>  play game </h3>
      <hr/>

    <div className="row">
    <Stars starsstate={this.state.randomnoofstarts}/>
    <Button
    selectedNumbers={this.state.selectedNumbers}
    answerIsCorrect={this.state.answerIsCorrect}
    checkAnswer={this.checkAnswer}
    acceptAnswer={this.acceptAnswer}
    redraw={this.redraw}
    noofredraw={this.state.noofredraw}/>
    <Answer selectedNumbers={this.state.selectedNumbers} unselectedNumber={this.unselectedNumber}/>
    </div>
    <br/>
        {
          this.state.doneStatus ? <Done doneStatus={this.state.doneStatus}/>:
        <Numbers selectedNumbers={this.state.selectedNumbers}
        selectedNumber={this.selectedNumber}
        usedNumbers={this.state.usedNumbers}/>
}

        </div>
  );
}
}
export default Game;
