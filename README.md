## cron-tax [![Coverage Status](https://coveralls.io/repos/github/rickyplouis/cron-tax/badge.svg?branch=master)](https://coveralls.io/github/rickyplouis/cron-tax?branch=master)

###

Intuitive cronjob syntax converter

### Installation
```js
$ npm i cron-tax
```
### Example
```js
const cronTax = require('cron-tax');

// create a cron job that runs every minute past 9 a.m.
cronTax().every('minute').past(900); // returns "* 9 * * *"
```

#### Supported units
* m or min or minute or minutes

#### Testing cronjobs

If production is not an option, the best tool for testing cronjobs online is [cronjob.guru](https://crontab.guru/)

### License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
