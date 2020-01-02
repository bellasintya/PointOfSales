const categoryModel = require('../Models/category');
const format = require('../Helpers/form');

module.exports = {
	getCategories: (req, res) => {
		categoryModel.getCategories()
			.then(result => {
				if (result.length !== 0) {
					format.list(res, 200, result);
				}
				else {
					format.error(res, "Categories not found")
				}
			})
			.catch(error => {
				console.log(error);
			});
	},
	getCategory: (req, res) => {
		categoryModel.getCategory(req)
			.then(result => {
				if (result.length !== 0) {
					format.list(res, 200, result);
				} else {
					format.error(res, "Category not found")
				}
			})
			.catch(error => {
				console.log(error)
			})
	},
	getCategoryByName: (req, res) => {
		let name = req.body.name;
		categoryModel.getCategoryByName(name)
			.then(result => {
				if (result.length !== 0) {
					format.list(res, 200, result);
				} else {
					format.error(res, "Category does exist, try another category!")
				}
			})
			.catch(error => {
				console.log(error)
			})
	},
	postCategories: (req, res) => {
		let name = req.body.name || req.params.name;
		console.log("name", name);
		if (name === undefined) {
			return format.error(res, "Category name value not found");
		} else {
			name = name.trim();
			if (name === null || name === "") {
				return format.error(res, "Category name can't be empty");
			} else {
				req.body.name = req.body.name;
				name = name;
			}
		}
		let data = {
			name: name
		}
		categoryModel
			.getCategoryByName(name)
			.then(result => {
				if (result.length === 0) {
					categoryModel.postCategories(data)
						.then(response => {
							res.json({
								message: "Succsessfully added category!",
								response,
								result: {
									id_category: response.insertId,
									name: name,
								}, 
								statue: 200
							});
						})
						.catch(err => {
							format.error(res, 'Error inserting data');
							console.log(err);
						});

				} else {
					return res.json({
						status: 400,
						message: 'Category does exist, try another category!'
					})
				}
			})
			.catch(err => {
				format.error(res, 'Error');
				console.log(err)
			})
	},
	updateCategory: (req, res) => {
		let id = req.params.id;
		let name = req.body.name;
		if (name === null) return form.error(res, "Category name can't be empty");
		data = {
			name: name
		}
		categoryModel
			.getCategory(req)
			.then(result => {
				if (result.length !== 0) {
					categoryModel
						.updateCategory(data, id)
						.then(response => {
							res.json({
								message: "Successfully updated category!",
								response,
								result: {
									id_category: parseInt(id),
									name: name,
								},
								status: 200,
							});
						})
						.catch(err => {
							res.json({
								status: 400,
								message: 'Failed update category!'
							});
							console.log(err);
						});
				}
				else {
					return res.json({
						status: 400,
						message: `Can't find category!`,
						result
					});
				}
			})
			.catch(err => {
				format.error(res, 'error updating category');
				console.log(err);
			})
	},
	deleteCategory: (req, res) => {
		let id = req.params.id;
		categoryModel.getCategory(req)
			.then(result => {
				if (result.length !== 0) {
					categoryModel.deleteCategory(id)
						.then(response => {
							res.json({
								status: 200,
								message: "Succsessfully delete category!",
								response,
								result: {
									id_category: parseInt(id)
								}
							});
						}).catch(err => {
							res.json({
								status: 400,
								message: 'Failed delete category!'
							});
							console.log(err);
						});
				}
				else {
					return res.json ({
						status: 400,
						message: `Can't find category!`
					})
				}
			})
			.catch(err => {
				format.error(res, 'error deleting category');
				console.log(err);
			})
	},
};