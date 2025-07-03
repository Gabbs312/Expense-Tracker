"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt = require("prompt-sync");
var input = prompt();
var Id = 0;
var list = [];
function ExpenseList() {
    while (true) {
        var name_1 = input("What is the expense? ");
        if (!name_1 || name_1.trim() === "") {
            console.log("Invalid name");
            return;
        }
        var priceInput = input("What is the price? ");
        var price = parseFloat(priceInput);
        if (isNaN(price)) {
            console.log("Invalid price");
            return;
        }
        var item = {
            Id: ++Id,
            name: name_1,
            price: price,
        };
        list.push(item);
        var addMore = input("Do you want to add to your list? (yes/no) ").toLowerCase();
        if (addMore !== 'yes') {
            break;
        }
    }
    console.log("Here is your list!: ");
    console.log(list);
}
function editExpense() {
    var idInput = input("What is the ID of the expense you want to change? ");
    var id = Number(idInput);
    var item = undefined;
    for (var i = 0; i < list.length; i++) {
        if (list[i].Id === id) {
            item = list[i];
            break;
        }
    }
    if (!item) {
        console.log("No item found with ID ".concat(id));
        return;
    }
    var newName = input("Enter new name (leave blank to keep \"".concat(item.name, "\"):")) || item.name;
    var newPriceInput = input("Enter new price (leave blank to keep \"".concat(item.price, "\"):"));
    var newPrice = item.price;
    if (newPriceInput && !isNaN(Number(newPriceInput))) {
        newPrice = Number(newPriceInput);
    }
    item.name = newName;
    item.price = newPrice;
    console.log("Updated item:", item);
    console.log("Here is your final updated list: ");
    console.log(list);
}
function EditList() {
    var changingItem = input("Do you want to edit an item on the list?  (yes/no)").toLowerCase();
    if (changingItem === 'yes') {
        editExpense();
    }
    else {
        console.log('Okay here is your final list!: ');
        console.log(list);
        return;
    }
}
function deleting() {
    var idInput = input("What is the ID of the expense you want to delete ");
    var id = Number(idInput);
    var index = -1;
    for (var i = 0; i < list.length; i++) {
        if (list[i].Id === id) {
            index = i;
            break;
        }
    }
    if (index === -1) {
        console.log("No item found with ID ".concat(id));
        return;
    }
    var deleted = list.splice(index, 1);
    console.log("Here is the deleted item:");
    console.log(deleted[0]);
    console.log("Here is the final list:");
    console.log(list);
}
function summarizeTotal() {
    var total = list.reduce(function (acc, expense) { return acc + expense.price; }, 0);
    console.log("Total expenses: £" + total.toFixed(2));
}
while (true) {
    console.log("\nWhat would you like to do?");
    console.log("Options: add / change / delete / quit");
    var action = input("Enter your choice: ").toLowerCase();
    switch (action) {
        case "add":
            ExpenseList();
            break;
        case "change":
            EditList();
            break;
        case "delete":
            deleting();
            break;
        case "quit":
            console.log("Final list:");
            console.log(list);
            summarizeTotal();
            process.exit(0);
            break;
        default:
            console.log("Invalid option, please enter add, change, delete, or quit.");
    }
}
