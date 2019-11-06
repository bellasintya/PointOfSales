const userModel = require ('../Models/user');
const form = require ('../Helpers/form');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = {
    registerUser: (req, res) => {
        console.log (req.body);
        if (req.body.full_name == null) return form.error (res, "Full name can't be empty");
        if (req.body.email == null) return form.error (res, "Email can't be empty");
        if (req.body.username == null) return form.error (res, "Username can't be empty");
        if (req.body.password == null) return form.error (res, "Password can't be empty");
        
        userModel.getUsername (req) 
        .then (result => {
            if (result.length !== 0) form.error (res, "Username has taken")
            userModel.registerUser (req)
            .then (result => {
                res.json ({
                    status: 200,
					message: 'User successfully created!'
                });
            })
            .catch (err => {
                form.error (res, err);
            })         
        }).catch (err => {
            form.error (res, err);
        })   
    },
    loginUser: (req, res) => {
        console.log (req.body);
        if (req.body.username == null) return form.error (res, "Username can't be empty");
        if (req.body.password == null) return form.error (res, "Password can't be empty");
        userModel
        .loginUser (req)
        .then (result => {
            if (result.length !== 0){
                if (bcrypt.compareSync (req.body.password, result[0].password)) {
                    const token = jwt.sign ({
                        id: result[0].id,
                        username: result[0].username
                    }, secretKey, {
                        expiresIn: '1d'
                    });
                    form.successSign(res, {
                        user_id: result[0].id,
                        username: result[0].username,
                        token: token,
                    });
                } else {
                    form.error (res, "Password incorrect")
                }
            } else{
                form.error (res, "User not found")
            }
        });
    },
    getUsers: (req, res) => {
        userModel.getUsers (req)
        .then (result => {
            if (result.length !== 0){
                res.json (result);
            }
            else {
                form.error (res, "Cannot find user")
            }
        }) .catch (err => {
            form.error (res, err);
        });   
    }, 
    getUser : (req, res) => {
        userModel.getUser (req)
        .then (result => {
            if (result.length !== 0){
                res.json (result);
            } else {
                return res.status (400).send ({
					status: 400,
					message: `Can't find user!`
				})
            }
        }) 
        .catch (err => {
			form.error (res, err);
		})
    },
    updateUser: (req, res) => {
        userModel.getUser (req)
        .then (result => {
            if (result.length !== 0){
                const item = result[0];
				const body = req.body;
                const id = req.params.id; 
                
				let full_name = body.full_name? body.full_name : item.full_name; 
				let email = body.email? body.email: item.email;
				let username = body.username? body.username: item.username; 
				let password = body.password? body.password: item.password;

				const data = {
					full_name: full_name,
					email: email,
					username: username,
					password: password
				}

                userModel
                .updateUser (data, id)
				.then (response => {
					res.json ({
						message: "Succsessfully updated user!",
						response
					});
				})
				.catch (err => {
					res.send ('Failed update user!');
					console.log (err);
				});
            } else {
                return res.status (400).send ({
					status: 400,
					message: `Can't find user!`
				})
            }
        }) 
        .catch (err => {
			form.error (res, err);
		})
    },
    deleteUser: (req, res) => {
        userModel.getUser (req)
        .then (result => {
            if (result.length !== 0){
                userModel
                .deleteUser  (req)
				.then (response => {
					res.json ({
						message: "Succsessfully deleted user!",
						response
					});
				})
				.catch (err => {
					res.send ('Failed delete user!');
					console.log (err);
				});
            } else {
                return res.status (400).send ({
					status: 400,
					message: `Can't find user!`
				})
            }
        }) 
        .catch (err => {
            form.error (res, err);
            console.log (err);
		})
    },
}