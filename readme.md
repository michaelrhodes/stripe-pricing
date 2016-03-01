# stripe-pricing

This is an object representation of Stripe’s international pricing. Each supported country can be accessed by its [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)

[![Build status](https://travis-ci.org/michaelrhodes/stripe-pricing.svg?branch=master)](https://travis-ci.org/michaelrhodes/stripe-pricing)

## Install

```sh
$ npm install stripe-pricing
```

## Usage

```js
var pricing = require('stripe-pricing')

pricing['AU']
=> [
  { percentage: '1.75%', fee: '30¢', description: 'Domestic cards' },
  { percentage: '2.9%', fee: '30¢', description: 'International + AmEx' }
] 
```

## License

[MIT](http://opensource.org/licenses/MIT)
