import { TestBed } from '@angular/core/testing';
import { PercentageCalculator } from './percentage-calculator';

describe('PercentageCalculator', () => {
  let component: PercentageCalculator;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PercentageCalculator] }).compileComponents();
    component = TestBed.createComponent(PercentageCalculator).componentInstance;
  });

  it('calculates "% of a number"', () => {
    component.setMode('of');
    component.a.set(20);
    component.b.set(50);
    expect(component.result()).toBe('10');
  });

  it('calculates "X is what % of Y"', () => {
    component.setMode('isWhatPercent');
    component.a.set(40);
    component.b.set(200);
    expect(component.result()).toBe('20%');
  });

  it('calculates percentage change (increase and decrease)', () => {
    component.setMode('change');
    component.a.set(100);
    component.b.set(150);
    expect(component.result()).toBe('50%');

    component.a.set(100);
    component.b.set(50);
    expect(component.result()).toBe('-50%');
  });

  it('returns null instead of NaN/Infinity for invalid input', () => {
    component.setMode('isWhatPercent');
    component.a.set(10);
    component.b.set(0);
    expect(component.result()).toBeNull();
  });

  it('returns null when inputs are empty', () => {
    component.a.set(null);
    component.b.set(null);
    expect(component.result()).toBeNull();
  });

  it('clears inputs on reset()', () => {
    component.a.set(5);
    component.b.set(10);
    component.reset();
    expect(component.a()).toBeNull();
    expect(component.b()).toBeNull();
  });
});
