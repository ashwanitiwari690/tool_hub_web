import { TestBed } from '@angular/core/testing';
import { UnitConverter } from './unit-converter';

describe('UnitConverter', () => {
  let component: UnitConverter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [UnitConverter] }).compileComponents();
    component = TestBed.createComponent(UnitConverter).componentInstance;
  });

  it('converts length units (meters to kilometers)', () => {
    component.onCategoryChange('length');
    component.fromUnit.set('m');
    component.toUnit.set('km');
    component.inputValue.set(1000);
    expect(component.result()).toBe('1');
  });

  it('converts weight units (kilograms to grams)', () => {
    component.onCategoryChange('weight');
    component.fromUnit.set('kg');
    component.toUnit.set('g');
    component.inputValue.set(2);
    expect(component.result()).toBe('2000');
  });

  it('converts temperature using the correct formula (Celsius to Fahrenheit)', () => {
    component.onCategoryChange('temperature');
    component.fromUnit.set('c');
    component.toUnit.set('f');
    component.inputValue.set(100);
    expect(component.result()).toBe('212');
  });

  it('swaps from/to units', () => {
    component.onCategoryChange('length');
    component.fromUnit.set('m');
    component.toUnit.set('km');
    component.swap();
    expect(component.fromUnit()).toBe('km');
    expect(component.toUnit()).toBe('m');
  });

  it('returns null for empty input instead of NaN', () => {
    component.inputValue.set(null);
    expect(component.result()).toBeNull();
  });
});
