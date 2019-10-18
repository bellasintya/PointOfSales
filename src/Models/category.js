const connection = require ('../Configs/connect');
module.exports = {
	getCategories: () => {
		return new Promise ((resolve, reject) => {
			connection.query ('SELECT * FROM categories', (err, response) => {
				if(!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
	},
	postCategories: req => {
		return new Promise ((resolve, reject) => {
			const body = req.body;
			connection.query (
				'INSERT INTO categories SET name=?',
				[body.name], 
				(err, response) => {
					if (!err){
						resolve (response);
					} else{
						reject (err);
					}
				}
			);
		});
	},
	updateCategory: req => {
		return new Promise ((resolve, reject) => {
			const body = req.body;
			let id = req.params.id;
			let name = body.name;
			connection.query (
				`UPDATE categories SET name="${name}" WHERE id_category ="${id}"`,
				(err, response) => {
					if (!err){
						resolve (response);
					} else{
						reject (err);
					}
				}
			);
		});
	},
	deleteCategory: req => {
		return new Promise ((resolve, reject) => {
			let id = req.params.id;
			connection.query (
				`DELETE FROM categories WHERE id_category="${id}"`,
				(err, response) => {
					if (!err){
						resolve(response);
					} else{
						reject (err);
					}
				}
			);
		});
	},
};