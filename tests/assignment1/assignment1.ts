/*Write a program that prints the numbers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".

Sample output:

1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16
17
Fizz
19
Buzz
... etc up to 100*/

export const fizzbuzz = (number: number): string => {
    return number % 15 === 0 ? "fizzbuzz" : number % 5 === 0 ? "buzz" : number % 3 === 0 ? "fizz" : String(number);
};

export const anagram = (word1: string, word2: string): boolean => {
    if (word1.length !== word2.length) return false;

    const word1Array = word1.split("");
    const uniqueLetters = new Set(word1Array);
    const word2Array = word2.split("");

    for (const uniqueLetter of uniqueLetters) {
        const amountOfUniqueLetterInWord1 = word1Array.filter((letter) => letter === uniqueLetter).length;
        const amountOfUniqueLetterInWord2 = word2Array.filter((letter) => letter === uniqueLetter).length;

        if (amountOfUniqueLetterInWord1 !== amountOfUniqueLetterInWord2) {
            return false;
        }
    }

    return true;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
    if (!/^\d{10}$/.test(phoneNumber)) return "Invalid phone number";
    const start = phoneNumber.slice(0, 3);
    const middle = phoneNumber.slice(3, 6);
    const end = phoneNumber.slice(6, 10);
    return `(${start}) ${middle}-${end}`;
};

/*ISBN - International Standard Book Number
-----------------------------------------
There are two ISBN standards: ISBN-10 and ISBN-13. Support for ISBN-13 is essential, whereas support for ISBN-10 is optional.
Here are some valid examples of each:

ISBN-10:
0471958697
0 471 60695 2
0-470-84525-2
0-321-14653-0

ISBN-13:
9780470059029
978 0 471 48648 0
978-0596809485
978-0-13-149505-0
978-0-262-13472-9

ISBN-10 is made up of 9 digits plus a check digit (which may be 'X') and ISBN-13 is made up of 12 digits plus a check digit. Spaces and hyphens may be included in a code, but are not significant. This means that 9780471486480 is equivalent to 978-0-471-48648-0 and 978 0 471 48648 0.

The check digit for ISBN-10 is calculated by multiplying each digit by its position (i.e., 1 x 1st digit, 2 x 2nd digit, etc.), summing these products together and taking modulo 11 of the result (with 'X' being used if the result is 10).

The check digit for ISBN-13 is calculated by multiplying each digit alternately by 1 or 3 (i.e., 1 x 1st digit, 3 x 2nd digit, 1 x 3rd digit, 3 x 4th digit, etc.), summing these products together, taking modulo 10 of the result and subtracting this value from 10, and then taking the modulo 10 of the result again to produce a single digit.


Basic task:
Create a function that takes a string and returns true if that is a valid ISBN-13 and false otherwise.

Advanced task:
Also return true if the string is a valid ISBN-10.*/

export const checksumChecker = (isbn: string): boolean => {
    const cleanedIsbn = isbn.replace(/[\s-]+/g, "");

    if (![10, 13].includes(cleanedIsbn.length)) return false;

    if (cleanedIsbn.length === 10) {
        let numberToCheck = 0;
        for (let i = 0; i < 9; i++) {
            numberToCheck += Number(cleanedIsbn[i]) * (i + 1);
        }
        const checksum = numberToCheck % 11 === 10 ? "x" : numberToCheck % 11;
        return cleanedIsbn[9].toLowerCase() === checksum.toString();
    }

    if (cleanedIsbn.length === 13) {
        let numberToCheck = 0;
        for (let i = 0; i < 12; i++) {
            if (i % 2 === 0) {
                numberToCheck += Number(cleanedIsbn[i]);
                continue;
            }
            numberToCheck += Number(cleanedIsbn[i]) * 3;
        }
        const nonsense = (10 - (numberToCheck % 10)) % 10;
        return Number(cleanedIsbn[12]) === nonsense;
    }
    return false;
};

/*In information theory and computer science, the Levenshtein distance is a metric for measuring the amount of difference between two sequences (i.e. an edit distance). The Levenshtein distance between two strings is defined as the minimum number of edits needed to transform one string into the other, with the allowable edit operations being insertion, deletion, or substitution of a single character.

Examples:
The Levenshtein distance between "kitten" and "sitting" is 3, since the following three edits change one into the other, and there isn't a way to do it with fewer than three edits:

              kitten   sitten    (substitution of 'k' with 's')
              sitten   sittin    (substitution of 'e' with 'i')
              sittin   sitting   (insert 'g' at the end).

The Levenshtein distance between "rosettacode", "raisethysword" is 8.

Note:
The distance between two strings is same as that when both strings are reversed.

Task:
Implements a Levenshtein distance function, or uses a library function.
Show the Levenshtein distance between "kitten" and "sitting".*/

export const levenshteinDistance = (word1: string, word2: string): number => {
    let distance = 0;
    if (word1 === word2) return distance;
    const word1Array = word1.split("");
    const word2Array = word2.split("");

    let iteration = 0;
    while (word1Array.length !== word2Array.length || !word2Array.every((letter, i) => letter === word1Array[i])) {
        const word1Letter = word1Array[iteration];
        const word2Letter = word2Array[iteration];
        const word1NextLetter = word1Array[iteration + 1];
        const word2NextLetter = word2Array[iteration + 1];

        if (word1Letter !== word2Letter && word1Letter === word2NextLetter) {
            word1Array.splice(iteration, 0, word2Letter);
            distance++;
            continue;
        }

        if (word1Letter !== word2Letter && word1NextLetter === word2Letter) {
            word1Array.splice(iteration, 1);
            distance++;
            continue;
        }

        if (word1Letter !== word2Letter) {
            word1Array[iteration] = word2Letter;
            distance++;
            continue;
        }
        if (
            iteration === word2Array.length - 1 &&
            word1Letter === word2Letter &&
            word1Array.length > word2Array.length
        ) {
            word1Array.pop();
            distance++;
            continue;
        }

        iteration++;
    }

    return distance;
};
console.log(levenshteinDistance("rosettacode", "raisethysword"));
// console.log("rosettacode1", "rosettacode".length);
// console.log("raisethysword2", "raisethysword".length);

// "rosettacode"-->"raisethysword"

// 1 "rasettacode"
// 2 "raisettacode"
// 3 "raisethacode"
// 4 "raisethycode"
// 5 "raisethysode"
// 6 "raisethyswode"
// 7 "raisethyswore"
// 8 "raisethysword"
