import Money from './Money'
const PRECISION = 3
const EXPONENT = (100 ** PRECISION)

class Bank {
  constructor (amount, currencyCodeInput, inputRates, currencyCodeOutput, outputRates) {
    if (!(amount && currencyCodeInput && inputRates && currencyCodeOutput && outputRates)) {
      throw new Error('Not enough input to calculate')
    }
    this.startInput = new Money(amount, currencyCodeInput)
    this.currencyIn = currencyCodeInput
    this.inRates = inputRates
    this.valueUSD = ''
    this.currencyOut = currencyCodeOutput
    this.outRates = outputRates
  }

  convertToLocal () {
    // console.log(this.startInput)
    // console.log(this.inRates)
    let USDamount = (this.startInput).times(this.inRates)
    // console.log(USDamount._amount)
    // console.log(EXPONENT)
    // console.log(USDamount._amount / EXPONENT)
    this.valueUSD = new Money((USDamount._amount), 'USD')
    // console.log(this.valueUSD)
    return this.valueUSD
  }

  convertToOutput () {
    let usdVal = this.convertToLocal()
    // console.log(usdVal)
    if (usdVal) {
      // console.log('IF ran')
      // let outValue = (usdVal).divide(this.outRates)
      let outValue = (usdVal).times(this.outRates)
      // console.log(outValue)
      // let outValueAmount = outValue.round(outValue._amount, 2)
      // console.log(outValueAmount)
      let fixedOut = outValue.round((outValue._amount / EXPONENT), 2)
      // console.log(outValue._amount)
      // console.log(outValue._amount / EXPONENT)
      // console.log(new Money((outValue._amount / EXPONENT), this.currencyOut))
      // console.log(fixedOut)
      // let valueOutput = new Money(fixedOut, this.currencyOut)
      // console.log(outValue._amount / EXPONENT)
      // console.log(valueOutput)
      // return valueOutput
      return new Money(fixedOut, this.currencyOut)
    } else {
      throw new Error('Not converted to local format')
    }
  }
  processing (outMoney) {
    let feesCalc = outMoney.times(0.02)
    console.log(feesCalc)
    return feesCalc
  }
  // 2% processing
}

export default Bank
