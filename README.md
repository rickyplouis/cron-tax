## cron-tax [![Build Status](https://travis-ci.com/rickyplouis/cron-tax.svg?branch=master)](https://travis-ci.com/rickyplouis/cron-tax) [![Coverage Status](https://coveralls.io/repos/github/rickyplouis/cron-tax/badge.svg?branch=master)](https://coveralls.io/github/rickyplouis/cron-tax?branch=master)[![npm version](https://badge.fury.io/js/cron-tax.svg)](https://badge.fury.io/js/cron-tax)

###

Intuitive cronjob syntax converter

### Installation
```js
$ npm i cron-tax
```
### Example
```js
const cronTax = require('cron-tax');

// create a cron job that runs
cronTax().every('minute'); // returns "* * * * *"

// create a cron job that runs every minute before 9 a.m.
cronTax().every('minute', { before: 900}); // returns "* 0-9 * * *"

// create a cron job that runs every minute past 9 a.m.
cronTax().every('minute', { after: 900}); // returns "* 9-23 * * *"

// create a cron job that runs every between 9 a.m. and 5 p.m.
cronTax().every('minute', { between: [900, 1700]}); // returns "* 9-17 * * *"

// create a cron job that runs every hour
cronTax().every('hour'); // returns "0 * * * *"

// create a cron job that runs every hour before 3 p.m.
cronTax().every('hour', before: 1500); // returns "0 0-15 * * *"

// create a cron job that runs every hour after 9 p.m.
cronTax().every('hour', after: 2100); // returns "0 21-23 * * *"

// create a cron job that runs every day at 6 p.m.
cronTax().every('hour', after: 1800); // returns "0 18 * * *"

// create a cron job that runs every week at Sunday at midnight
cronTax().every('week'); // returns "0 0 * * 0"

// weekdays are Sunday = 0 through Saturday = 6
// create a cron job that runs every week at Wednesday at midnight
cronTax().every('week', { weekday: 3 }); // returns "0 0 * * 3"

// create a cron job that runs every week at Wednesday at 7 p.m.
cronTax().every('week', { weekday: 3, at: 1900 }); // returns "0 19 * * 3"
```

#### Supported units
* minute
* hour
* day
* week
* month // coming soon
* year // coming soon


#### Testing cronjobs

If production is not an option, the best tool for testing cronjobs online is [cronjob.guru](https://crontab.guru/)

### License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
