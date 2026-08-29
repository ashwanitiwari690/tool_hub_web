import { TestBed } from '@angular/core/testing';
import { CaseConverter } from './case-converter';

describe('CaseConverter', () => {
  let component: CaseConverter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CaseConverter] }).compileComponents();
    component = TestBed.createComponent(CaseConverter).componentInstance;
  });

  it('converts to uppercase and lowercase', () => {
    component.text.set('Hello World');
    component.convert('upper');
    expect(component.result()).toBe('HELLO WORLD');
    component.convert('lower');
    expect(component.result()).toBe('hello world');
  });

  it('converts to title case', () => {
    component.text.set('the quick brown fox');
    component.convert('title');
    expect(component.result()).toBe('The Quick Brown Fox');
  });

  it('converts to camelCase, snake_case and kebab-case', () => {
    component.text.set('hello world example');
    component.convert('camel');
    expect(component.result()).toBe('helloWorldExample');
    component.convert('snake');
    expect(component.result()).toBe('hello_world_example');
    component.convert('kebab');
    expect(component.result()).toBe('hello-world-example');
  });

  it('produces no result for empty input', () => {
    component.text.set('');
    component.convert('upper');
    expect(component.result()).toBe('');
  });

  it('clears text and result on reset()', () => {
    component.text.set('abc');
    component.convert('upper');
    component.reset();
    expect(component.text()).toBe('');
    expect(component.result()).toBe('');
  });
});
