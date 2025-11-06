/*1. 
Date Formatter 

Goal: Create a function that takes a date object or a date string and formats it as a simple string. 

Mini-Test Cases (Red Phase) 

Test 1: It should return an empty string for null/undefined input. 
Focus: Handling Edge Cases. 

Test 2: It should correctly format a given Date object (e.g., new Date('2025-11-06')) to 11/05/2025. 
Focus: Basic Data Transformation. 

Test 3: It should correctly format a different Date object to ensure the logic is generic. 
Focus: Triangulation (ensuring the code isn't hardcoded). */

export const dateFormatter = (date: string | Date): string => {
    if (date == null) return "";
    const dateToCheck = typeof date === "string" ? new Date(date) : date;
    if (!(dateToCheck instanceof Date) || isNaN(dateToCheck.getTime())) return "";
    const year = dateToCheck.getFullYear();
    const month = (dateToCheck.getMonth() + 1).toString().padStart(2, "0");
    const day = dateToCheck.getDate().toString().padStart(2, "0");
    return `${month}/${day}/${year}`;
};

/*2. Simple Password Validator 

Goal: Create a function that checks a password string against two basic rules. 

Mini-Test Cases (Red Phase) 

Test 1: It should return false if the password is less than 8 characters long. 
Focus: Testing a Single Rule. 

Test 2: It should return false if the password does not contain at least one number. 
Focus: Testing a Second Rule (requires regular expression or iteration). 

Test 3: It should return true if the password is 8+ characters and contains at least one number. 
Focus: Testing Success Case for both rules. */

export const passwordValidator = (password: string): boolean => {
    if (password.length < 8) return false;
    if (!/\d/.test(password)) return false;
    return true;
};

/*3. Shopping Cart Totaler 

Goal: Create a function to calculate the total cost of a simple list of items. 

Mini-Test Cases (Red Phase) 

Test 1: It should return 0 for an empty array input. 
Focus: Testing the Empty State. 

Test 2: It should correctly sum the price of a single item (e.g., [{ price: 10, quantity: 1 }]). 
Focus: Testing the Minimum Viable Case. 

Test 3: It should correctly sum the total for multiple items (e.g., [{ price: 5, quantity: 2 }, { price: 10, quantity: 1 }] should equal 20). 
Focus: Handling Multiplication and Summation. */

export interface orderItem {
    price: number;
    quantity: number;
}
export const calculateShoppingCart = (cart: orderItem[]): number => {
    if (cart.length === 0) return 0;
    let price = 0;
    cart.forEach((item) => (price += item.price * item.quantity));
    return price;
};

/*4. Array Uniquer 

Goal: Create a function that removes duplicate values from an array of numbers. 

Mini-Test Cases (Red Phase) 

Test 1: It should return the original array if it contains no duplicates (e.g., [1, 2, 3]). 
Focus: Testing No Change Scenario. 

Test 2: It should return an array with only unique values when duplicates are present (e.g., [1, 1, 2, 3, 2] should return [1, 2, 3]). 
Focus: Testing the Core Logic (using Set or looping logic). 

Test 3: It should handle and remove multiple sequential duplicates (e.g., [5, 5, 5]). 
Focus: Testing Repetitive Duplicates. */

export const arrayUniquer = (array: any[]): any[] => {
    if (array.length === 0) return [];
    const uniqueArray = new Set(array);
    return Array.from(uniqueArray);
};

/*5. Simple String Calculator 

Goal: Create a function that adds numbers provided in a simple string format, starting with the simplest case. 

Mini-Test Cases (Red Phase) 

Test 1: It should return 0 for an empty string input (""). 
Focus: Testing Simplest Case (Empty Input). 

Test 2: It should return the number itself for a single number input (e.g., "5" should return 5). 
Focus: Testing Single Input. 

Test 3: It should return the sum of two numbers separated by a comma (e.g., "1,2" should return 3). 
Focus: Testing Basic Delimited Input. */

export const stringCalculator = (stringToCalc: string): number => {
    if (stringToCalc == null) return 0;
    const splitInput = stringToCalc.split(",");
    if (splitInput.length === 1) return Number(splitInput[0]);
    return Number(splitInput[0]) + Number(splitInput[1]);
};
