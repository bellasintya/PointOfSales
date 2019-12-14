const productModel = require('../Models/product');
const categoryModel = require('../Models/category');
const form = require('../Helpers/form');

module.exports = {
	getProducts: (req, res) => {
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
			.then(result => res.json({
				status: 200,
				currentPage: activePage,
				limit: numPerPage,
				sort,
				order,
				search,
				result
			})).catch(error => {
				res.send('Cannot get products');
				console.log(error);
			});
	},
	postProducts: (req, res) => {
		if (req.body.name && req.body.price && req.body.quantity && req.body.description && req.body.image && req.body.id_category !== undefined) {
			const name = req.body.name.trim(),
				price = req.body.price.trim(),
				quantity = req.body.quantity.trim(),
				description = req.body.description.trim(),
				image = req.body.image.trim(),
				id_category = req.body.id_category;

			if (name === null || name === "" || name === undefined)
				return form.error(res, "Product name can't be empty");
			if (price === null || price === "" || price === undefined)
				return form.error(res, "Price can't be empty");
			if (isNaN(price))
				return form.error(res, "Price should be a number");
			if (price <= 0)
				return form.error(res, "Price can't below 0");
			if (quantity === null || quantity === "" || quantity === undefined)
				return form.error(res, "Quantity can't be empty");
			if (quantity <= 0)
				return form.error(res, "Quantity can't below 0");
			if (isNaN(quantity))
				return form.error(res, "Quantity should be a number");
			if (description === null || description === "" || description === undefined)
				return form.error(res, "Description can't be empty");
			if (image === null || image === "" || image === undefined)
				return form.error(res, "Image can't be empty");
			if (id_category === null || id_category === "" || id_category === undefined)
				return form.error(res, "Category ID can't be empty");

			let data = {
				name: name,
				price: parseInt(price),
				quantity: parseInt(quantity),
				description: description,
				image: image,
				id_category: id_category
			}
			categoryModel
				.getCategory(req)
				.then(response => {
					if (response.length > 0) {
						productModel
							.postProducts(data)
							.then(response => {
								res.json({
									result: {
										data,
										message: 'Succesfully added product!',
										response,
									}
								});
							})
							.catch(err => {
								res.send('Failed add product!');
								console.log(err);
							});
					} else {
						form.error(res, "Can't find category ID");
					}
				})
				.catch(err => {
					res.send(`Failed to find category ID!`);
					console.log(err);
				})
		} else {
			form.error(res, "Fill all the data required (name, price, quantity, description, image, id_category)");
		}
	},
	updateProduct: (req, res) => {
		let id = req.params.id;
		let name = req.body.name,
			price = req.body.price,
			quantity = req.body.quantity,
			description = req.body.description,
			image = req.body.image,
			id_category = req.body.id_category;

		productModel
			.getProduct(id)
			.then(result => {
				if (result.length !== 0) {
					const item = result[0];

					if (name !== undefined) {
						name = name.trim();
						if (name === null || name === "") {
							return form.error(res, "Product name can't be empty");
						}
					}

					if (price !== undefined) {
						if (price === null || price === "") {
							return form.error(res, "Price can't be empty");
						} else if (isNaN(price)) {
							return form.error(res, "Price should be a number");
						} else if (price <= 0) {
							return form.error(res, "Price can't below 0");
						} else {
							price = price;
						}
					}

					if (quantity !== undefined) {
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
					}

					if (description !== undefined) {
						description = description.trim();
						if (description === null || description === "") {
							return form.error(res, "Product name can't be empty");
						}
					}

					if (image !== undefined) {
						image = image.trim();
						if (image === null || image === "") {
							return form.error(res, "Image can't be empty");
						}
					}

					if (id_category !== undefined) {
						if (id_category === null || id_category === "") {
							return form.error(res, "Category ID can't be empty");
						}
					}

					const data = {
						name: name ? name : item.name,
						price: price ? price : item.price,
						quantity: quantity ? quantity : item.quantity,
						description: description ? description : item.description,
						image: image ? image : item.image,
						id_category: id_category ? id_category : item.id_category,
					}

					productModel.updateProduct(data, id)
						.then(response =>
							productModel.getProduct(id)
								.then(response2 =>
									res.json({
										status: 200,
										message: 'Product has succesfully updated!',
										result: response2[0]
									}
									)
								)
								.catch(err => console.log(err))
						)
						.catch(err => console.log(err));

				} else {
					return form.error(res, "Product not found");
				}
			})
			.catch(err => {
				console.log(err);
				return form.error(res, `Failed to update product!`);
			})
	},
	deleteProduct: (req, res) => {
		const id = req.params.id;
		productModel
			.deleteProduct(id)
			.then(response => {
				res.json({
					result: {
						status: 200,
						message: 'Product Deleted!',
						id,
						response,
					}
				});
			})
			.catch(err => {
				res.send('Failed to delete product!');
				console.log(err);
			});
	},
	getProduct: (req, res) => {
		let id = req.params.id;
		productModel.
			getProduct(id)
			.then(response => {
				if (response.length !== 0) {
					form.success(res, 200, response);
				} else {
					form.error(res, `Can't find product!`)
				}
			}).catch(error => {
				res.send('Failed to show product!');
				console.log(error);
			});
	},
	searchProduct: (req, res) => {
		req = req.query;
		productModel
			.searchProduct(req)
			.then(response => {
				form.success(res, 200, response);
			})
			.catch(err => {
				res.send('Failed to show searched product!');
				console.log(err);
			});
	},
	addQuantity: (req, res) => {
		let id = req.params.id;
		let amount = req.body.amount;

		if (id === null || id === "")
			return form.error(res, "ID Product can't be empty");
		if (amount === null || amount === "")
			return form.error(res, "Amount can't be empty");
		if (isNaN(amount))
			return form.error(res, "Amount should be number");
		if (amount < 0)
			return form.error(res, "Amount can't below 0");

		productModel
			.addQuantity(amount, id)
			.then(response => {
				res.json({
					message: 'Succesfully add quantity into product!',
					response
				});
			})
			.catch(err => {
				console.log(err);
			});
	},
	reduceQuantity: (req, res) => {
		let id = trim(req.params.id);
		let amount = trim(req.body.amount);

		if (id === null || id === "")
			return form.error(res, "ID Product can't be empty");
		if (amount === null || amount === "")
			return form.error(res, "Amount can't be empty");
		if (isNaN(amount))
			return form.error(res, "Amount should be number");
		if (amount < 0)
			return form.error(res, "Amount can't below 0");

		productModel
			.getProduct(id)
			.then(result => {
				if (result.length !== 0) {
					const item = result[0];
					let qty = item.quantity;
					if (qty > 0) {
						return productModel.reduceQuantity(amount, id)
							.then(result => res.json({
								status: 200,
								message: 'Quantity product has succesfully updated!',
								id,
								result
							}))
							.catch(err => console.log(err))
					} else {
						return res.status(400).send({
							status: 400,
							id,
							message: `Product Out of Stock`
						})
					}

				} else {
					return res.status(400).send({
						status: 400,
						id,
						message: 'Product does not exist'
					})
				}
			})
	},
	sortProducts: (req, res) => {
		req = req.query;
		productModel
			.sortProducts(req)
			.then(response => {
				form.success(res, 200, response);
			})
			.catch(err => {
				res.send('Failed to show sorted product!');
				console.log(err);
			});
	},
	pageProducts: (req, res) => {
		productModel
			.pageProducts(req)
			.then(response => {
				form.success(res, 200, response);
			})
			.catch(err => {
				res.send('Failed to show the page!');
				console.log(err);
			});
	},
};