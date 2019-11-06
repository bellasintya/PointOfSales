const productModel = require ('../Models/product');
const form = require ('../Helpers/form');

module.exports = {
	getProducts : (req,res) => {
		const numPerPage = parseInt(req.query.limit) || null
		const activePage = req.query.page || 1
		const beginData = numPerPage * (activePage - 1)
		const sort = req.query.sort || 'date_added'
		const order = req.query.order || 'ASC'
		const search = req.query.search || null
		//const category = req.query.category || null
		const queryCategory = (numPerPage !== null) ? `LIMIT ${beginData}, ${numPerPage}`: ''
		const queryLimit = (numPerPage !== null) ? `LIMIT ${beginData}, ${numPerPage}`: ''
		const querySearch = (search !== null) ? `AND product.name LIKE '%${search}%'`: ''

		productModel.getProducts (queryLimit, sort, order, querySearch, queryCategory)
		.then (result => res.json ({
			status: 200,
	        currentPage: activePage,
	        limit: numPerPage,
	        sort, 
	        order,
	        search,
	        result
		})).catch (error => {
			res.send ('Cannot get products');
			console.log (error);
		});
	},
	postProducts : (req, res) => {
		const name = req.body.name, 
			price = req.body.price, 
			quantity = req.body.quantity, 
			description = req.body.description, 
			image = req.body.image, 
			id_category = req.body.id_category;

		let data = {
			name : name,
			price: price,
			quantity: quantity,
			description: description,
			image: image,
			id_category: id_category
		} 
		productModel
		.postProducts (data)
		.then (response => {
			res.json ({
				result: {
					data,
					message: 'Succesfully added product!',
					response,
				}
			});
		})
		.catch (err => {
			res.send ('Failed add product!');
			console.log (err);
		});
	},
	updateProduct : (req, res) => {		
		let id = req.params.id;
		productModel
		.getProduct (id)
		.then (result => {
			if (result.length !== 0){
				const item = result[0];
				const body = req.body;

				let name = body.name? body.name : item.name; 
				let price = body.price? body.price: item.price;
				let quantity = body.quantity? body.quantity: item.quantity; 
				let description = body.description? body.description: item.description;
				let image = body.image? body.image: item.image;
				let id_category = body.id_category? body.id_category: item.id_category;

				const data = {
					name: name,
					price: price,
					quantity: quantity,
					description: description,
					image: image,
					id_category: id_category,
				}

				return productModel.updateProduct(data, id)
				.then (response => res.json ({
					status: 200,
					message: 'Product has succesfully updated!',
					result : {
						id_product: parseInt(id),
						name: name,
						price: price,
						quantity: quantity,
						description: description,
						image: image,
						id_category: id_category,
					},
					response: response
				}))
				.catch (err => console.log (err))

			} else {
				return res.status (400).send ({
					status: 400,
					id,
					message: 'Product does not exist'
				})
			}
		})
	},
	deleteProduct : (req, res) => {
		const id = req.params.id;
		productModel
		.deleteProduct (id)
		.then (response => {
			res.json ({
				result : {
					status: 200,
					message: 'Product Deleted!',
					id,
					response,
				}
			});
		})
		.catch (err => {
			res.send ('Failed to delete product!');
			console.log (err);
		});
	},
	getProduct : (req, res) => {
		let id = req.params.id;
		productModel.
		getProduct (id)
		.then (response => {
			form.success (res, 200, response);
		}).catch (error => {
			res.send ('Failed to show product!');
			console.log (err);
		});
	},
	searchProduct : (req, res) => {
		req = req.query;
		//console.log (req);
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
		let id = req.params.id;
		let amount = req.body.amount;

		productModel
		.getProduct (id)
		.then (result => {
			if (result.length !== 0){
				const item = result[0];
	
				let qty = item.quantity; 
				console.log (qty);

				if (qty > 0){
					if (amount > 0){
						return productModel.reduceQuantity(amount, id)
						.then (result => res.json ({
							status: 200,
							message: 'Quantity product has succesfully updated!',
							id, 
							result
						}))
						.catch (err => console.log (err))
					} else{
						return res.status (400).send ({
							status: 400,
							id,
							message: `Amount cannot below 0`
						})
					}

				} else{
					return res.status (400).send ({
						status: 400,
						id,
						message: `Product Out of Stock`
					})
				}

			} else {
				return res.status (400).send ({
					status: 400,
					id,
					message: 'Product does not exist'
				})
			}
		})
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