import { runInInjectionContext, Component } from '@angular/core';
import { retainUntilDestroy } from './mql-registry.extensions';
import { TestBed } from '@angular/core/testing';
import * as registry from './mql-registry';

@Component({ standalone: true, template: `` })
class HostComponent {}

describe('retainUntilDestroy', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
  });

  it('should call release when destroy is triggered', () => {
    const releaseSpy = jest.spyOn(registry, 'release');
    const fixture = TestBed.createComponent(HostComponent);
    const injector = fixture.componentRef.injector;

    runInInjectionContext(injector, () => retainUntilDestroy('(min-width: 768px)'));
    fixture.destroy();

    expect(releaseSpy).toHaveBeenCalled();
  });
});
