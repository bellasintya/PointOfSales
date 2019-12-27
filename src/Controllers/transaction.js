const transactionModel = require('../Models/transaction');
const productModel = require('../Models/product');
const form = require('../Helpers/form');

module.exports = {
    getTransactions: (req, res) => {
        transactionModel.getTransactions(req)
            .then(result => {
                form.successFormat(
                    res,
                    result,
                    "Successfully show transaction list"
                );
            })
            .catch(error => {
                form.errorFormat(
                    res,
                    error,
                    "Failed to show transaction list!"
                );
            })
    },
    getTransaction: (req, res) => {
        const id = req.params.id;
        transactionModel.getTransaction(id)
            .then(result => {
                if (result.length !== 0) {
                    form.successFormat(
                        res,
                        result,
                        "Successfully show transaction with ID transaction " + id
                    );
                } else {
                    return form.errorFormat(
                        res,
                        error,
                        "Can't find transaction!"
                    );
                }
            })
            .catch(error => {
                form.errorFormat(
                    res,
                    error,
                    "Failed to show transaction with ID transaction " + id
                );
            })
    },
    getDetailTransaction: (req, res) => {
        const id = req.params.id;
        transactionModel.getTransaction(id)
            .then(result => {
                if (result.length !== 0) {
                    form.successFormat(
                        res,
                        result,
                        "Successfully show detail transaction with ID transaction " + id
                    );
                } else {
                    return form.errorFormat(
                        res,
                        error,
                        "Can't find transaction!"
                    );
                }
            })
            .catch(error => {
                form.errorFormat(
                    res,
                    error,
                    "Failed to show detail transaction with ID transaction " + id
                );
            })
    },
    addTransaction: (req, res) => {
        let id_user = req.body.id_user,
            total_price = req.body.total_price,
            { detail_transaction } = req.body;
        console.log ("req.body", req.body);
        transactionModel.addTransaction(id_user, total_price)
            .then(result => {
                const id_transaction = result.insertId;
                const details = detail_transaction.map(item => {
                    return {
                        id_product: item.id_product,
                        price: item.last_price,
                        quantity: item.qty,
                        id_transaction: id_transaction
                    }
                })
                details.forEach(async (data) => {
                    productModel.getProduct(data.id_product)
                        .then(result => {
                            const item = result[0];
                            if (item.quantity < 0) {
                                return form.errorFormat(
                                    res,
                                    error,
                                    "Product out of stock!"
                                );
                            } else {
                                let qty = item.quantity - data.qty;
                                productModel.reduceQuantity(qty, data.id_product)
                                    .then(result => {
                                        transactionModel.addDetails(data)
                                            .then(result => {
                                                const numPerPage = parseInt(req.query.limit) || null
                                                const activePage = req.query.page || 1
                                                const beginData = numPerPage * (activePage - 1)
                                                const sort = req.query.sort || 'date_added'
                                                const order = req.query.order || 'ASC'
                                                const search = req.query.search || null
                                                //const category = req.query.category || null
                                                const queryCategory = (numPerPage !== null) ? `LIMIT ${beginData}, ${numPerPage}` : ''
                                                const queryLimit = (numPerPage !== null) ? `LIMIT ${beginData}, ${numPerPage}` : ''
                                                const querySearch = (search !== null) ? `AND product.name LIKE '%${search}%'` : ''

                                                productModel.getProducts(queryLimit, sort, order, querySearch, queryCategory)
                                                    .then(result =>
                                                        res.json({
                                                            message: "Succesfully add transaction",
                                                            status: 200,
                                                            result,
                                                        })
                                                    ).catch(error => {
                                                        console.log(error);
                                                        res.send('Cannot get products');
                                                    });
                                            })
                                            .catch(error => {
                                                console.log("error", error);
                                            })
                                    }).catch(error => {
                                        return form.errorFormat(
                                            res,
                                            error,
                                            "Failed to reduce quantity"
                                        );
                                    })
                            }
                        }).catch(error => {
                            form.errorFormat(
                                res,
                                error,
                                "Failed to get product!"
                            );
                        })
                });
            })
            .catch(error => {
                form.errorFormat(
                    res,
                    error,
                    "Failed to add new transaction!"
                );
            })
    },
    addDetails: (req, res) => {
        let id_transaction = req.body.id_transaction,
            id_product = req.body.id_product,
            price = req.body.price,
            quantity = req.body.quantity;

        if (id_transaction !== undefined) {
            id_transaction = id_transaction.trim();
            if (id_transaction === null || id_transaction === "") {
                return form.error(res, "Id_transaction can't be empty");
            }
        } else {
            return form.error(res, "Id_transaction required");
        }

        if (id_product !== undefined) {
            id_product = id_product.trim();
            if (id_product === null || id_product === "") {
                return form.error(res, "Id_product can't be empty");
            }
        } else {
            return form.error(res, "Id_product required");
        }

        if (price !== undefined) {
            price = price.trim();
            if (price === null || price === "") {
                return form.error(res, "Price can't be empty");
            } else if (isNaN(price)) {
                return form.error(res, "Price should be a number");
            } else if (price <= 0) {
                return form.error(res, "Price can't below 0");
            } else {
                price = price;
            }
        } else {
            return form.error(res, "Price required");
        }

        if (quantity !== undefined) {
            quantity = quantity.trim();
            if (quantity === null || quantity === "") {
                return form.error(res, "Quantity can't be empty");
            }
            else if (isNaN(quantity)) {
                return form.error(res, "Quantity should be a number");
            }
            else if (quantity <= 0) {
                return form.error(res, "Quantity can't below 0");
            }
            else {
                quantity = quantity;
            }
        } else {
            return form.error(res, "Quantity required");
        }

        transactionModel.getTransaction(id_transaction)
            .then(result => {
                if (result.length !== 0) {
                    productModel.getProduct(id_product)
                        .then(result => {
                            console.log(result);
                            if (result.length !== 0) {
                                const item = result[0];
                                if (item.quantity < 0) {
                                    return form.errorFormat(
                                        res,
                                        error,
                                        "Product out of stock!"
                                    );
                                } else {
                                    qty = quantity - item.quantity;

                                    details = {
                                        id_product: id_product,
                                        price: price,
                                        quantity: quantity,
                                        id_transaction: id_transaction
                                    }

                                    transactionModel.addDetails(details)
                                        .then(result => {
                                            console.log(result);
                                            if (result !== 0) {
                                                productModel.reduceQuantity(qty, id_product)
                                                    .then(result => {
                                                        form.successFormat(
                                                            res,
                                                            result,
                                                            "Successfully reduce quantity!"
                                                        );
                                                    }).catch(error => {
                                                        return form.errorFormat(
                                                            res,
                                                            error,
                                                            "Failed to reduce quantity"
                                                        );
                                                    })
                                            } else {
                                                return form.error(
                                                    res,
                                                    "Failed add detail transaction!"
                                                );
                                            }
                                        })
                                        .catch(error => {
                                            return form.errorFormat(
                                                res,
                                                error,
                                                "Failed to add detail transaction"
                                            );
                                        })
                                }
                            } else {
                                return form.error(
                                    res,
                                    "Product not found!"
                                );
                            }
                        }).catch(error => {
                            form.errorFormat(
                                res,
                                error,
                                "Failed to get product!"
                            );
                        })
                } else {
                    return form.error(
                        res,
                        "Can't find transaction!"
                    );
                }
            })
            .catch(error => {
                form.errorFormat(
                    res,
                    error,
                    "Can't find transaction ID"
                );
                console.log(error);
            })
    }
}