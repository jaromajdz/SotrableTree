  import React, { Component } from 'react';
  import './DButton.css';

class  DButton extends Component {


    stl = "DButton"

    componentWillUpdate(nextProps, nextState){

      if(nextProps.show!==this.props.show){

        if(nextProps.show){
          this.stl = "DButton" + " " + "opena"
        } else {
          this.stl = "DButton" + " " + "closea"
        }

      }else{
        this.stl = "DButton"
      }
    }

    render(){
        console.log('show',this.props.show)
        return <div className={this.stl} onClick={this.props.click}>{this.props.show ? '-' : '+'}</div>
     }
  }
export default DButton;
