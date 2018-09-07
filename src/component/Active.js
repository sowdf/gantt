/*
 * by caozhihui
 * create 2018/9/4
 * contact ： caozhihui@4399inc.com
 * 活动
 */
import React, {Component} from 'react';
import model from '../Model';
import ActiveItem from './ActiveItem';

class Active extends Component {
    render() {
        let {
            activeAry,
            monthStartTimestamp,
            monthEndTimestamp
        } = this.props;
        let {data} = model;
        return (
            <div>
                {
                    activeAry.map((item, index) => {
                        return <ActiveItem
                            monthStartTimestamp={monthStartTimestamp}
                            monthEndTimestamp={monthEndTimestamp}
                            {...item} key={index}/>
                    })
                }
            </div>
        );
    }
}

export default Active;