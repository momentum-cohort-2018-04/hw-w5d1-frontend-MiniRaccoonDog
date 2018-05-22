/* globals test, expect */
import Bank from './Bank.js'
import Money from './Money'

const PRECISION = 3
const EXPONENT = (100 ** PRECISION)

test('can create Bank class', () => {
  const oneLion = new Bank(1, 'NLN', 4.61, 'AMD', 1.46)
  const convert = oneLion.currencyOut
  const rateout = oneLion.outRates
  const theinput = oneLion.startInput
  expect(convert).toEqual('AMD')
  expect(rateout).toEqual(1.46)
  expect(theinput).toEqual(new Money(1, 'NLN'))
})

test('does not run with partial input', () => {
  expect(() => {
    const oneAnk = new Bank(1, 'AMD', 1.46)
    // console.log(oneAnk)
  }).toThrowError()
})

test('converts to USD', () => {
  const lionstodollars = new Bank(3, 'NLN', 4.61, 'AMD', 1.46)
  // console.log(lionstodollars)
  // console.log(lionstodollars.startInput)
  const indollars = lionstodollars.convertToLocal()
  // console.log(indollars._amount)
  expect(indollars._amount).toEqual(13.83 * EXPONENT)
})

test('convert to output', () => {
  const lionstodollars = new Bank(3, 'NLN', 4.61, 'AMD', 1.46)
  const inAMDollars = lionstodollars.convertToOutput()
  // console.log(inAMDollars)
  expect(inAMDollars).toEqual(new Money(9.47, 'AMD'))
})

test('processing fees', () => {
  const lionstodollars = new Bank(3, 'NLN', 4.61, 'AMD', 1.46)
  const inAMDollars = lionstodollars.convertToOutput()
  const returnfees = lionstodollars.processing(inAMDollars)
  console.log(returnfees)
  expect(returnfees).toEqual(new Money(0.19, 'AMD'))
})
