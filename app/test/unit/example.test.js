const sum = require('../../sum');

test('adiciona 1 + 2 para igual a 3', () => {
  expect(sum(1, 2)).toBe(3);
});
