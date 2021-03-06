import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import CryptoCompare from '../../services/cryptocompare'

import styles from './styles.css'

class Price extends Component {
  constructor (props) {
    super(props)
    this.state = { percentChange: 0, price: 0, icon: null }
  }

  componentDidMount () {
    setInterval(this.updatePrice.bind(this), 30000)
    this.updatePrice()
  }

  async updatePrice () {
    const { price, percentChange } = await CryptoCompare.fetchPrice(this.props.from, this.props.to, this.props.precision)
    this.setState({ price, percentChange, icon: percentChange > 0 ? 'arrow-up' : 'arrow-down' })
  }

  render () {
    return (
      <div className='price'>
        <div className='stats'>
          <h4 className='from-to'>{this.props.from} / {this.props.to}</h4>
          <p className='to-price'>{this.props.toSymbol} {this.state.price}</p>
          <p className={`change ${this.state.icon}`}>
            {this.state.percentChange}%
            <span className='icon-wrapper'>
              {this.state.icon && <FontAwesomeIcon icon={this.state.icon} />}
            </span>
          </p>
        </div>
      </div>
    )
  }
}

export default Price
