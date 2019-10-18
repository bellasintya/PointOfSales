module.exports = {
	success: (res, status, result) => {
		let format = result.map (item => {
			return {
				name: item.name,
				price: item.price,
				quantity: item.quantity,
				description: item.description,
				image: item.image,
				date_added: item.date_added,
				date_updated: item.date_updated,
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
};