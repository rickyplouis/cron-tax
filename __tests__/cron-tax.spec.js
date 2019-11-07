const cron = require('../lib/index.js');

describe('cron().every()', () => {
  describe('cron().every(minute)', () => {
    test('Returns syntax for every minute', () => {
      expect(cron().every('minute')).toBe('* * * * *');
    });
    test('Returns syntax for every minute before 5 p.m.', () => {
      expect(cron().every('minute', { before: 1700 })).toBe('* 0-17 * * *');
    });
    test('Returns syntax for every minute after 2 p.m.', () => {
      expect(cron().every('minute', { after: 1400 })).toBe('* 14-23 * * *');
    });
    test('Returns syntax for every minute between 2 p.m. and 5 p.m.', () => {
      expect(cron().every('minute', { between: [1400, 1700] })).toBe('* 14-17 * * *');
    });
  });

  describe('cron().every(hour)', () => {
    test('Returns syntax for every hour', () => {
      expect(cron().every('hour')).toBe('0 * * * *');
    });
    test('Returns syntax for every hour after 1 a.m.', () => {
      expect(cron().every('hour', { after: 100 })).toBe('0 1-23 * * *');
    });
    test('Returns syntax for every hour before 6 p.m.', () => {
      expect(cron().every('hour', { before: 1800 })).toBe('0 0-18 * * *');
    });
    test('Returns syntax for every hour between 1 a.m. and 6 p.m.', () => {
      expect(cron().every('hour', { between: [100, 1800] })).toBe('0 1-18 * * *');
    });
  });
});

describe('cron().every(day)', () => {
  test('Returns syntax for every day', () => {
    expect(cron().every('day')).toBe('0 0 * * *');
  });
  test('Returns syntax for every day at 6 p.m.', () => {
    expect(cron().every('day', { at: 1800 })).toBe('0 18 * * *');
  });
});

describe('cron().unitList()', () => {
  const unitListLength = 25;
  test(`Ensures the unitList is of length ${unitListLength}, if units added, then increment unitListLength`, () => {
    expect(cron().unitList().length).toBe(unitListLength);
  });
});

describe('cron().isMinute()', () => {
  test('returns true for min', () => {
    expect(cron().isMinute('minutes')).toBe(true);
    expect(cron().isMinute('minute')).toBe(true);
    expect(cron().isMinute('mins')).toBe(true);
    expect(cron().isMinute('min')).toBe(true);
    expect(cron().isMinute('m')).toBe(true);
  });
  test('returns false for 1min', () => {
    expect(cron().isMinute('1min')).toBe(false);
  });
});

describe('cron().isHour()', () => {
  test('returns true for hours', () => {
    expect(cron().isHour('h')).toBe(true);
    expect(cron().isHour('hr')).toBe(true);
    expect(cron().isHour('hrs')).toBe(true);
    expect(cron().isHour('hour')).toBe(true);
    expect(cron().isHour('hours')).toBe(true);
  });
  test('returns false for 1hour', () => {
    expect(cron().isHour('1hour')).toBe(false);
  });
});

describe('cron().isDay()', () => {
  test('returns true for day', () => {
    expect(cron().isDay('days')).toBe(true);
    expect(cron().isDay('day')).toBe(true);
    expect(cron().isDay('d')).toBe(true);
  });
  test('returns false for 1day', () => {
    expect(cron().isDay('1day')).toBe(false);
  });
});

describe('cron().isValidUnit()', () => {
  test('Returns valid unit', () => {
    expect(cron().isValidUnit('minutes')).toBe(true);
  });
  test('Returns invalid unit', () => {
    expect(cron().isValidUnit('half hour')).toBe(false);
  });
});
