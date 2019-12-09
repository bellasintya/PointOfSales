const userModel = require('../Models/user');
const form = require('../Helpers/form');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(0);
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = {
    registerUser: (req, res) => {
        if (req.body.full_name && req.body.email && req.body.username && req.body.password !== undefined) {
            name = req.body.full_name.trim();
            email = req.body.email.trim();
            username = req.body.username.trim();
            password = req.body.password.trim();

            if (name === null || name === "" || name === undefined) {
                return form.error(res, "Full name can't be empty");
            }
            const emailRegExp = new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            if (email === null || email === "" || email === undefined) {
                return form.error(res, "Email can't be empty");
            }
            else if (!emailRegExp.test(email)) {
                return form.error(res, "Email isn't valid");
            }
            if (username === null || username === "" || username === undefined) {
                return form.error(res, "Username can't be empty");
            }
            const passwordRegExp = new RegExp(
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
            );
            if (password === null || password === "" || password === undefined) {
                return form.error(res, "Password can't be empty");
            }
            else if (!passwordRegExp.test(req.body.password)) {
                return form.error(res, "Password minimal 8 digits and have lower, upper character and number");
            }

            const pass = bcrypt.hashSync(req.body.password, salt);

            let data = {
                full_name: name,
                email: email,
                username: username,
                password: pass
            }

            userModel.getUsername(req.body.username)
                .then(result => {
                    if (result.length !== 0) form.error(res, "Username has taken")
                    userModel.registerUser(data)
                        .then(result => {
                            res.json({
                                status: 200,
                                message: 'User successfully created!'
                            });
                        })
                        .catch(err => {
                            form.error(res, err);
                        })
                }).catch(err => {
                    form.error(res, err);
                })
        }
        else {
            form.error(res, "Fill all the data required (full_name, email, username, password)");
        }
    },

    loginUser: (req, res) => {
        if (req.body.username && req.body.password !== undefined) {
            let username = req.body.username.trim(),
                password = req.body.password.trim();

            if (username === null || username === "" || username === undefined) return form.error(res, "Username can't be empty");
            if (password === null || password === "" || password === undefined) return form.error(res, "Password can't be empty");

            userModel
                .loginUser(req)
                .then(result => {
                    if (result.length !== 0) {
                        if (bcrypt.compareSync(password, result[0].password)) {
                            const token = jwt.sign({
                                id_user: result[0].id_user,
                                username: result[0].username
                            }, secretKey, {
                                expiresIn: '1d'
                            });
                            form.successSign(res, {
                                id_user: result[0].id_user,
                                username: result[0].username,
                                token: token,
                            });
                        } else {
                            form.error(res, "Password incorrect")
                        }
                    } else {
                        form.error(res, "User not found")
                    }
                });
        } else {
            form.error(res, "Fill all the data required (username, password)");
        }
    },
    getUsers: (req, res) => {
        userModel.getUsers(req)
            .then(result => {
                if (result.length !== 0) {
                    res.json(result);
                }
                else {
                    form.error(res, "Can't find users")
                }
            }).catch(err => {
                form.error(res, err);
            });
    },
    getUser: (req, res) => {
        const id = req.params.id;
        userModel.getUser(id)
            .then(result => {
                if (result.length !== 0) {
                    res.json(result);
                } else {
                    return form.error({
                        status: 400,
                        message: `Can't find user!`
                    })
                }
            })
            .catch(err => {
                form.error(res, err);
            })
    },
    getUsername: (req, res) => {
        const username = req.body.username;
        userModel.getUsername(username)
            .then(result => {
                if (result.length !== 0) {
                    res.json(result);
                } else {
                    return form.error({
                        status: 400,
                        message: `Can't find user by ` + username + `username!`
                    })
                }
            })
            .catch(err => {
                form.error(res, err);
            })
    },
    getUserError: (_, res) => {
        form.error(res, "User ID can't be empty")
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        userModel.getUser(id)
            .then(result => {
                if (result.length !== 0) {
                    const item = result[0];
                    const body = req.body;


                    console.log(body);

                    let full_name = body.full_name ? body.full_name : item.full_name;
                    let email = body.email ? body.email : item.email;
                    let username = body.username ? body.username : item.username;
                    let password = body.password ? body.password : item.password;

                    const data = {
                        full_name: full_name,
                        email: email,
                        username: username,
                        password: password
                    }
                    console.log(data);
                    userModel
                        .updateUser(data, id)
                        .then(response => {
                            res.json({
                                status: 200,
                                message: 'User has succesfully updated!',
                                result: {
                                    id_user: parseInt(id),
                                    full_name: full_name,
                                    email: email,
                                    username: username,
                                    password: password
                                },
                                response: response
                            });
                        })
                        .catch(err => {
                            res.send('Failed update user!');
                            console.log(err);
                        });
                } else {
                    return res.status(400).send({
                        status: 400,
                        message: `Can't find user!`
                    })
                }
            })
            .catch(err => {
                form.error(res, err);
            })
    },
    deleteUser: (req, res) => {
        let id = req.params.id;
        userModel.getUser(id)
            .then(result => {
                if (result.length !== 0) {
                    userModel
                        .deleteUser(id)
                        .then(response => {
                            res.json({
                                result: {
                                    status: 200,
                                    message: 'User Deleted!',
                                    id,
                                    response,
                                }
                            });
                        })
                        .catch(err => {
                            form.error(res, "Can't delete user because it used in another field")
                        });
                } else {
                    return res.status(400).send({
                        status: 400,
                        message: `Can't find user!`
                    })
                }
            })
            .catch(err => {
                form.error(res, err);
                console.log(err);
            })
    },
}