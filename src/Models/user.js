const connection = require ('../Configs/connect');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(0);

module.exports = {
    registerUser: req => {
        const body = req.body;
        const pass = bcrypt.hashSync (body.password, salt);

        return new Promise ((resolve, reject) => {
            connection.query (`INSERT INTO users SET full_name =?, email =?, username = ?, password = ?`,
            [body.full_name, body.email, body.username, pass], 
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
    getUsername: req => {
        const username = req.params.username || req.body.username;
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
    getUser: req => {
        return new Promise ((resolve, reject) => {
            const id = req.params.id; 
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
    deleteUser: req => {
		return new Promise ((resolve, reject) => {
			let id = req.params.id;
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