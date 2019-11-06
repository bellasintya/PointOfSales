const categoryModel = require ('../Models/category');
const format = require ('../Helpers/form');

module.exports = {
	getCategories : (req, res) => {
		categoryModel.getCategories ()
		.then (result => {
			format.list (res, 200, result);
		})
		.catch (error => {
			console.log (error);
		});
	},
	postCategories : (req,res) => {
		const name = req.body.name || req.params.name;
		data = {
			name: name
		}
		categoryModel
		.getCategoryByName (req)
		.then (result => {
			if (result.length == 0 ){
				categoryModel.postCategories (data)
					.then (response => {
						res.json ({
							message: "Succsessfully added category!",
							response,
							result : {
								name: name
							}
							
						});
					})
					.catch (err => {
						format.error (res, 'Error inserting data');
						console.log(err);
						
					});
				
			} else {
				return res.status (400).send ({
					status: 400,
					message: 'Category does exist, try another category!'
				})
			}
		})	
		.catch (err => {
			format.error (res, 'Error');
			console.log (err)
		})
	},
	updateCategory : (req,res) => {
		const body = req.body;
		let id = req.params.id;
		let name = body.name;
		data = {
			name: name
		}
		categoryModel
		.getCategory (req)
		.then (result => {
			if (result.length !== 0 ){
				categoryModel
				.updateCategory (data, id)
				.then (response => {
					res.json ({
						message: "Succsessfully updated category!",
						response,
						result : {
							id_category: parseInt(id),
							name: name,
						}
					});
				})
				.catch (err => {
					res.send ('Failed update category!');
					console.log (err);
				});
			}
			else {
				return res.status (400).send ({
					status: 400,
					message: `Can't find category!`,
					result
				})
			}
		})	
		.catch (err => {
			format.error (res, 'error updating category');
			console.log(err);
			
		})
	},
	deleteCategory : (req, res) => {
		let id = req.params.id;
		categoryModel.getCategory (req)
		.then (result => {
			if (result.length !== 0 ){
				categoryModel.deleteCategory (id)
				.then (response => {
					res.json ({
						message: "Succsessfully delete category!",
						response,
						result : {
							id_category: parseInt(id)
						}
					});
				}).catch (err => {
					res.status(400) .send ('Failed delete category!');
					console.log (err);
				});
			}
			else {
				return res.status (400).send ({
					status: 400,
					message: `Can't find category!`
				})
			}
		})	
		.catch (err => {
			format.error (res, 'error deleting category');
			console.log(err);
			
		})
	},
};