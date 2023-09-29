const api = require('../calculate');

test("testing if the method calculate returns the correct value", () => {
    expect(api.calculate(1)).toBe(true);
});