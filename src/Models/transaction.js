const connection = require ('../Configs/connect');
module.exports = {
    getTransactions: () => {
        return new Promise ((resolve, reject) => {
			connection.query (
				`SELECT * FROM transactions JOIN history_transaction ON (transactions.id_transaction = history_transaction.id_transaction)`, 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
    },
    getTransaction: (id) => {
        return new Promise ((resolve, reject) => {
			connection.query (
				`SELECT * FROM transactions JOIN history_transaction ON (transactions.id_transaction = history_transaction.id_transaction) WHERE history_transaction.id_transaction = ${id}`, 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
    },
    addTransaction: (id) => {
        return new Promise ((resolve, reject) => {
			connection.query (
				`INSERT INTO transactions SET id_user = ${id}`, 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
    },
    addDetails: (req) => {
        return new Promise ((resolve, reject) => {
            const id = req.body.id_transaction;
            const id_product = req.body.id_product,
                price = req.body.price,
                quantity= req.body.quantity;
			connection.query (
                `INSERT INTO history_transaction SET id_product = ?, price = ?, quantity = ?, id_transaction =?`,
                [id_product, price, quantity, id], 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
    } 
}