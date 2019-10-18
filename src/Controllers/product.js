const productModel = require ('../Models/product');
const form = require ('../Helpers/form');

module.exports = {
	getProducts : (req,res) => {
		productModel.getProducts ()
		.then (response => {
			form.success (res, 200, response);
		}).catch (error => {
			res.send ('Cannot get products');
			console.log (error);
		});
	},
	postProducts : (req, res) => {
		productModel
		.postProducts (req)
		.then (response => {
			res.json ({
				message: 'Succesfully added product!',
				response
			});
		})
		.catch (err => {
			res.send ('Failed add product!');
			console.log (err);
		});
	},
	updateProduct : (req, res) => {
		productModel
		.getProduct (req)
		.then (response => {
			let product = form.data(response); 
			return product;
		})
		.then (product => {
			productModel
			.updateProduct (req, product)
			.then (response => {
				res.json ({
				message: 'Succesfully updated product!',
				response
				});
			})
		})
		.catch (error => {
			res.send ('Failed update product!');
			console.log (err);
		});
	},
	deleteProduct : (req, res) => {
		productModel
		.deleteProduct (req)
		.then (response => {
			res.json ({
			message: 'Succesfully delete product!',
			response
			});
		})
		.catch (err => {
			res.send ('Failed delete product!');
			console.log (err);
		});
	},
	getProduct : (req, res) => {
		productModel.
		getProduct (req)
		.then (response => {
			form.success (res, 200, response);
		}).catch (error => {
			res.send ('Failed to show product!');
			console.log (err);
		});
	},
	searchProduct : (req, res) => {
		req = req.query;
		productModel
		.searchProduct (req)
		.then (response => {
			form.success (res, 200, response);
		})
		.catch (err => {
			res.send ('Failed to show searched product!');
			console.log (err);
		});
	},
	addQuantity : (req, res) => {
		productModel
		.addQuantity (req)
		.then (response => {
			res.json ({
			message: 'Succesfully add quantity into product!',
			response
			});
		})
		.catch (err => {
			console.log (err);
		});
	},
	reduceQuantity : (req, res) => {
		productModel
		.reduceQuantity (req)
		.then (response => {
			res.json ({
			message: 'Succesfully reduce quantity from product!',
			response
			});
		})
		.catch (status => {
			if (status == 400)
				res.status (status).send ("Amount Should More Than 0");
		});
	},
	sortProducts : (req, res) => {
		req = req.query;
		productModel
		.sortProducts (req) 
		.then (response => {
			form.success (res, 200, response);
		})
		.catch (err => {
			res.send ('Failed to show sorted product!');
			console.log (err);
		});
	},
	pageProducts : (req, res) => {
		productModel
		.pageProducts (req)
		.then (response => {
			form.success (res, 200, response);
		})
		.catch (err => {
			res.send ('Failed to show the page!');
			console.log (err);
		});
	},
};