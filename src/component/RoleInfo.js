 /*
  * by caozhihui
  * create 2018/9/7
  * contact ： caozhihui@4399inc.com
  * 
  */
 import React, { Component } from 'react';
 import model from '../Model';
 
 class RoleInfo extends Component {
     render() {
         let {roleInfoStatus,days} = this.props;
         let {data} = model;
         if(!roleInfoStatus){
             return false;
         }
         return (
             <div className="m_roleInfo">
                <p>天数{days}</p>
             </div>
         );
     }
 }
 
 export default RoleInfo;