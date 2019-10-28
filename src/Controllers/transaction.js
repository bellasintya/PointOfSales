const transactionModel = require ('../Models/transaction');
const form = require ('../Helpers/form');

module.exports = {
    getTransactions: (req, res) => {
        transactionModel.getTransactions (req)
        .then (result => {
            res.json (result)
        })
        .catch (error => {
            console.log (error);
        })
    },
    getTransaction: (req, res) => {
        const id = req.params.id;
        transactionModel.getTransaction (id)
        .then (result => {
            if (result.length !== 0){
                res.json (result);
            } else {
                return res.status (400).send ({
					status: 400,
					message: `Can't find transaction!`
				})
            }
        })
        .catch (error => {
            console.log (error);
        })
    },
    addTransaction: (req, res) => {
        const id = req.body.id_user;
        console.log (id);
        transactionModel.addTransaction (id)
        .then (result => {
            res.json (result);
        })
        .catch (error => {
            console.log (error);
        })
    },
    addDetails: (req, res) => {
        transactionModel.addDetails (req)
        .then (result => {
            res.json (result);
        })
        .catch (error => {
            console.log (error);
        })
    } 
}