import * as prompt from 'prompt-sync'

const input = prompt();

type Expense = {    
    Id: number;
    name: string;
    price: number;
}
let Id = 0

const list:Expense[] = [ ]

function ExpenseList(){

    while (true) {

        const name = input("What is the expense? ");
        if (!name || name.trim() === "") {
            console.log("Invalid name");
            return;
        }

        const priceInput = input("What is the price? ")
        const price = parseFloat(priceInput);
        if (isNaN(price)) {
            console.log("Invalid price")
            return;
        }


        var item = {
            Id: ++Id,
            name ,
            price ,
        }
        
        list.push(item);

        const addMore = input("Do you want to add to your list? (yes/no) ").toLowerCase();

        if (addMore !== 'yes') {
            break;
        }
    }

    console.log("Here is your list!: ")
    console.log(list)

}
   


function editExpense(){


    const idInput = input("What is the ID of the expense you want to change? ")
    const id = Number(idInput); 

    let item: Expense | undefined = undefined;

    for (let i = 0; i < list.length; i++) {
    if (list[i].Id === id) {
        item = list[i];
        break;
        } 
    }

    if (!item) {
        console.log(`No item found with ID ${id}`);
        return;
    }

    const newName = input(`Enter new name (leave blank to keep "${item.name}"):`) || item.name;
    const newPriceInput = input(`Enter new price (leave blank to keep "${item.price}"):`);

    let newPrice = item.price;
    if (newPriceInput && !isNaN(Number(newPriceInput))) {
        newPrice = Number(newPriceInput);
    }

    item.name = newName;
    item.price = newPrice;

    console.log("Updated item:", item);
    console.log("Here is your final updated list: ")
    console.log(list)

}

function EditList(){
    const changingItem = input("Do you want to edit an item on the list?  (yes/no)").toLowerCase();

if (changingItem === 'yes'){
    editExpense()
} else{
    console.log('Okay here is your final list!: ')
    console.log(list)
    return
}

}

function deleting(){


    const idInput = input("What is the ID of the expense you want to delete ")
    const id = Number(idInput); 

    let index = -1;

    for (let i = 0; i < list.length; i++) {
        if (list[i].Id === id) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        console.log(`No item found with ID ${id}`);
        return;
    }

    const deleted = list.splice(index, 1);

    console.log("Here is the deleted item:");
    console.log(deleted[0]);

    console.log("Here is the final list:");
    console.log(list);
}

function summarizeTotal() {
    const total = list.reduce((acc, expense) => acc + expense.price, 0);
    console.log("Total expenses: £" + total.toFixed(2));
}

while (true) {
    console.log("\nWhat would you like to do?");
    console.log("Options: add / change / delete / quit");
    const action = input("Enter your choice: ").toLowerCase();

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
