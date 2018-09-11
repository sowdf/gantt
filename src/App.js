import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import DateDay from './component/DateDay';
import WeekDay from './component/WeekDay';
import Active from './component/Active';
import StackDatePicker from "./StackDatePicker";
import timeRepeat from "./test/timeRepeat";

const gridHeight = 50;

const gridWidth = 40;
const dayTimestamp = 24 * 60 * 60 * 1000;

class App extends Component {
    constructor(props) {
        super(props);
        //初始化日历插件
        this.stackDatePicker = new StackDatePicker();
        this.monthDayAry = this.stackDatePicker.getMonthAry(2018, 8);
        //一个月的开始 时间
        this.monthStartTimestamp = this.monthDayAry[0].dayTimestamp;
        //一个月的开始 结束
        this.monthEndTimestamp = this.monthDayAry[this.monthDayAry.length - 1].dayTimestamp;
        this.state = {
            activeAry : [{
                "actId": 20,
                "name": "游戏圈烟花会 定制明信片赢奖励",
                "activeStartTimeTimestampText": "1535212800000",
                "activeEndTimeTimestampText": "1537286400000",
                "start_year": 2018,
                "start_month": 8,
                "start_day": 26,
                "end_year": 2018,
                "end_month": 9,
                "end_day": 19,
                "demand_url": "https://note.youdao.com/share/?id=97741882041a80d4c4368974228b02c5&type=note#/",
                "operating_mid": 57,
                "design_mid": null,
                "web_mid": null,
                "server_mid": null,
                "test_mid": null,
                "createdAt": "2018-08-23T14:24:56.000Z",
                "updatedAt": "2018-08-23T14:37:44.000Z",
                "roleAry" : []
            }]
        };
        this.activeAddRole = this.activeAddRole.bind(this);
        //修改角色 基本信息
        this.reviseRoleInfo = this.reviseRoleInfo.bind(this);
        //删除角色信息
        this.deleteActiveRole = this.deleteActiveRole.bind(this);
    }
    /*
    * 计算角色的 left  和 width
    * */
    countRoleLeftWidth(targetStartTime,targetEndTime,roleStartTime,roleEndTime) {
        let repeatTime = timeRepeat(targetStartTime, targetEndTime, roleStartTime, roleEndTime);
        if (!repeatTime) {
            return {width: 0, left: 0};
        }
        //活动时间的长度 重复时间 的结束 - 开始 / 8640000 * 60 一天是 60 px;
        let roleWidth = parseInt((repeatTime.end - repeatTime.start) / dayTimestamp) * gridWidth;
        // 重复 时间的开始时间   - 当前这个月的 开始时间  / 8640000  60 一天是 60 px;
        let roleLeft = parseInt((repeatTime.start - targetStartTime) / dayTimestamp) * gridWidth;
        return {width: roleWidth, left: roleLeft};
    }
    /*
    * 活动增加角色
    * 活动索引 第一几个活动
    * */
    activeAddRole(activeIndex){
        //所有活动
        let activeAry = this.state.activeAry;
        let active = activeAry[activeIndex];
        let roleStartTime = this.monthEndTimestamp - dayTimestamp * 3;
        let roleEndTime = this.monthEndTimestamp;
        let roleInfo = this.countRoleLeftWidth(this.monthStartTimestamp,this.monthEndTimestamp,roleStartTime,roleEndTime);
        //角色数据
        let data = {
            roleStartTime, //开始时间
            roleEndTime, // 结束时间
            left : roleInfo.left,
            width : roleInfo.width
        };
        //插入数据
        active.roleAry.push(data);
        this.setState({
            activeAry
        });
        this.state.activeAry;
    }
    /*
    * 修改 角色基本信息
    * */
    reviseRoleInfo(activeIndex,roleIndex,data){
        let activeAry = this.state.activeAry;
        let active = activeAry[activeIndex];
        let role = active.roleAry[roleIndex];
        let {width,left,days} = data;
        //修改宽度
        if(width){
            role.width = width;
        }
        //修改位置
        if(left){
            role.left = left;
        }
        //修改天数
        if(days){
            role.days = days;
        }
        this.setState({
            activeAry
        });

    }
    /*
    * 删除角色
    * */
    deleteActiveRole(activeIndex,roleIndex){
        let activeAry = this.state.activeAry;
        let active = activeAry[activeIndex];
        let roleAry = active.roleAry;
        roleAry.splice(roleIndex,1);
        this.setState({
            activeAry
        });
    }


    getChildContext() {
        return {
            activeAddRole:this.activeAddRole,
            reviseRoleInfo : this.reviseRoleInfo,
            deleteActiveRole : this.deleteActiveRole
        }
    }

    render() {
        let {activeAry} = this.state;
        return (
            <div className="App">
                <DateDay
                    dayAry={this.monthDayAry}
                />
                <WeekDay
                    dayAry={this.monthDayAry}
                />
                <div className="u_hr">
                    活动
                </div>
                <Active
                    monthStartTimestamp={this.monthStartTimestamp}
                    monthEndTimestamp={this.monthEndTimestamp}
                    activeAry={activeAry}
                />
            </div>
        );
    }
}

App.childContextTypes = {
    activeAddRole : PropTypes.any,
    reviseRoleInfo : PropTypes.any,
    deleteActiveRole : PropTypes.any
};


export default App;
