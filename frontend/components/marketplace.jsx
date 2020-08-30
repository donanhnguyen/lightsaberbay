import React, { Component, useState, useReducer} from 'react'
import MarketplaceMap from './marketplacemap';

export class marketplace extends Component {

    componentDidMount () {

    }

    render() {
        console.log(this.props)
        return (
            <div>
                <MarketplaceMap />
            </div>
        )
    }
}

export default marketplace
