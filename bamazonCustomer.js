var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// creates the connection information for the sql database
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "caeser",
    database: "BamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    // console.log("Connected as id: "+ connection.threadId);
    if (err) throw err;

});


var start = function() {

    // pulls all the information down from the mysql database
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        // using the NPM cli-table to present the information in an easier to read format
        var table = new Table({
            head: ["ID", "Product Name", "Department", "Price", "Stock"],
            colWidths: [5, 25, 25, 8, 5]
        });
        // console.log("result" + results);

        // loops through the objects provided by the mysql server
        for (var i = 0; i < results.length; i++) {
            table.push([
                results[i].id,
                results[i].product_name,
                results[i].department_name,
                results[i].price,
                results[i].stock_quanity
            ]);
        }

        // populates the table 
        console.log(table.toString());

        // prompts users to make their decisions
        inquirer.prompt([{
                name: "id",
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

            var quanity = answer.quanity;
            var itemId = answer.id;
            connection.query('SELECT * FROM products WHERE ?', [{ 
            	id: itemId 
            	}], function(err, selectedItem) {
                
                if (err) throw err;
                if (selectedItem[0].stock_quanity - quanity >= 0) {
                    
                    console.log('We have enough (' + selectedItem[0].product_name + ')!');
                    console.log('Quantity in stock: ' + selectedItem[0].stock_quanity + 'Order quantity: ' + quanity);
                    console.log('You will be charged $' + (answer.quanity * selectedItem[0].price) + '. Thank you!');

                    connection.query('UPDATE products SET stock_quanity=? WHERE id=?', [selectedItem[0].stock_quanity - quanity, itemId],
                        function(err, inventory) {
                            if (err) throw err;
                            start();
                        });
                } else {
                    console.log('Insufficient quantity.  Please adjust your order, we only have ' + selectedItem[0].stock_quanity + ' ' + selectedItem[0].product_name + 'in stock.');
                    start();
                }
            });
        });
    });
}

start();
