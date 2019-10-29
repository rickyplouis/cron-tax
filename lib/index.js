class CronTax {
  constructor() {
    this.unitType = '';
    this.everyCalled = false;
    this.cronTax = '* * * * *';
  }

  every(unitType) {
    this.everyCalled = true;
    this.unitType = unitType;
    return this;
  }

  past(hour) {
    if (this.everyCalled) {
      this.cronTax = `* ${parseInt(hour / 100, 10)} * * *`;
      return this.cronTax;
    }

    throw new Error('Must call every() first');
  }
}

module.exports = function() {
  return new CronTax();
};
