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
	postCategories: (data) => {
		return new Promise ((resolve, reject) => {
			connection.query (
				'INSERT INTO categories SET ?',
				[data], 
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
	updateCategory: (data, id) => {
		return new Promise ((resolve, reject) => {
			connection.query (
				`UPDATE categories SET ? WHERE id_category = ?`, 
				[data, id],
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
	deleteCategory: id => {
		return new Promise ((resolve, reject) => {
			connection.query (
				`DELETE FROM categories WHERE id_category = "${id}"`,
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
	getCategory: req => {
		return new Promise ((resolve, reject) => {
			let id = req.params.id;
			connection.query (
				`SELECT * FROM categories WHERE id_category = ?`, [id],
				(err, response) => {
					if (!err){
						resolve (response);
					} else {
						reject (err);
					}
				}
			);
		});
	},
	getCategoryByName: req => {
		return new Promise ((resolve, reject) => {
			const name = req.body.name;
			connection.query (
				`SELECT * FROM categories WHERE name = "${name}"`, 
				(err, response) => {
					if (!err){
						resolve (response);
					} else {
						reject (err);
					}
				}
			);
		});
	},
};