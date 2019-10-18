const categoryModel = require ('../Models/category');
const format = require ('../Helpers/form');

module.exports = {
	getCategories : (req,res) => {
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
		.postCategories (req)
		.then (response => {
			res.json ({
				message: "Succsessfully added category!",
				response
			});
		})
		.catch (err => {
			res.send ('Failed add category!');
			console.log (err);
		});
	},
	updateCategory : (req,res) => {
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
	},
	deleteCategory : (req, res) => {
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
	},
};