import React, {Component} from 'react';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import DateDay from './component/DateDay';
import WeekDay from './component/WeekDay';
import Active from './component/Active';
import StackDatePicker from "./StackDatePicker";

const gridWidth = 50;
const gridHeight = 50;

class App extends Component {
    constructor(props) {
        super(props);
        this.test = this.test.bind(this);
        //初始化日历插件
        this.stackDatePicker = new StackDatePicker();
        this.monthDayAry = this.stackDatePicker.getMonthAry(2018, 8);
        this.activeAry = [{
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
        }];
        //一个月的开始 时间
        this.monthStartTimestamp = this.monthDayAry[0].dayTimestamp;
        //一个月的开始 结束
        this.monthEndTimestamp = this.monthDayAry[this.monthDayAry.length - 1].dayTimestamp;
        this.state = {
            a : "dfadfads"
        }
    }

    test() {
        console.log(this.state);
    }

    getChildContext() {
        console.log(this);
        return {test: this.test,value : 3333}
    }

    render() {
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
                    activeAry={this.activeAry}
                />
            </div>
        );
    }
}

App.childContextTypes = {
    test: PropTypes.any,
    value: PropTypes.string
}


export default App;
