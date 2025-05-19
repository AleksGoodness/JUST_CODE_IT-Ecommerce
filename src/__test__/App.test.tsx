// src/__ tests __/App.test.tsx

test('demo', () => {
  expect(true).toBe(true);
});

test('TextEncoder is globally defined in Jest', () => {
  expect(globalThis.TextEncoder).toBeDefined();
});
