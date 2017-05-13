import React, { Component } from 'react';

import './Home.less';

export default class Home extends Component {

  state = {
    lastChecked: -1,
    checkList: [
      {title: 'This is an inbox layout.', done: false },
      {title: 'Check one item', done: false },
      {title: 'Hold down your Shift key', done: false },
      {title: 'Check a lower item', done: false },
      {title: 'Everything inbetween should also be set to checked', done: false },
      {title: 'Try do it with out any libraries', done: false },
      {title: 'Just regular JavaScript', done: false },
      {title: 'Good Luck!', done: false },
    ]
  }

  handleClick = (item, index) => (e) => {
    const {checkList, lastChecked} = this.state;

    let inBetween = false;
    let newcheckList = [...checkList];
    if (e.shiftKey && !item.done) {
      newcheckList = checkList.map((checkbox, checkboxIndex) => {
        if (checkboxIndex === index || checkboxIndex === lastChecked) {
          inBetween = !inBetween;
        }

        return inBetween ? { ...checkbox, done: true} : checkbox;
      });
    }

    this.setState({
      lastChecked: index,
      checkList: [
        ...newcheckList.slice(0, index),
        { ...item, done: !item.done},
        ...newcheckList.slice(index + 1, checkList.length),
      ]
    });
  }

  render() {
    return (
      <div className="inbox">
        {
          this.state.checkList.map((item, index) =>
            <div className="item">
              <input type="checkbox" checked={item.done} onClick={this.handleClick(item, index)}/>
              <p>{item.title}</p>
            </div>
          )
        }
      </div>
    );
  }
}
