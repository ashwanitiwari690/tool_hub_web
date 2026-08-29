import { TestBed } from '@angular/core/testing';
import { WordCounter } from './word-counter';

describe('WordCounter', () => {
  let component: WordCounter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [WordCounter] }).compileComponents();
    component = TestBed.createComponent(WordCounter).componentInstance;
  });

  it('reports zero counts for empty input', () => {
    component.text.set('');
    expect(component.words()).toBe(0);
    expect(component.characters()).toBe(0);
    expect(component.sentences()).toBe(0);
    expect(component.paragraphs()).toBe(0);
  });

  it('counts words, characters and sentences correctly', () => {
    component.text.set('Hello world. This is ToolNova!');
    expect(component.words()).toBe(5);
    expect(component.characters()).toBe(30);
    expect(component.sentences()).toBe(2);
  });

  it('counts paragraphs separated by blank lines', () => {
    component.text.set('First paragraph.\n\nSecond paragraph.');
    expect(component.paragraphs()).toBe(2);
  });

  it('resets all input on reset()', () => {
    component.text.set('some text');
    component.reset();
    expect(component.text()).toBe('');
    expect(component.words()).toBe(0);
  });
});
