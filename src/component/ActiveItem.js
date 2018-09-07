/*
 * by caozhihui
 * create 2018/9/4
 * contact ： caozhihui@4399inc.com
 * 活动的每一项
 */
import React, {Component} from 'react';
import timeRepeat from '../test/timeRepeat';
import model from '../Model';
import Role from "./Role";

const gridWidth = 40;
const dayTimestamp = 24 * 60 * 60 * 1000;

const fmtDate = (obj) => {
    let date = new Date(obj);
    let y = 1900 + date.getYear();
    let m = "0" + (date.getMonth() + 1);
    let d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
};

class ActiveItem extends Component {
    constructor(){
        super();
        this.addRoleHandle = this.addRoleHandle.bind(this);
        this.deleteHandle = this.deleteHandle.bind(this);
        this.state= {
            roleAry : [],
            deleteStatus : false
        };
    }
    //增加角色
    addRoleHandle(){
        let {
            monthEndTimestamp,
        } = this.props;
        let roleAry = this.state.roleAry;
        let data = {
            roleStartTime : monthEndTimestamp - dayTimestamp * 3,
            roleEndTime : monthEndTimestamp
        };
        roleAry.push(data);
        this.setState({
            roleAry
        });
    }
    deleteHandle(){
        let deleteStatus = this.state.deleteStatus;
        this.setState({
            deleteStatus : !deleteStatus
        });
    }
    deleteRole(index){
        let roleAry = this.state.roleAry;
        roleAry.splice(index,1);
        this.setState(
            roleAry
        );
    }
    render() {
        let {
            name,
            monthEndTimestamp,
            monthStartTimestamp,
        } = this.props;
        let {roleAry,deleteStatus} = this.state;
        return (
            <div className="m_activeItem">
                <div className="name">
                    <a href="">{name}</a>
                </div>
                <div className="time">
                    {
                        roleAry.map((item,index)=>{
                            let {roleStartTime,roleEndTime} = item;
                            return <Role
                                key={index}
                                index={index}
                                deleteStatus={deleteStatus}
                                targetStartTime = {monthStartTimestamp}
                                targetEndTime = {monthEndTimestamp}
                                roleStartTime = {roleStartTime}
                                roleEndTime = {roleEndTime}
                                deleteRole={this.deleteRole.bind(this)}
                            />
                        })
                    }
                    <div className="addRoleButton" onClick={this.addRoleHandle}>
                        增加
                    </div>
                    <div className="deleteButton" onClick={this.deleteHandle}>
                        {
                            deleteStatus ? "关闭删除" : "开启删除"
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ActiveItem;