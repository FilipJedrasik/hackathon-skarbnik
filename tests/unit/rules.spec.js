import Rules from './../../src/rules';

const ruleTest = (key, val) => Rules[key].filter(v => v(val) === true).length > 0;

describe('Rules test', () => {
  it('notEmptyRules - success for non empty', () => {
    const exec = Rules.notEmptyRules[0]('a');
    expect(exec).toBeTruthy();
  })

  it('notEmptyRules - error for empty', () => {
    const exec = Rules.notEmptyRules[0]('');
    expect(typeof exec === 'string').toBe(true);
  })

  it('classnameRules - success for proper', () => {
    const exec = typeof Rules.classnameRules[0]('4TI2') === 'boolean' && typeof Rules.classnameRules[1]('4TI2') === 'boolean';
    expect(exec).toBe(true);
  })

  it('classnameRules - fail for too short', () => {
    const exec = typeof Rules.classnameRules[1]('4a') === 'string';
    expect(exec).toBe(true);
  })

  it('classnameRules - fail for bad syntax', () => {
    const exec = typeof Rules.classnameRules[2]('a1') === 'string';
    expect(exec).toBe(true);
  })

  it('nameRules - error for empty', () => {
    const exec = typeof Rules.nameRules[0]('') === 'string';
    expect(exec).toBe(true);
  })

  it('nameRules - error for too short', () => {
    const exec = ruleTest('nameRules', 'Dar');
    expect(exec).toBe(true);
  })
})
