//https://app.pluralsight.com/player?course=javascript-programming-basics&author=kyle-simpson&name=javascript-programming-basics-m2&clip=9
const SPENDING_THRESHOLD = 200;
const TAX_RATE = 0.08;
const PHONE_PRICE = 99.99;
const ACCESSORY_PRICE = 9.99;

var bank_balance = 303.91;
var amount = 0;

function calculateTax(amount){
    return amount * TAX_RATE;
}

function formatAmount(amount) {
    return "$" + amount.toFixed(2);
}

//keep buying phones while you still have money
while (amount < bank_balance){
    //buy new phone!
    amount = amount + PHONE_PRICE;
    
    //can we afford the accessory?
    if(amount < SPENDING_THRESHOLD){
        amount = amount + ACCESSORY_PRICE;
    }
}

//don't forget to pay the government
amount = amount + calculateTax(amount);

console.log(
    "Your purchase: " + formatAmount(amount)
);
//Your Purchase: $334.76

// can yuo actually afford this ?
if (amount > bank_balance) {
    console.log(
        "You can't afford this purchase :("
    );
}