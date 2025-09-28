import { retain, release } from './mql-registry';
import { MqRetainRef } from './mql-registry.models';

describe('MqlRegistry', () => {
  const query: string = '(min-width: 768px)';

  it('should create a new signal and token when retain is called', () => {
    const ref: MqRetainRef = retain(query);

    expect(ref.signal()).toBe(false);
    expect(typeof ref.token).toBe('symbol');

    expect(() => release(query, ref.token)).not.toThrow();
  });

  it('should return the same signal when retain is called multiple times for the same query', () => {
    const ref1: MqRetainRef = retain(query);
    const ref2: MqRetainRef = retain(query);

    expect(ref1.signal).toBe(ref2.signal);
    expect(ref1.token).not.toBe(ref2.token);

    release(query, ref1.token);
    release(query, ref2.token);
  });

  it('should safely ignore release with an unknown token', () => {
    const ref: MqRetainRef = retain(query);

    expect(() => release(query, Symbol('fake-token'))).not.toThrow();

    release(query, ref.token);
  });
});
