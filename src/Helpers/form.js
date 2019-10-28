module.exports = {
	success: (res, status, result) => {
		let format = result.map (item => {
			return {
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				description: item.description,
				image: item.image,
				date_added: item.added,
				date_updated: item.updated,
				category: item.category,
			};
		});
		let form = {
			status,
			result: format,
		};
		res.json (form);
	},

	data: (result) => {
		return result.map (item => {
			return {
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				description: item.description,
				image: item.image,
			};
		});
	},

	list: (res, status, result) => {
		let form = result.map (item => {
			return {
				id_category: item.id_category,
				name: item.name,
			};
		});
		let format = {
			status,
			result: form,
		};
		res.json (format);
	},

	error: (res, message) => {
		let form = {
			status: 400,
			message
		};
		res.json (form);
	},

	successSign: (res, result) => {
		let form = {
			status: 200,
			result
		}
		res.json(form);
	},
};