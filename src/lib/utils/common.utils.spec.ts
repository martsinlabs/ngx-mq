import { normalizeQuery } from './common.utils';

describe('normalizeQuery', () => {
  it('should trim spaces and lowercase query', () => {
    const input: string = '  (Min-Width:  768px)  ';
    const expectedOutput: string = '(min-width: 768px)';
    expect(normalizeQuery(input)).toBe(expectedOutput);
  });
});
