import {
    arrayUniquer,
    calculateShoppingCart,
    dateFormatter,
    orderItem,
    passwordValidator,
    stringCalculator,
} from "./assignment2";

test("Dateformatter", () => {
    // expect(dateFormatter(null)).toBe("");
    expect(dateFormatter("rosettacode")).toBe("");
    expect(dateFormatter("2025-11-06")).toBe("11/06/2025");
    expect(dateFormatter(new Date("2021-1-1"))).toBe("01/01/2021");
    expect(dateFormatter("10/29/1981")).toBe("10/29/1981");
});
test("Password-validator", () => {
    expect(passwordValidator("rosettacode")).toBe(false);
    expect(passwordValidator("rosettacode1")).toBe(true);
    expect(passwordValidator("1234567")).toBe(false);
});
test("Calculate shopping cart", () => {
    const order1: orderItem[] = [{ price: 10, quantity: 1 }];
    const order2: orderItem[] = [{ price: 10, quantity: 2 }];
    const order3: orderItem[] = [
        { price: 11, quantity: 2 },
        { price: 22, quantity: 3 },
        { price: 33, quantity: 4 },
        { price: 44, quantity: 1 },
    ];
    expect(calculateShoppingCart([])).toBe(0);
    expect(calculateShoppingCart(order1)).toBe(10);
    expect(calculateShoppingCart(order2)).toBe(20);
    expect(calculateShoppingCart(order3)).toBe(264);
});

test("arrayUniquer", () => {
    expect(arrayUniquer(["rosettacode"])).toEqual(["rosettacode"]);
    expect(arrayUniquer(["rosettacode", "rosettacode", 1])).toEqual(["rosettacode", 1]);
    expect(arrayUniquer(["rosettacode", 1, 1, 1, 1, "rosettacode", "beans", true])).toEqual([
        "rosettacode",
        1,
        "beans",
        true,
    ]);
});
test("stringCalc", () => {
    expect(stringCalculator("")).toBe(0);
    expect(stringCalculator("ba,22")).toBe(NaN);
    expect(stringCalculator("11,22")).toBe(33);
    expect(stringCalculator("22")).toBe(22);
});
