 /*
  * by caozhihui
  * create 2018/9/4
  * contact ： caozhihui@4399inc.com
  * 星期
  */
 import React, { Component } from 'react';
 import model from '../Model';
 
 class WeekDay extends Component {
     render() {
         let {dayAry} = this.props;
         let {data} = model;
         return (
             <div className="m_weekDay">
                 <span className="name">星期:</span>
                 {
                     dayAry.map((item, index) => {
                         let {weekDay,workingDays} = item;
                         return <span
                             className={workingDays ? "" : "weekend"}
                             key={index}>{weekDay}</span>
                     })
                 }
             </div>
         );
     }
 }
 
 export default WeekDay;