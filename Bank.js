import Money from './Money'

class Bank {
  constructor (amount, currencyCodeInput, inputRates, currencyCodeOutput, outputRates) {
    if (!(amount && currencyCodeInput && inputRates && currencyCodeOutput && outputRates)) {
      throw new Error('Not enough input to calculate')
    }
    this.amount = amount
    this.currencyIn = currencyCodeInput
    this.inRates = inputRates
    this.currencyOut = currencyCodeOutput
    this.outRates = outputRates
  }

  convertToLocal () {
    return Number(this.amount) * Number(this.inRates)
  }
}

export default Bank
