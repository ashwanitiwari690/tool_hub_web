import { TestBed } from '@angular/core/testing';
import { JsonFormatter } from './json-formatter';

describe('JsonFormatter', () => {
  let component: JsonFormatter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [JsonFormatter] }).compileComponents();
    component = TestBed.createComponent(JsonFormatter).componentInstance;
  });

  it('formats valid JSON with indentation', () => {
    component.input.set('{"a":1,"b":2}');
    component.format();
    expect(component.output()).toBe('{\n  "a": 1,\n  "b": 2\n}');
    expect(component.error()).toBe('');
  });

  it('minifies valid JSON', () => {
    component.input.set('{\n  "a": 1\n}');
    component.minify();
    expect(component.output()).toBe('{"a":1}');
  });

  it('reports an error for invalid JSON', () => {
    component.input.set('{a:1}');
    component.format();
    expect(component.output()).toBe('');
    expect(component.error()).toContain('Invalid JSON');
  });

  it('requires input before formatting', () => {
    component.input.set('');
    component.format();
    expect(component.error()).toContain('enter some JSON');
  });

  it('validates valid and invalid JSON', () => {
    component.input.set('{"ok":true}');
    component.validate();
    expect(component.output()).toContain('Valid JSON');

    component.input.set('{ok:true}');
    component.validate();
    expect(component.error()).toContain('Invalid JSON');
  });

  it('clears everything on reset()', () => {
    component.input.set('{"a":1}');
    component.format();
    component.reset();
    expect(component.input()).toBe('');
    expect(component.output()).toBe('');
    expect(component.error()).toBe('');
  });
});
