import { addChangeListenerToMql, removeChangeListenerFromMql } from './mql-registry.listeners';

describe('mql-listeners', () => {
  describe('addChangeListenerToMql()', () => {
    it('should use addEventListener in modern browsers', () => {
      const onChange = jest.fn();
      const mql = window.matchMedia('(min-width: 768px)');

      addChangeListenerToMql(mql, onChange);

      expect(mql.addEventListener).toHaveBeenCalledWith('change', onChange);
    });

    it('should fallback to addListener when addEventListener is not supported', () => {
      const onChange = jest.fn();
      const legacyMql = { addListener: jest.fn() } as any;

      addChangeListenerToMql(legacyMql, onChange);

      expect(legacyMql.addListener).toHaveBeenCalledWith(onChange);
    });
  });

  describe('removeChangeListenerFromMql()', () => {
    it('should use removeEventListener in modern browsers', () => {
      const onChange = jest.fn();
      const mql = window.matchMedia('(min-width: 768px)');

      removeChangeListenerFromMql(mql, onChange);

      expect(mql.removeEventListener).toHaveBeenCalledWith('change', onChange);
    });

    it('should fallback to removeListener when removeEventListener is not supported', () => {
      const onChange = jest.fn();
      const legacyMql = { removeListener: jest.fn() } as any;

      removeChangeListenerFromMql(legacyMql, onChange);

      expect(legacyMql.removeListener).toHaveBeenCalledWith(onChange);
    });
  });
});
