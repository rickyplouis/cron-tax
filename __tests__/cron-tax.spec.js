const cron = require('../lib/index.js');

describe('cron().everday()', () => {
  test('Returns syntax for every minute past 9 a.m.', () => {
    expect(
      cron()
        .every('minute')
        .past(900)
    ).toBe('* 9 * * *');
  });
});
