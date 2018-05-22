/* globals test, expect */
import Money from './Money'

test('can add $1 to $2', () => {
  const oneDollar = new Money(1, 'NLN')
  const twoDollar = new Money(2, 'NLN')
  const sum = oneDollar.plus(twoDollar)
  expect(sum).toEqual(new Money(3, 'NLN'))
})

test('can add $3 to $2', () => {
  const threeDollar = new Money(3, 'NLN')
  const twoDollar = new Money(2, 'NLN')
  const sum = threeDollar.plus(twoDollar)
  expect(sum).toEqual(new Money(5, 'NLN'))
})

test('can subtract $2 from $3', () => {
  const threeDollar = new Money(3, 'NLN')
  const twoDollar = new Money(2, 'NLN')
  const difference = threeDollar.minus(twoDollar)
  expect(difference).toEqual(new Money(1, 'NLN'))
})

test('can add 3 GCR to 2 GCR', () => {
  const threeGondor = new Money(3, 'GCR')
  const twoGondor = new Money(2, 'GCR')
  const sum = threeGondor.plus(twoGondor)
  expect(sum).toEqual(new Money(5, 'GCR'))
})

test('adding GCR to NLN should raise an error', () => {
  const oneDollar = new Money(1, 'NLN')
  const twoGondor = new Money(2, 'GCR')
  expect(() => {
    expect(oneDollar.plus(twoGondor).amount).not.toBe(3)
    expect(oneDollar.plus(twoGondor).currencyCode).not.toBe('NLN')
  }).toThrowError()
})

test('Money with the same amount and currencyCode are equivalent', () => {
  const money1 = new Money(1, 'USD')
  const money2 = new Money(1, 'USD')
  expect(money1).toEqual(money2)
})

test('Money cannot be more precise than 3 decimal places', () => {
  const money1 = new Money(0.001, 'USD')
  expect(money1).toEqual(new Money(0.001, 'USD'))

  expect(() => {
    const money2 = new Money(0.0001, 'USD')
  }).toThrowError()
})

test('Money can be multiplied', () => {
  // expect((new Money(0.2, 'USD').times(3))).toEqual(new Money(0.6, 'USD'))
  expect((new Money(2, 'USD').times(3))).toEqual(new Money(6, 'USD'))
})

test('Money should not have floating point errors', () => {
  const money1 = new Money(0.2, 'USD')
  expect(money1.times(3)).toEqual(new Money(0.6, 'USD'))
})

test('rates should be defined', () => {
  const money1 = new Money(8, 'NLN', 4.61)
  console.log(money1.rate)
  expect(money1.rate).toEqual(4.61)
})
