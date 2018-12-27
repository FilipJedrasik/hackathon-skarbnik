import { daysBetween } from '../../src/daysBetween';

describe('Days between function test', () => {

  it('Same month difference', () => {
    const diff = daysBetween('2018-02-10', '2018-02-23'); // 13
    expect(diff).toBe(13);
  })

  it('Another month difference', () => {
    const diff = daysBetween('2018-02-10', '2018-03-23'); // 41
    expect(diff).toBe(41);
  })

  it('Another month difference backwards', () => {
    const diff = daysBetween('2018-02-10', '2018-01-23'); // 18
    expect(diff).toBe(18);
  })

  it('Few months difference', () => {
    const diff = daysBetween('2018-02-12', '2018-07-26'); // 164
    expect(diff).toBe(164);
  })

  it('Few years difference', () => {
    const diff = daysBetween('2018-02-12', '2020-07-26'); // 895
    expect(diff).toBe(895);
  })
})