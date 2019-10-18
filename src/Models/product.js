const connection = require ('../Configs/connect');
module.exports = {
	getProducts: () => {
		return new Promise ((resolve, reject) => {
			connection.query (
				'SELECT id_product, products.name as name, price, quantity, description, image, date_added, date_updated, categories.name as name_category FROM products JOIN categories USING (id_category)', 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
	},
	postProducts: req => {
		return new Promise ((resolve, reject) => {
			const body = req.body;
			connection.query ('INSERT INTO products SET name=?, price=?, quantity=?, description=?, image=?, id_category=?', 
				[body.name, body.price, body.quantity, body.description, body.image, body.id_category], 
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
	updateProduct : (req, product) => {
		return new Promise ((resolve, reject) => {
			const item = product[0];
			let id = req.params.id; 
			const body = req.body;
			let name = body.name? body.name : item.name; 
			let price = body.price? body.price: item.price;
			let quantity = body.quantity? body.quantity: item.quantity; 
			let description = body.description? body.description: item.description;
			let image = body.image? body.image: item.image;

			connection.query (`UPDATE products SET name="${name}", price="${price}", 
			quantity="${quantity}", description="${description}", image="${image}" 
			WHERE id_product ="${id}"`,
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
	deleteProduct : req => {
		return new Promise ((resolve, reject) => {
			let id = req.params.id;
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
	getProduct : req => {
		return new Promise ((resolve, reject) => {
			let id = req.params.id;
			connection.query (`SELECT id_product, products.name as name, price, quantity, description, image, date_added, date_updated, categories.name as name_category FROM products JOIN categories USING (id_category) WHERE id_product = ${id}`,
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
	reduceQuantity : req => {
		return new Promise ((resolve, reject) => {
			let id = req.params.id;
			let amount = req.body.amount;
			if (amount > 0){
				connection.query (`UPDATE products SET quantity = quantity - "${amount}" WHERE id_product = "${id}"`,
					(err, response) => {
						if(!err){
							resolve (response); 
						} else{
							reject (err);
						}
					}
				);
			}
			else {
				const status = 400;
				reject (status);
			}
		})
	},
	sortProducts : req => {
		return new Promise ((resolve, reject) => {
			let order = req.order;
			let sortBy = req.sortBy;
			connection.query (
				`SELECT id_product, products.name as name, price, quantity, description, image, date_added, date_updated, categories.name as category FROM products JOIN categories USING (id_category) ORDER BY ${sortBy} ${order}`,
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