/* globals test, expect */
import Bank from './Bank.js'

test('can create Bank class', () => {
  const oneLion = new Bank(1, 'NLN', 4.61, 'AMD', 1.46)
  const convert = oneLion.currencyOut
  const rateout = oneLion.outRates
  expect(convert).toEqual('AMD')
  expect(rateout).toEqual(1.46)
})

test('does not run with partial input', () => {
  expect(() => {
    const oneAnk = new Bank(1, 'AMD', 1.46)
  }).toThrowError()
})

test('converts to USD', () => {
  const lionstodollars = new Bank(3, 'NLN', 4.61, 'AMD', 1.46)
  const indollars = lionstodollars.convertToLocal()
  console.log(indollars)
  expect(indollars).toEqual(13.83)
})
