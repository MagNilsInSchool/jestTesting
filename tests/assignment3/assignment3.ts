// TODO: Implement these core functions
export let books = [
    { id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", price: 29.99, stock: 10 },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", price: 24.5, stock: 5 },
    { id: 3, title: "You Don't Know JS", author: "Kyle Simpson", price: 19.99, stock: 8 },
    { id: 4, title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest & Stein", price: 89.0, stock: 3 },
    { id: 5, title: "Eloquent JavaScript", author: "Marijn Haverbeke", price: 17.5, stock: 100 },
];

interface Query {
    key?: "title" | "author";
    value: string;
}

const searchBooks = (query: Query) => {
    // Returns array of book objects matching search
    // Books should have: id, title, author, price, stock
    const { key = "title", value } = query;
    if (!value) return [];
    return books.filter((book) => book[key].toLowerCase().includes(value.toLowerCase()));
};

// console.log("Searchbooks:", searchBooks({ value: "the" }));

interface CartItem {
    id: number;
    title: string;
    author: string;
    price: number;
    amount: number;
    stock: number;
}
interface Cart {
    items: CartItem[];
    total: number;
}
export const roundToTwoDecimals = (number: number) => {
    return Math.round(number * 100) / 100;
};
const calculateTotal = (cart: Cart) => {
    // Calculates total price of all items in cart
    // Apply 10% tax
    const taxMultiplier = 1.1;
    let cartPrice = 0;

    cart.items.forEach((item) => (cartPrice += item.amount * item.price * taxMultiplier));

    return roundToTwoDecimals(cartPrice);
};
interface BooksToBuy {
    bookId: number;
    quantity: number;
}
const addToCart = (booksToBuy: BooksToBuy[]) => {
    // Adds book to shopping cart
    // Returns updated cart object

    const cart: Cart = { items: [], total: 0 };
    booksToBuy.forEach((bookToBuy) => {
        const book = books.find((book) => book.id === bookToBuy.bookId);
        if (!book) return cart;
        const orderItem = { ...book, amount: bookToBuy.quantity };
        cart.items.push(orderItem);
    });

    const price = calculateTotal(cart);
    return { ...cart, total: price };
};
// console.log("addToCart", addToCart(1, 3));

const processPayment = (cartTotal: number, paymentMethod: "cash" | "grass" | "ass" = "cash") => {
    // Processes payment (simulate with random success/failure)
    //! NOT DOING RANDOM. CAUSE HOW DO YOU TEST FOR IT?
    // Returns { success: boolean, transactionId: string }
    const wallet = 1200;
    if (wallet < cartTotal) throw new Error("You are poor and can't afford it.");
    return {
        success: true,
        transactionId: `${wallet}${Math.floor(Math.random() * Math.round(cartTotal))}${paymentMethod}`.toString(),
    };
};
// console.log("processPayment", processPayment(98.97));

const updateInventory = (cart: Cart) => {
    // Reduces stock for all books in cart
    // Throws error if any book is out of stock
    const isAllBooksInStock = cart.items.every((item) => {
        const book = books.find((book) => book.id === item.id);
        return book !== undefined && item.amount <= book.stock;
    });
    if (!isAllBooksInStock) throw new Error("Can't complete purchase due to item out of stock.");
    for (let i = 0; i < cart.items.length; i++) {
        const cartItem = cart.items[i];
        const bookToUpdate = books.find((book) => cartItem.id === book.id);
        if (bookToUpdate) {
            bookToUpdate.stock -= cartItem.amount;
            cartItem.stock -= cartItem.amount;
        }
    }
};

// MAIN INTEGRATION FUNCTION

const completePurchase = (
    booksToBuy: BooksToBuy[],
    paymentMethod: "cash" | "grass" | "ass" = "cash",
    searchQuery?: Query
) => {
    // TODO: Integrate all functions above
    try {
        // 1. Search for books
        if (searchQuery) searchBooks(searchQuery); //! WHY THOUGH?
        // 2. Add to cart  // 3. Calculate total
        const cart = addToCart(booksToBuy);
        // 4. Process payment
        const orderResponse = processPayment(cart.total, paymentMethod);

        // 5. Update inventory
        updateInventory(cart);
        // 6. Return order confirmation
        return { ...cart, ...orderResponse };
    } catch (error) {
        if (error instanceof Error) return { success: false, message: error.message };
        console.error(error);
    }
};
// console.log(
//     "completePurchase",
//     completePurchase(
//         [
//             { bookId: 1, quantity: 1 },
//             { bookId: 2, quantity: 1 },
//         ],
//         "cash"
//     )
// );

export { searchBooks, addToCart, calculateTotal, processPayment, updateInventory, completePurchase };
