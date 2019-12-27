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
				`SELECT * FROM transactions WHERE id_transaction = ${id}`, 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
	},
	getDetailTransaction: (id) => {
		return new Promise ((resolve, reject) => {
			connection.query (
				`SELECT * FROM transactions JOIN history_transaction ON (transactions.id_transaction = history_transaction.id_transaction) WHERE id_transaction = ${id}`, 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
	},
    addTransaction: (id, total) => {
        return new Promise ((resolve, reject) => {
			connection.query (
				`INSERT INTO transactions SET id_user = ${id}, total_price = ${total}`, 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
    },
    addDetails: (data) => {
        return new Promise ((resolve, reject) => {
			connection.query (
                `INSERT INTO history_transaction SET ?`,
                [data], 
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