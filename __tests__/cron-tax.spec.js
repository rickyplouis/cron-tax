const cron = require('../lib/index.js');

describe('cron().every()', () => {
  test('Throws for invalid unit type', () => {
    expect(() => cron().every('second')).toThrow('Invalid unit type');
  });

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

  describe('cron().every(day)', () => {
    test('Returns syntax for every day', () => {
      expect(cron().every('day')).toBe('0 0 * * *');
    });
    test('Returns syntax for every day at 6 p.m.', () => {
      expect(cron().every('day', { at: 1800 })).toBe('0 18 * * *');
    });

    test('Returns syntax for every day at 9 a.m.', () => {
      expect(cron().every('day', { at: 900 })).toBe('0 9 * * *');
    });
  });

  describe('cron().every(week)', () => {
    test('Returns syntax for every week', () => {
      expect(cron().every('week')).toBe('0 0 * * 0');
    });
    test('Returns syntax for every week on monday', () => {
      expect(cron().every('week', { weekday: 1 })).toBe('0 0 * * 1');
    });

    test('Returns syntax for every week on monday at 9 a.m.', () => {
      expect(cron().every('week', { weekday: 1, at: 900 })).toBe('0 9 * * 1');
    });

    test('Returns syntax for every week on thursday at midnight', () => {
      expect(cron().every('week', { weekday: 4, at: 0 })).toBe('0 0 * * 4');
    });

    test('Returns error for time but no weekday', () => {
      expect(() => cron().every('week', { at: 900 })).toThrow(
        'Must include weekday: (0-6)'
      );
    });
  });

  describe('cron().every(month)', () => {
    test('Returns syntax for every month', () => {
      expect(cron().every('month')).toBe('0 0 1 * *');
    });
    test('Returns syntax for every 15th of the month', () => {
      expect(cron().every('month', { day: 15 })).toBe('0 0 15 * *');
    });
    test('Returns syntax for every 15th of the month at 6 p.m.', () => {
      expect(cron().every('month', { day: 15, at: 1800 })).toBe('0 18 15 * *');
    });
    test('Returns error for time but no day', () => {
      expect(() => cron().every('month', { at: 1800 })).toThrow(
        'Must include day: (0-31)'
      );
    });
  });
});
// New Date(year, month, day, hours, minutes, seconds, milliseconds)

describe('cron().every(year)', () => {
  test('Returns syntax for every year', () => {
    // Returns cronjob that runs at midnight on jan 1st
    expect(cron().every('year')).toBe('0 0 1 1 *');
  });
  const valentines = new Date(2019, 1, 12, 14, 30);
  test('returns syntax for specific date every year', () => {
    expect(cron().every('year', { date: valentines })).toBe('30 14 12 1 *');
  });
  test('throws error for bad date', () => {
    expect(() => cron().every('year', { date: 'valentines day' })).toThrow(
      'Must use javascript date object: new Date()'
    );
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

describe('cron().isWeek()', () => {
  test('returns true for week', () => {
    expect(cron().isWeek('weeks')).toBe(true);
    expect(cron().isWeek('week')).toBe(true);
    expect(cron().isWeek('wk')).toBe(true);
    expect(cron().isWeek('w')).toBe(true);
  });
  test('returns false for 1week', () => {
    expect(cron().isWeek('1week')).toBe(false);
  });
});

describe('cron().isMonth()', () => {
  test('returns true for month', () => {
    expect(cron().isMonth('months')).toBe(true);
    expect(cron().isMonth('month')).toBe(true);
    expect(cron().isMonth('mon')).toBe(true);
    expect(cron().isMonth('mm')).toBe(true);
  });
  test('returns false for 1month', () => {
    expect(cron().isMonth('1month')).toBe(false);
  });
});

describe('cron().isYear()', () => {
  test('returns true for year', () => {
    expect(cron().isYear('years')).toBe(true);
    expect(cron().isYear('year')).toBe(true);
    expect(cron().isYear('yr')).toBe(true);
    expect(cron().isYear('y')).toBe(true);
  });
  test('returns false for 1yr', () => {
    expect(cron().isMonth('1yr')).toBe(false);
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
