import { TestBed } from '@angular/core/testing';
import { JsonValidator } from './json-validator';

describe('JsonValidator', () => {
  let component: JsonValidator;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [JsonValidator] }).compileComponents();
    component = TestBed.createComponent(JsonValidator).componentInstance;
  });

  it('marks well-formed JSON as valid', () => {
    component.input.set('{"a":[1,2,3]}');
    component.validate();
    expect(component.status()).toBe('valid');
    expect(component.errorMessage()).toBe('');
  });

  it('marks malformed JSON as invalid with an error message', () => {
    component.input.set('{"a":1,}');
    component.validate();
    expect(component.status()).toBe('invalid');
    expect(component.errorMessage()).not.toBe('');
  });

  it('stays idle for empty input', () => {
    component.input.set('');
    component.validate();
    expect(component.status()).toBe('idle');
  });

  it('resets status on reset()', () => {
    component.input.set('{bad}');
    component.validate();
    component.reset();
    expect(component.input()).toBe('');
    expect(component.status()).toBe('idle');
  });
});
