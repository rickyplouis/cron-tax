class CronTax {
  constructor() {
    this.unitType = '';
    this.cronTax = '* * * * *';
    this.options = {
      at: false,
      after: false,
      before: false,
      between: false
    };
  }

  unitList() {
    // List must be in order of small units to large
    // and long text to short text
    // to allow timeHelper() to work
    return [
      'minutes',
      'minute',
      'mins',
      'min',
      'm',
      'hours',
      'hour',
      'hrs',
      'hr',
      'h',
      'days',
      'day',
      'd',
      'weeks',
      'week',
      'wk',
      'w',
      'months',
      'month',
      'mon',
      'mm',
      'years',
      'year',
      'yr',
      'y'
    ];
  }

  hasProp(options, prop) {
    return options && options[prop] && options[prop] !== false;
  }

  hasBefore(options) {
    return this.hasProp(options, 'before');
  }

  hasAfter(options) {
    return this.hasProp(options, 'after');
  }

  hasWeekDay(options) {
    return this.hasProp(options, 'weekday');
  }

  hasDay(options) {
    return this.hasProp(options, 'day');
  }

  hasDate(options) {
    return this.hasProp(options, 'date');
  }

  hasBetween(options) {
    return options && options.between && Array.isArray(options.between);
  }

  hasAt(options) {
    return this.hasProp(options, 'at');
  }

  convertUnits(unit) {
    return parseInt(unit / 100, 10);
  }

  handleMinute(options) {
    this.cronTax = `* * * * *`;
    const { before = 0, after = 0, between = 0 } = options;
    if (this.hasBefore(options)) {
      this.cronTax = `* 0-${this.convertUnits(before)} * * *`;
    } else if (this.hasAfter(options)) {
      this.cronTax = `* ${this.convertUnits(after)}-23 * * *`;
    } else if (this.hasBetween(options)) {
      this.cronTax =
        '* ' +
        this.convertUnits(between[0]) +
        '-' +
        this.convertUnits(between[1]) +
        ' * * *';
    }
  }

  handleHour(options) {
    this.cronTax = `0 * * * *`;
    const { before = 0, after = 0, between = 0 } = options;
    if (this.hasBefore(options)) {
      this.cronTax = `0 0-${this.convertUnits(before)} * * *`;
    } else if (this.hasAfter(options)) {
      this.cronTax = `0 ${this.convertUnits(after)}-23 * * *`;
    } else if (this.hasBetween(options)) {
      this.cronTax =
        '0 ' +
        this.convertUnits(between[0]) +
        '-' +
        this.convertUnits(between[1]) +
        ' * * *';
    }
  }

  handleDay(options) {
    this.cronTax = `0 0 * * *`;
    if (this.hasAt(options)) {
      this.cronTax = `0 ${parseInt(options.at / 100, 10)} * * *`;
    }
  }

  handleWeek(options) {
    this.cronTax = `0 0 * * 0`;
    const { at, weekday } = options;
    if (this.hasAt(options) && !this.hasWeekDay(options)) {
      throw new Error('Must include weekday: (0-6)');
    }

    if (this.hasWeekDay(options)) {
      this.cronTax = `0 0 * * ${weekday}`;
      if (this.hasAt(options)) {
        this.cronTax = `0 ${this.convertUnits(at)} * * ${weekday}`;
      }
    }
  }

  handleMonth(options) {
    this.cronTax = `0 0 1 * *`;
    const { at, day } = options;
    if (this.hasAt(options) && !this.hasDay(options)) {
      throw new Error('Must include day: (0-31)');
    }

    if (this.hasDay(options)) {
      this.cronTax = `0 0 ${day} * *`;
      if (this.hasAt(options)) {
        this.cronTax = `0 ${this.convertUnits(at)} ${day} * *`;
      }
    }
  }

  handleYear(options) {
    this.cronTax = `0 0 1 1 *`;
    const { date } = options;

    if (this.hasDate(options)) {
      if (date instanceof Date) {
        const minutes = date.getMinutes();
        const hour = date.getHours();
        const day = date.getUTCDate();
        const month = date.getMonth();
        this.cronTax = `${minutes} ${hour} ${day} ${month} *`;
      } else {
        throw new Error('Must use javascript date object: new Date()');
      }
    }
  }

  every(unitType, options = this.options) {
    if (this.isValidUnit(unitType)) {
      if (this.isMinute(unitType)) {
        this.handleMinute(options);
      }

      if (this.isHour(unitType)) {
        this.handleHour(options);
      }

      if (this.isDay(unitType)) {
        this.handleDay(options);
      }

      if (this.isWeek(unitType)) {
        this.handleWeek(options);
      }

      if (this.isMonth(unitType)) {
        this.handleMonth(options);
      }

      if (this.isYear(unitType)) {
        this.handleYear(options);
      }

      this.unitType = unitType;
      return this.cronTax;
    }

    throw new Error('Invalid unit type');
  }

  isValidUnit(unitType) {
    return typeof unitType === 'string' && this.unitList().indexOf(unitType) >= 0;
  }

  isMinute(unitType) {
    const start = 0;
    const end = this.unitList().indexOf('m') + 1;
    return (
      this.unitList()
        .slice(start, end)
        .indexOf(unitType) >= 0
    );
  }

  timeHelper(unitType, startUnit, endUnit) {
    const start = this.unitList().indexOf(startUnit);
    const end = this.unitList().indexOf(endUnit) + 1;
    return (
      this.unitList()
        .slice(start, end)
        .indexOf(unitType) >= 0
    );
  }

  isHour(unitType) {
    return this.timeHelper(unitType, 'hours', 'h');
  }

  isDay(unitType) {
    return this.timeHelper(unitType, 'days', 'd');
  }

  isWeek(unitType) {
    return this.timeHelper(unitType, 'weeks', 'w');
  }

  isMonth(unitType) {
    return this.timeHelper(unitType, 'months', 'mm');
  }

  isYear(unitType) {
    return this.timeHelper(unitType, 'years', 'y');
  }
}

module.exports = function() {
  return new CronTax();
};
