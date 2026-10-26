import test from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeComplexNumber,
  analyzeEllipse,
  calculateMastery,
  MINISTERIAL_PROBLEMS_BANK,
} from './mathSolver.ts';

test('analyzeComplexNumber correctly computes modulus and argument for z = 1 - sqrt(3)i (Quadrant 4)', () => {
  const result = analyzeComplexNumber(1, -Math.sqrt(3));
  assert.equal(Math.round(result.modulus), 2);
  assert.equal(result.quadrant, 4);
  assert.equal(result.argumentFormatted, '\\frac{5\\pi}{3}');
  assert.ok(result.polarForm.includes('\\cos(\\frac{5\\pi}{3})'));
});

test('analyzeComplexNumber correctly handles pure imaginary number z = 2i', () => {
  const result = analyzeComplexNumber(0, 2);
  assert.equal(result.modulus, 2);
  assert.equal(result.argumentFormatted, '\\frac{\\pi}{2}');
  assert.equal(result.quadrant, 0);
});

test('analyzeEllipse calculates correct major/minor axes and eccentricity', () => {
  const ellipse = analyzeEllipse(5, 3, 'x');
  assert.equal(ellipse.a, 5);
  assert.equal(ellipse.b, 3);
  assert.equal(ellipse.c, 4); // 25 - 9 = 16 => c = 4
  assert.equal(ellipse.eccentricity, 0.8);
  assert.ok(ellipse.standardEquation.includes('\\frac{x^2}{25}'));
});

test('calculateMastery aggregates student progress and assigns ministerial readiness category', () => {
  const sampleProgress = {
    complex_numbers: { solved: 10, total: 10, accuracy: 95 },
    conic_sections: { solved: 8, total: 10, accuracy: 90 },
    differentiation: { solved: 9, total: 10, accuracy: 88 },
  };
  const mastery = calculateMastery(sampleProgress);
  assert.ok(mastery.overallScore >= 80);
  assert.ok(mastery.ministerialReadiness.length > 0);
});

test('MINISTERIAL_PROBLEMS_BANK includes Iraqi curriculum chapters with full steps', () => {
  assert.ok(MINISTERIAL_PROBLEMS_BANK.length >= 5);
  const demoivre = MINISTERIAL_PROBLEMS_BANK.find(p => p.id === 'demoivre-2023-1');
  assert.ok(demoivre);
  assert.equal(demoivre.branch, 'علمي');
  assert.ok(demoivre.steps.length >= 4);
  assert.equal(demoivre.marks, 10);
});
