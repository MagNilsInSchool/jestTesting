import { fizzbuzz, anagram, formatPhoneNumber, checksumChecker, levenshteinDistance } from "./assignment1";
test("Levenshtein distance", () => {
    expect(levenshteinDistance("kitten", "sitting")).toEqual(3);
    expect(levenshteinDistance("rosettacode", "raisethysword")).toEqual(8);
});
test("Isbn validation", () => {
    expect(checksumChecker("9780306406157")).toBe(true);
    expect(checksumChecker("123456789X")).toBe(true);
    expect(checksumChecker("333456789X")).toBe(false);
    expect(checksumChecker("0 471 60695 2")).toBe(true);
    expect(checksumChecker("978-0-262-13472-9")).toBe(true);
    expect(checksumChecker("978-0-262-13472-1")).toBe(false);
});
test("Phone number formatter", () => {
    expect(formatPhoneNumber("1234567890")).toEqual("(123) 456-7890");
    expect(formatPhoneNumber("0123456789")).toEqual("(012) 345-6789");
    expect(formatPhoneNumber("012345678922")).toEqual("Invalid phone number");
    expect(formatPhoneNumber("1234B67890")).toEqual("Invalid phone number");
});

test("anagram test", () => {
    expect(anagram("listen", "silent")).toBe(true);
    expect(anagram("alladdin", "allaadin")).toBe(false);
    expect(anagram("hello", "hella")).toBe(false);
    expect(anagram("hello", "helloo")).toBe(false);
});
test("fizzbuzz test", () => {
    for (let i = 1; i < 100; i++) {
        if (i % 15 === 0) {
            expect(fizzbuzz(i)).toEqual("fizzbuzz");
            continue;
        }
        if (i % 5 === 0) {
            expect(fizzbuzz(i)).toEqual("buzz");
            continue;
        }
        if (i % 3 === 0) {
            expect(fizzbuzz(i)).toEqual("fizz");
            continue;
        }
        expect(fizzbuzz(i)).toEqual(String(i));
    }
});
