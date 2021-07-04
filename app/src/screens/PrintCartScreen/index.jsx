import React, { Component } from 'react';
import axios from 'axios';

import { SCREENS } from '../../App';

import ShoppingList from '../../components/ShoppingList';

class PrintCartScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            navigation: {
                navigate,
            },
            itemsList
        } = this.props;
        return (
            <div>
                <ShoppingList
                    itemsList={itemsList}
                />
            </div>
        );
    }
}

export default PrintCartScreen;