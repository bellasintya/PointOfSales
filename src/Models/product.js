const connection = require ('../Configs/connect');
module.exports = {
	getProducts: (queryLimit, sort, order, querySearch, queryCategory) => {
		return new Promise ((resolve, reject) => {
			connection.query (
				`SELECT id_product, products.name as name, price, quantity, description, image, products.date_added as added, products.date_updated as updated, categories.name as name_category, id_category FROM products JOIN categories USING (id_category) ${querySearch} ${queryCategory} ORDER BY products.${sort} ${order} ${queryLimit}`, 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
	},
	postProducts: (data) => {
		return new Promise ((resolve, reject) => {
			connection.query ('INSERT INTO products SET ?', 
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
	updateProduct : (data, id) => {
		return new Promise ((resolve, reject) => {
			connection.query (`UPDATE products SET ? WHERE id_product = ? `, [data, id],
				(err, result) => {
					if (!err){
						resolve (result);
					} else{
						reject (err);
					}
				}
			);
		});
	},
	deleteProduct : (id) => {
		return new Promise ((resolve, reject) => {
			connection.query (`DELETE FROM products WHERE id_product = ${id}`,
				(err, response) => {
					if (!err){
						resolve (response);
					} else{
						reject (err);
					}
				}
			);
		})
	},
	getProduct : id => {
		return new Promise ((resolve, reject) => {
			connection.query (`SELECT id_product, products.name as name, price, quantity, description, image, products.date_added as date_added, products.date_updated as date_updated, categories.name as name_category FROM products JOIN categories USING (id_category) WHERE id_product = ${id}`,
				(err, response) => {
					if (!err){
						resolve (response);
					} else{
						reject (err);
					}
				}
			);
		})
	},
	searchProduct : req => {
		return new Promise ((resolve, reject) => {
			let name = req.name;
			connection.query (`SELECT * FROM products WHERE name LIKE "%${name}%"`,
				(err, response) => {
					if (!err){
						resolve (response);
					} else{
						reject (err);
					}
				}
			);
		})
	},
	addQuantity : req => {
		return new Promise ((resolve, reject) => {
			let id = req.params.id;
			let amount = req.body.amount; 
			connection.query (`UPDATE products SET quantity = quantity + "${amount}" WHERE id_product = "${id}"`,
				(err, response) => {
					if(!err){
						resolve (response);
					} else{
						reject (err);
					}
				}
			);
		})
	},
	reduceQuantity : (amount,id) => {
		return new Promise ((resolve, reject) => {
			connection.query (`UPDATE products SET quantity = quantity - "${amount}" WHERE id_product = "${id}"`,
				(err, response) => {
					if(!err){
						resolve (response); 
					} else{
						reject (err);
					}
				}
			);
		})
	},
	sortProducts : req => {
		return new Promise ((resolve, reject) => {
			let order = req.order;
			let sortBy = req.sortBy;
			connection.query (
				`SELECT id_product, products.name as name, price, quantity, description, image, products.date_added as added, products.date_updated as updated, categories.name as category FROM products JOIN categories USING (id_category) ORDER BY ${sortBy} ${order}`,
				(err, response) => {
					if(!err){
						resolve (response); 
					} else{
						reject (err);
					}
				}
			);
		})
	},
	pageProducts : req => {
		return new Promise ((resolve, reject) => {
			let limit = 5;
			let page = parseInt(req.params.page);
			let start = limit * (page - 1); 
			connection.query (`SELECT * FROM products ORDER BY id_product LIMIT ${limit} OFFSET ${start}`,
				(err, response) => {
					if(!err){
						resolve (response); 
					} else{
						reject (err);
					}
				}
			);
		})
	}
};