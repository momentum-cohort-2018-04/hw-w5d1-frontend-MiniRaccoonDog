import $ from 'jquery'
import request from 'superagent'
import Money from './Money'

$(document).ready(function () {
  request.get(`http://fantasy-currency.glitch.me/rates`)
    .then(function (response) {
      // console.log(response.body.rates)
      buildDropdown(response.body.rates)
    })

  $('.input').change(function () {
    console.log('changed!')
    getInputs()
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
  const to = $('#convert_to option:selected').val()
  console.log('amount', amount)
  console.log('from', from)
  console.log('to', to)
}
