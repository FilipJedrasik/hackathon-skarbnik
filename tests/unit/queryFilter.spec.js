import queryFilter from './../../src/queryFilter';

// queryFilter(filters, base)
// Check if there are any values in object
  // If yes go further
  // If not return base
// Check if /? exists
  // If yes add & and push other keys
  // If not add /? and push other keys
// Check if key exists with = f.e. player=5
  // If yes change value
  // If not, add

describe('queryFilter', () => {
  it('Empty object returns base', () => {
    let base = 'students/';
    let result = queryFilter({}, base);
    expect(result).toBe(base);
  });

  it('Empty values object returns base', () => {
    let base = 'students/';
    let result = queryFilter({ab: null, cd: ''}, base);
    expect(result).toBe(base);
  });

  it('Adds slash at the end if it does not exist', () => {
    let base = 'students';
    let target = 'students/';

    let result = queryFilter({}, base);
    expect(result).toBe(target);
  });

  it('Adds one param', () => {
    let base = 'students';
    let target = 'students/?name=Darek';

    let result = queryFilter({name: 'Darek'}, base);
    expect(result).toBe(target);
  });

  it('Adds few params', () => {
    let base = 'students';
    let target = 'students/?name=Darek&second=Kix&number=12';

    let result = queryFilter({name: 'Darek', second: 'Kix', number: 12}, base);
    expect(result).toBe(target);
  });

  it('Replaces one param', () => {
    let base = 'students/?name=Darek&second=Kix';
    let target = 'students/?name=Przemysław&second=Kix';

    let result = queryFilter({name: 'Przemysław', second: 'Kix'}, base);
    expect(result).toBe(target);
  });

  it('Replaces few params', () => {
    let base = 'students/?name=Darek&second=Kix&number=12';
    let target = 'students/?name=Przemysław&second=Lol&number=177';

    let result = queryFilter({name: 'Przemysław', second: 'Lol', number: 177}, base);
    expect(result).toBe(target);
  });

  it('Adds and replaces', () => {
    let base = 'students/?name=Darek&second=Kix';
    let target = 'students/?name=Przemysław&second=Lol&number=177';

    let result = queryFilter({name: 'Przemysław', second: 'Lol', number: 177}, base);
    expect(result).toBe(target);
  });
});