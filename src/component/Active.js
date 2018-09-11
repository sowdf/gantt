/*
 * by caozhihui
 * create 2018/9/4
 * contact ： caozhihui@4399inc.com
 * 活动
 */
import React, {Component} from 'react';
import model from '../Model';
import ActiveItem from './ActiveItem';
import PropTypes from 'prop-types';

class Active extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        console.log(this.context);
    }

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
                            activeIndex={index}
                            monthStartTimestamp={monthStartTimestamp}
                            monthEndTimestamp={monthEndTimestamp}
                            {...item} key={index}/>
                    })
                }
            </div>
        );
    }
}

Active.contextTypes = {
    activeAddRole: PropTypes.any
}

export default Active;