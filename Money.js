const PRECISION = 3
const EXPONENT = (10 ** PRECISION)

class Money {
  constructor (amount, currencyCode) {
    // console.log('money amount', amount)
    // console.log('money currencycpde', currencyCode)
    const decimalAsStr = amount.toString().split('.')[1]
    if (decimalAsStr && decimalAsStr.length > PRECISION) {
      // console.log(decimalAsStr)
      // console.log(decimalAsStr.length)
      throw new Error('Maximum money precision is ' + PRECISION)
    }
    this._amount = amount * EXPONENT
    this.currencyCode = currencyCode
  }

  plus (other) {
    this.checkCurrencyCodes(other)
    return new Money(((this._amount + other._amount) / EXPONENT), this.currencyCode)
  }

  minus (other) {
    this.checkCurrencyCodes(other)
    return new Money(((this._amount - other._amount) / EXPONENT), this.currencyCode)
  }

  times (number) {
    // console.log(this._amount * number)
    const multiplyRound = this.round(((this._amount * number) / EXPONENT), 2)
    // console.log(multiplyRound)
    return new Money(multiplyRound, this.currencyCode)
  }

  divide (number) {
    // console.log(this._amount / number)
    const divideRound = this.round(((this._amount / number) / EXPONENT), 2)
    console.log(divideRound)
    const divideMoney = new Money(divideRound, this.currencyCode)
    console.log(divideMoney)
    return divideMoney
  }

  checkCurrencyCodes (other) {
    if (this.currencyCode !== other.currencyCode) {
      throw new Error('Currency codes do not match')
    }
  }
  round (number, precision) {
    // credits to Lam Wei Li
    var shift = function (number, precision) {
      var numArray = ('' + number).split('e')
      return +(numArray[0] + 'e' + (numArray[1] ? (+numArray[1] + precision) : precision))
    }
    return shift(Math.round(shift(number, +precision)), -precision)
  }
}

export default Money
