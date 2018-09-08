/*
 * by caozhihui
 * create 2018/9/5
 * contact ： caozhihui@4399inc.com
 * 角色组件
 */
import React, {Component} from 'react';
import model from '../Model';
import timeRepeat from "../test/timeRepeat";
import RoleInfo from './RoleInfo';
import PropTypes from 'prop-types';
import Active from "./Active";


const gridWidth = 40;
const dayTimestamp = 24 * 60 * 60 * 1000;

const fmtDate = (obj) => {
    let date = new Date(obj);
    let y = 1900 + date.getYear();
    let m = "0" + (date.getMonth() + 1);
    let d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
};

class Role extends Component {
    constructor() {
        super();
        this.roleTimeCount = this.roleTimeCount.bind(this);
        this.indexAutoAdd = this.indexAutoAdd.bind(this);
        this.resizeLeftWidth = this.resizeLeftWidth.bind(this);
        this.roleInfoClose = this.roleInfoClose.bind(this);
        this.roleInfoShow = this.roleInfoShow.bind(this);
        this.countTimestamp = this.countTimestamp.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.countDays = this.countDays.bind(this);
        this.getRoleInfo = this.getRoleInfo.bind(this);
        this.days = 0;
        this.state = {
            left: 0,
            width: 0,
            zIndex: 0,
            days : 0,
            roleInfoStatus: false
        }
        console.log(this.context);
    }

