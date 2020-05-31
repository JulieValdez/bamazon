var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Ju8723251!",
  database: "bamazon_DB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  getProducts();
});

var getProducts = function () {
  connection.query("SELECT * FROM products", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      console.log(
        res[i].id +
          " / " +
          res[i].product_name +
          " / " +
          res[i].department_name +
          " / " +
          res[i].price +
          " / " +
          res[i].stock_quantity
      );
    }
    promptCustomer(res);
  });
};

var promptCustomer = function (res) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What would you like to buy?",
      },
    ])
    .then(function (answer) {
      for (let i = 0; i < res.length; i++) {
        if (res[i].product_name === answer.choice) {
          correct = true;
          var product = answer.choice;
          var id = i;
          inquirer
            .prompt({
              type: "input",
              name: "quantity",
              message: "How many would you like?",
              validate: function (value) {
                if (isNAN(value) === false) {
                  return true;
                } else {
                  return false;
                }
              },
            })
            .then(function (answer) {
              if (res[id].stock_quantity - answer.quantity > 0) {
                  connection.query("'UPDATE products SET stock_quantity='+(res[id].stock_quantity - answer.quantity)+'WHERE product_name='+product+", function (err, res2) {
                        console.log("Product bought");
                      getProducts();
                  }) else {
                    console.log("there are not enough in stock");

                }
                }
            });
        }
      }
    });
};

// function which prompts the user for what action they should take

// function to handle posting new items up for auction
// function postAuction() {
//   // prompt for info about the item being put up for auction
//   inquirer
//     .prompt([
//       {
//         name: "item",
//         type: "input",
//         message: "What is the item you would like to submit?",
//       },
//       {
//         name: "category",
//         type: "input",
//         message: "What category would you like to place your auction in?",
//       },
//       {
//         name: "startingBid",
//         type: "input",
//         message: "What would you like your starting bid to be?",
//         validate: function (value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then(function (answer) {
//       // when finished prompting, insert a new item into the db with that info
//       connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//           item_name: answer.item,
//           category: answer.category,
//           starting_bid: answer.startingBid || 0,
//           highest_bid: answer.startingBid || 0,
//         },
//         function (err) {
//           if (err) throw err;
//           console.log("Your auction was created successfully!");
//           // re-prompt the user for if they want to bid or post
//           start();
//         }
//       );
//     });
// }

// function bidAuction() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function (err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function () {
//             var choiceArray = [];
//             for (var i = 0; i < results.length; i++) {
//               choiceArray.push(results[i].item_name);
//             }
//             return choiceArray;
//           },
//           message: "What auction would you like to place a bid in?",
//         },
//         {
//           name: "bid",
//           type: "input",
//           message: "How much would you like to bid?",
//         },
//       ])
//       .then(function (answer) {
//         // get the information of the chosen item
//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//           if (results[i].item_name === answer.choice) {
//             chosenItem = results[i];
//           }
//         }

//         // determine if bid was high enough
//         if (chosenItem.highest_bid < parseInt(answer.bid)) {
//           // bid was high enough, so update db, let the user know, and start over
//           connection.query(
//             "UPDATE auctions SET ? WHERE ?",
//             [
//               {
//                 highest_bid: answer.bid,
//               },
//               {
//                 id: chosenItem.id,
//               },
//             ],
//             function (error) {
//               if (error) throw err;
//               console.log("Bid placed successfully!");
//               start();
//             }
//           );
//         } else {
//           // bid wasn't high enough, so apologize and start over
//           console.log("Your bid was too low. Try again...");
//           start();
//         }
//       });
//   });
// }
