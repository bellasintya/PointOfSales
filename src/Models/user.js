const connection = require ('../Configs/connect');

module.exports = {
    registerUser: (data) => {
        return new Promise ((resolve, reject) => {
            connection.query (`INSERT INTO users SET ?`,
            [data], 
            (err, result) => {
                if (!err) {
                    resolve (result);
                } else {
                    reject (err);
                }
            });
        });
    },
    loginUser: req => {
        return new Promise ((resolve, reject) => {
            connection.query (`SELECT * FROM users WHERE username =?`, [req.body.username],
            (err, result) => {
                if (!err) resolve (result);
                else reject (err);
            })
        });
    },
    getUsername: (username) => {
        return new Promise ((resolve, reject) => {
            connection.query (`SELECT * FROM users WHERE username = ?`, 
            [username], (err, result) => {
                if (!err) resolve (result);
                else reject (err);
            })
        })
    },
    getUsers: req => {
		return new Promise ((resolve, reject) => {
			connection.query (
				`SELECT * FROM users`, 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
    },
    getUser: (id) => {
        return new Promise ((resolve, reject) => {
			connection.query (
				`SELECT * FROM users WHERE id_user = ?`, [id], 
				(err,response) => {
				if (!err){
					resolve (response);
				} else{
					reject (err);
				}
			});
		});
    },
    updateUser: (data, id) => {
        return new Promise ((resolve, reject) => {
			connection.query (
				`UPDATE users SET ? WHERE id_user = ?`, [data, id], 
				(err,response) => {
				if (!err){
					resolve (response); 
				} else{
					reject (err);
				}
			});
		});
    },
    deleteUser: (id) => {
		return new Promise ((resolve, reject) => {
			connection.query (`DELETE FROM users WHERE id_user = ${id}`,
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
    
}