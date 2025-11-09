// TODO: Implement these core functions
let books = [
    { id: 1, title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", price: 29.99, stock: 10 },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", price: 24.5, stock: 5 },
    { id: 3, title: "You Don't Know JS", author: "Kyle Simpson", price: 19.99, stock: 8 },
    { id: 4, title: "Introduction to Algorithms", author: "Cormen, Leiserson, Rivest & Stein", price: 89.0, stock: 3 },
    { id: 5, title: "Eloquent JavaScript", author: "Marijn Haverbeke", price: 17.5, stock: 12 },
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
}
interface Cart {
    items: CartItem[];
    total: number;
}

const calculateTotal = (cart: Cart) => {
    // Calculates total price of all items in cart
    // Apply 10% tax
    const taxMultiplier = 1.1;
    let cartPrice = 0;

    cart.items.forEach((item) => (cartPrice += item.amount * item.price * taxMultiplier));

    return Math.round(cartPrice * 100) / 100;
};

const addToCart = (bookId: number, quantity: number) => {
    // Adds book to shopping cart
    // Returns updated cart object
    const cart: Cart = { items: [], total: 0 };
    const bookToBuy = books.find((book) => book.id === bookId);
    if (!bookToBuy) return cart;
    const orderItem = { ...bookToBuy, amount: quantity };
    cart.items.push(orderItem);
    const price = calculateTotal(cart);
    return { ...cart, total: price };
};
// console.log("addToCart", addToCart(1, 3));

const processPayment = (cartTotal: number, paymentMethod: "cash" | "grass" | "ass" = "cash") => {
    // Processes payment (simulate with random success/failure)
    // Returns { success: boolean, transactionId: string }
    const wallet = Math.floor(Math.random() * 200);
    if (wallet < cartTotal) return { success: false, transactionId: "" };
    return { success: true, transactionId: `${wallet}${Math.round(cartTotal)}${paymentMethod}`.toString() };
};
// console.log("processPayment", processPayment(98.97));

const updateInventory = (cart: Cart) => {
    // Reduces stock for all books in cart
    // Throws error if any book is out of stock
    const isAllBooksInStock = cart.items.every((item) => books.every((book) => item.amount < book.stock));
    if (!isAllBooksInStock) throw new Error("Can't complete purchase due to item out of stock.");
    for (let i = 0; i < cart.items.length; i++) {
        const cartItem = cart.items[i];
        const bookToUpdate = books.find((book) => cartItem.id === book.id);
        if (bookToUpdate) {
            bookToUpdate.stock -= cartItem.amount;
        }
    }
};

// MAIN INTEGRATION FUNCTION

const completePurchase = (
    bookId: number,
    quantity: number,
    paymentMethod: "cash" | "grass" | "ass" = "cash",
    searchQuery?: Query
) => {
    // TODO: Integrate all functions above
    try {
        // 1. Search for books
        if (searchQuery) searchBooks(searchQuery); //! WHY THOUGH?
        // 2. Add to cart  // 3. Calculate total
        const cart = addToCart(bookId, quantity);
        console.log("cart", cart);
        // 4. Process payment
        processPayment(cart.total, paymentMethod);
        // 5. Update inventory
        updateInventory(cart);
        // 6. Return order confirmation
        return books;
    } catch (error) {
        console.error(error);
    }
};
console.log("completePurchase", completePurchase(1, 11, "cash"));

export { searchBooks, addToCart, calculateTotal, processPayment, updateInventory, completePurchase };
