var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "caeser",
    database: "BamazonDB"
});

connection.connect(function(err) {
    // console.log("Connected as id: "+ connection.threadId);
    if (err) throw err;

});

var start = function() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Stock"],
            colWidths: [5, 25, 25, 8, 5]
        });
        // console.log("result" + results);
        console.log("Here are the items available!");
        console.log("================================");

        for (var i = 0; i < results.length; i++) {
            table.push([results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quanity]);
        }
        console.log("--------------------------------");

        console.log(table.toString());

        // console.log("these are the results" + results)
        // console.log("table: " + results[i].product_name);

        inquirer.prompt([{
                name: "choice",
                type: "input",
                message: "What is the ID # of the car wash product you would like to purchase?",
                validate: function(value) {
                    if (isNaN(value) == false) {
                        return true
                    } else {
                        return false;
                    }
                }

            }, {
                name: "quanity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) == false) {
                        return true
                    } else {
                        return false;
                    }
                }
            }

        ]).then(function(answer) {

            var chosenId = answer.choice - 1;
            var chosenProduct = results[chosenId];
            var chosenStock = answer.quanity;

            // console.log(chosenProduct);
            // console.log(answer.choice);

            if (chosenStock < chosenProduct.stock_quanity) {
                console.log("Your total for " + "(" + chosenStock + ")" + chosenProduct.price * chosenStock);

                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quanity: chosenProduct.stock_quanity - chosenStock
                }, {
                    id: chosenProduct.id
                }], function(err, res) {
                    if (err) throw err
                    console.log("Your order is placed.");
                    start();
                });
            } else {
                console.log("Sorry, we seem to not have enough inverntory");
                start();
            }
        });
    });
}

start();
