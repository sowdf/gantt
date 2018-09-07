/*
 * by caozhihui
 * create 2018/9/4
 * contact ： caozhihui@4399inc.com
 * 日期
 */
import React, {Component} from 'react';
import model from '../Model';

class DateDay extends Component {
    render() {
        let {dayAry} = this.props;
        let {data} = model;
        return (
            <div className="m_dateDay">
                <span className="name">日期:</span>
                {
                    dayAry.map((item, index) => {
                        let {month, day,} = item;
                        return <span
                            key={index}>{day}</span>
                    })
                }
            </div>
        );
    }
}

export default DateDay;