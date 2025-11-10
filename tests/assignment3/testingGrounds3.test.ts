import { books, completePurchase, roundToTwoDecimals } from "./assignment3";

describe("Bookstore Integration Tests", () => {
    describe("Successful Purchase Flow", () => {
        test("should complete entire purchase process successfully", () => {
            // TODO: Test happy path
            // Search → Add to cart → Calculate → Payment → Update inventory
            const result = completePurchase([{ bookId: 1, quantity: 1 }]);
            expect(result).toEqual({
                success: true,
                transactionId: expect.any(String),
                total: roundToTwoDecimals(29.99 * 1.1),
                items: [
                    {
                        id: 1,
                        title: "The Pragmatic Programmer",
                        author: "Andrew Hunt & David Thomas",
                        price: 29.99,
                        amount: 1,
                        stock: 9,
                    },
                ],
            });
            const book1 = books.find((book) => book.id === 1);
            expect(book1?.stock).toBe(9);
        });

        test("should handle multiple books in cart", () => {
            // TODO: Test purchasing 2 different books
            const result = completePurchase([
                { bookId: 2, quantity: 2 },
                { bookId: 3, quantity: 1 },
            ]);
            const totalPrice = (49 + 19.99) * 1.1;
            expect(result).toEqual({
                success: true,
                transactionId: expect.any(String),
                total: roundToTwoDecimals(totalPrice),
                items: [
                    { id: 2, title: "Clean Code", author: "Robert C. Martin", price: 24.5, amount: 2, stock: 3 },
                    { id: 3, title: "You Don't Know JS", author: "Kyle Simpson", price: 19.99, amount: 1, stock: 7 },
                ],
            });
            const book2 = books.find((book) => book.id === 2);
            expect(book2?.stock).toBe(3);
        });
    });

    describe("Error Handling", () => {
        test("should fail when book is out of stock", () => {
            // TODO: Test inventory validation
            const result = completePurchase([{ bookId: 4, quantity: 11 }]);
            expect(result).toEqual({
                success: false,
                message: "Can't complete purchase due to item out of stock.",
            });
            const book4 = books.find((book) => book.id === 4);
            expect(book4?.stock).toBe(3);
        });

        test("should handle payment failure gracefully", () => {
            // TODO: Test when payment processing fails
            const result = completePurchase([
                { bookId: 4, quantity: 3 },
                { bookId: 5, quantity: 50 },
            ]);
            expect(result).toEqual({
                success: false,
                message: "You are poor and can't afford it.",
            });
        });

        test("should not update inventory if payment fails", () => {
            // TODO: Important business logic test!
            const result = completePurchase([
                { bookId: 4, quantity: 3 },
                { bookId: 5, quantity: 50 },
            ]);
            expect(result).toEqual({
                success: false,
                message: "You are poor and can't afford it.",
            });
            const book4 = books.find((book) => book.id === 4);
            expect(book4?.stock).toBe(3);
        });
    });
});