    randomHexColor() { //随机生成十六进制颜色
        let hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
        while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
            hex = '0' + hex;
        }
        return '#' + hex; //返回‘#'开头16进制颜色
    }

    componentDidMount() {
        let {targetStartTime, targetEndTime, roleStartTime, roleEndTime} = this.props;
        let obj = this.roleTimeCount();
        this.days = (targetEndTime - targetStartTime) / dayTimestamp + 1;
        this.setState({
            left: obj.left,
            width: obj.width
        });
        console.log(this.context);
    }

    //取整操作
    resizeLeftWidth() {
        let left = parseInt(this.state.left);
        let width = parseInt(this.state.width);
        //对width 取余
        let yWidth = parseInt(width % gridWidth);
        let yLeft = parseInt(left % gridWidth);
        if (yWidth < gridWidth / 2) {
            //如果小于 一半 就当作  去除那一半
            width = width - yWidth;
        } else {
            //如果大于一半  直接补全一个工作 日的宽度
            width = width - yWidth + gridWidth;
        }

        if (yLeft < gridWidth / 2) {
            left = left - yLeft;
        } else {
            left = left - yLeft + gridWidth;
        }

        this.setState({
            width,
            left
        });
    }

    //层级 自动增加
    indexAutoAdd() {
        this.setState({
            zIndex: parseInt(new Date().getTime() / 1000 % 10000)
        });
    }

    roleTimeCount() {
        let {targetStartTime, targetEndTime, roleStartTime, roleEndTime} = this.props;
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

    /* 鼠标控制大小 */
    onMouseDownHandle(aspect, ev) {
        //获取点击的父级
        let downPosLeft = ev.clientX;
        ev.preventDefault();
        ev.stopPropagation();
        this.mouseDown();
        document.onmousemove = (ev) => {
            if (aspect == 'left') {
                let posLeft = downPosLeft - ev.clientX;
                let width = this.state.width + posLeft;
                let left = this.state.left - posLeft;
                if (left <= 0) {
                    left = 0;
                }
                if (left >= gridWidth * (this.days - 1)) {
                    left = gridWidth * (this.days - 1);
                }
                if (width <= gridWidth) {
                    width = gridWidth;
                }
                if (width >= gridWidth * this.days) {
                    width = gridWidth * this.days
                }
                this.setState({
                    left,
                    width
                });
                downPosLeft = ev.clientX;
            } else {
                let posLeft = ev.clientX - downPosLeft; // < 0  的一个数
                let width = this.state.width + posLeft;
                let left = this.state.left;
                if (left <= 0) {
                    left = 0;
                }
                //宽度向左拖动 变小后 要移动 left
                if (width <= gridWidth) {
                    width = gridWidth
                    left = left - Math.abs(posLeft);
                }
                if (width + left > this.days * gridWidth) {
                    width = this.days * gridWidth - left;
                }
                this.setState({
                    width,
                    left
                });
                downPosLeft = ev.clientX;
            }
            this.mouseMove();
        }
        document.onmouseup = () => {
            document.onmousemove = null;
            this.mouseUp();

        }

    }

    onMouseUpHandle() {
        document.onmousemove = null;
    }

    /*  鼠标移动快 */
    onMoveMouseDownHandle(ev) {
        let downPosLeft = ev.clientX;
        this.mouseDown();

        document.onmousemove = (ev) => {
            let posLeft = downPosLeft - ev.clientX;
            if (posLeft > 0) { //向 左
                let left = this.state.left - posLeft;
                if (left < 0) {
                    left = 0;
                }
                this.setState({
                    left
                });
            } else { //向右
                let left = this.state.left - posLeft;
                if (left > (gridWidth * this.days) - this.state.width) {
                    left = (gridWidth * this.days) - this.state.width;
                }
                this.setState({
                    left
                });
            }
            this.mouseMove();
            downPosLeft = ev.clientX;
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            this.mouseUp();
        }
    }

    /*
    * 角色信息显示
    * */
    roleInfoShow() {
        this.setState({
            roleInfoStatus: true
        });
    }

    roleInfoClose() {
        this.setState({
            roleInfoStatus: false
        });
    }

    /*  鼠标移动快 */
    onMoveMouseUpHandle() {
        document.onmousemove = null;
    }

    /* 通过位置 宽度 计算  时间戳区间 */
    countTimestamp() {
        let {targetStartTime, targetEndTime} = this.props;
        let {width, left} = this.state;
        let startTimestamp = targetStartTime + (left / gridWidth) * dayTimestamp;
        //开始的已经有一天 了  从 开始的时间加   所以要减 1
        let endTimestamp = startTimestamp + (width / gridWidth - 1) * dayTimestamp;
        return {startTimestamp,endTimestamp};
    }
    /*
    * 获取角色信息
    * */
    getRoleInfo(){
        this.setState({
            days : this.countDays()
        });
    }
    /*
    * 计算 天数
    * */
    countDays(){
        let {width} = this.state;
        console.log(Math.ceil(width / gridWidth));
        return Math.ceil(width / gridWidth);
    }
    /*
    * 计算 时间段的工作日天数
    * */
    countTimestampWorkDays(){

    }

    /*
    * 鼠标按下的 勾子
    * */
    mouseDown() {
        this.indexAutoAdd();
        this.roleInfoShow();
        this.countTimestamp();
        this.getRoleInfo();
    }

    /*
    * 鼠标 移动的勾子
    * */
    mouseMove() {
        this.countTimestamp();
        this.getRoleInfo();
    }

    /*
    * 鼠标 抬起 勾子
    * */
    mouseUp() {
        this.resizeLeftWidth();
        this.roleInfoClose();
        this.getRoleInfo();
    }

    deleteRoleHandle(ev){
        let {deleteRole,index} = this.props;
        deleteRole(index);
        ev.preventDefault();
        ev.stopPropagation();

    }

    render() {
        let {data} = model;
        let {width, left, zIndex, roleInfoStatus,days} = this.state;
        let {deleteStatus,index} = this.props;
        return (
            <div
                style={{
                    width: `${width}px`,
                    left: `${left}px`,
                    background: `${this.randomHexColor()}`,
                    zIndex: `${zIndex}`
                }}
                className="activeTime"
                onMouseDown={this.onMoveMouseDownHandle.bind(this)}
                onMouseUp={this.onMoveMouseUpHandle.bind(this)}
            >
                <RoleInfo
                    days={days}
                    roleInfoStatus={roleInfoStatus}
                />
                <div
                    className="delete"
                    style={{display:`${deleteStatus ? "block" : "none"}`}}
                    onClick={this.deleteRoleHandle.bind(this)}
                >x</div>
                {
                    index
                }
                <em className="fl"
                    onMouseDown={this.onMouseDownHandle.bind(this, 'left')}
                    onMouseUp={this.onMouseUpHandle.bind(this)}
                ></em>
                <em className="fr"
                    onMouseDown={this.onMouseDownHandle.bind(this, 'right')}
                    onMouseUp={this.onMouseUpHandle.bind(this)}
                ></em>
            </div>
        );
    }
}

Role.contextTypes = {
    test : PropTypes.any
}

export default Role;