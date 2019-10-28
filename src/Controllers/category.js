const categoryModel = require ('../Models/category');
const form = require ('../Helpers/form');
const format = require ('../Helpers/form');

module.exports = {
	getCategories : (res) => {
		categoryModel.getCategories ()
		.then (response => {
			format.list (res, 200, response);
		})
		.catch (error => {
			console.log (error);
		});
	},
	postCategories : (req,res) => {
		categoryModel
		.getCategoryByName (req)
		.then (result => {
			if (result.length == 0 ){
				categoryModel.postCategories (req)
					.then (response => {
						res.json ({
							message: "Succsessfully added category!",
							response
						});
					})
					.catch (err => {
						console.log (err);
					});
				
			} else {
				return res.status (400).send ({
					status: 400,
					message: 'Category does exist, try another category!'
				})
			}
		})	
		.catch (err => {
			form.error (res, err);
		})
	},
	updateCategory : (req,res) => {
		categoryModel
		.getCategory (req)
		.then (result => {
			if (result.length !== 0 ){
				categoryModel
				.updateCategory (req)
				.then (response => {
					res.json ({
						message: "Succsessfully updated category!",
						response
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
					message: `Can't find category!`
				})
			}
		})	
		.catch (err => {
			form.error (res, err);
		})
	},
	deleteCategory : (req, res) => {
		categoryModel.getCategory (req)
		.then (result => {
			if (result.length !== 0 ){
				categoryModel.deleteCategory (req)
				.then (response => {
					res.json ({
						message: "Succsessfully delete category!",
						response
					});
				}).catch (err => {
					res.send ('Failed delete category!');
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
			form.error (res, err);
		})
	},
};