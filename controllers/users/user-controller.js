const Jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../db/db');


exports.login = async (req, res) => {
    try {
        const payload = req.body;
        const isUserExist = await db.user.findOne({ where: { email: payload.email } });
        if (!isUserExist) {
            res.status(400).json({
                "data": "No user found"
            })
        }
        const hashedPassword = bcrypt.compareSync(payload.password, isUserExist.password);
        if (!hashedPassword) res.status(401).json({ "data": "password not matched" });
        const token = {
            email: isUserExist.dataValues.email,
            id: isUserExist.userId,
            data: Date.now()
        }
        const accessToken = Jwt.sign(token, 'CREDEX', { expiresIn: '50m' });
        const data = {
            accessToken,
            name: `${isUserExist.dataValues.first_name} ${isUserExist.dataValues.last_name}`,
            email: payload.email,
            id: isUserExist.userId,
            data: Date.now()
        }
        return res.status(200).json({
            "data": data
        });
    }
    catch (err) {
        throw err;
    }
}

exports.signUp = async (req, res) => {
    try {
        const payload = req.body;
        const checkEmailAlreadyExist = await db.user.findOne({ where: { email: payload.email } });
        if (checkEmailAlreadyExist) return res.status(400).json('This Email is already registered with us.', {}, res);
        const passwordHash = bcrypt.hashSync(payload.password, 10);
        const obj = {
            first_name: payload.first_name,
            last_name: payload.last_name,
            phone_number: payload.phone_number,
            email: payload.email,
            password: passwordHash,
            gender: payload.gender,
            role_id: payload.role_id,
            manager_id: payload.manager_id
        };
        const data = await db.user.create(obj);
        return res.status(200).json({
            "data": data
        })
    }
    catch (err) {
        throw err;
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await db.user.findAll();
        if (!users) {
            res.status(200).send("No user found");
        }
        res.status(200).json({
            data: users,
        })
    }
    catch (err) {
        throw err;;
    }
}

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await db.user.findOne({ where: { user_id: userId } });
        if (!user) {
            res.status(200).send("No user found");
        }
        res.status(200).json({
            data: user,
        })
    }
    catch (err) {
        throw err;
    }
}

exports.getUsersByManagerId = async (req, res) => {
    try {
        const payload = req.query;
        const users = await db.user.findAll({ where: { manager_id: payload.id, role_id: 2 } });
        if (!users) {
            res.status(200).send("No user found");
        }
        res.status(200).json({
            data: users,
        })
    }
    catch (err) {
        throw err;
    }
}

exports.getManagers = async (req, res) => {
    try {
        const managersList = await db.manager.findAll();
        if (!managersList) {
            throw "No Manager Found";
        }
        res.status(200).json({
            data: managersList
        });
    } catch (err) {
        throw err;
    }
}
