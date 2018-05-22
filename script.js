import $ from 'jquery'
import request from 'superagent'
import Money from './Money'
import Bank from './Bank.js'
const PRECISION = 3
const EXPONENT = (10 ** PRECISION)

$(document).ready(function () {
  request.get(`http://fantasy-currency.glitch.me/rates`)
    .then(function (response) {
      // console.log(response.body.rates)
      buildDropdown(response.body.rates)
    })

  $('.input').change(function () {
    console.log('changed!')
    const bankResponse = getInputs()
    response(bankResponse)
  })
})

function buildDropdown (array) {
  const dropdown = []
  for (var i in array) {
    let entry = array[i]
    let value = entry.abbr
    let name = entry.name
    let rate = entry.rateInUSD
    let option = `<option value="${value}" data_rate="${rate}">${name}</option>`
    dropdown.push(option)
  }
  var optionDiv = dropdown.join('')
  $('.currency').html(optionDiv)
  // console.log(dropdown)
}

function getInputs () {
  const amount = $('#convert_amount').val()
  const from = $('#convert_from option:selected').val()
  const fromRate = $('#convert_from option:selected').attr('data_rate')
  const to = $('#convert_to option:selected').val()
  const toRate = $('#convert_to option:selected').attr('data_rate')
  console.log('amount', amount)
  console.log('from', from)
  console.log('to', to)
  // constructor (amount, currencyCodeInput, inputRates, currencyCodeOutput, outputRates)
  const toBank = new Bank(amount, from, fromRate, to, toRate)
  return toBank
}

function response (bank) {
  const convertedValue = bank.convertToOutput()
  console.log(convertedValue)
  // this is a money object
  const moneyAmount = convertedValue._amount
  console.log(moneyAmount)
  const amount = convertedValue.round((moneyAmount / EXPONENT), 2)
  console.log('amount', amount)
  console.log($('#response'))
  const fee = bank.processing(convertedValue)
  console.log('fee', fee)
  const feeAmount = fee._amount
  const feeResponse = fee.round((feeAmount / EXPONENT), 2)
  const feeCode = fee.currencyCode
  // const inputHTML = `${amount}`
  console.log(feeResponse)
  const feeHTML = `plus a processing fee of ${feeResponse} ${feeCode}`
  $('#response').val(amount)
  $('.fees').html(feeHTML)
}
