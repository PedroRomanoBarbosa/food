import React, { Component } from 'react';

class Spinner extends Component {
    state = {
        expanded: false,
        value: null,
    };

    componentDidMount() {
        const { values } = this.props;
        this.setState({ value: values[0] });
    }
    
    render() {
        const {
            values,
        } = this.props;
        const {
            expanded,
            value,
        } = this.state;
        return (
            <div>
                <div
                    style={{
                        
                    }}
                    disabled
                    tabindex="0"
                    onFocus={() => this.setState({ expanded: true })}
                    value={value}
                    onBlur={() => this.setState({ expanded: false })}
                />
                {expanded && <div>{values.map((value, index) => {
                    return (
                        <div onClick={() => this.setState({ value: values[index] })}>{value}</div>
                    );
                })}</div>}
            </div>
        );
    }
}
 
export default Spinner;