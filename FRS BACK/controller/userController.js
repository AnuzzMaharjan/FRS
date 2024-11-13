const db = require('../database');
const bcrypt = require('bcrypt');
const {jwtTokenForAuthentication} = require('../middleware/jwttoken');

const checkUsernameRepetition = async (username) => {
    const query = "SELECT * FROM userInfo WHERE username = ?";

    try {
        const [rows] = await db.query(query, [username]);
        return rows.length > 0 ? true : false;
    }catch(err) {
            console.log('Couldnt get the user:', err);
            res.status(500).send('Error fetching data');
    }
}
const checkEmailRepetition =async (email) => {
    const query = "SELECT * FROM userInfo WHERE email = ?";

    try {
        const [rows] = await db.query(query, [email]);
        return rows.length > 0 ? true : false;
    }catch(err) {
            console.log('Couldnt get the user:', err);
            res.status(500).send('Error fetching data');
    }
}

const getUsers = (req, res) => {
    const query = "SELECT * FROM UserInfo";

    db.query(query)
        .then(([rows]) => {
            res.json(rows);
        })
        .catch(err => {
            console.error('Error fetching data: ', err);
            res.status(500).send('Error fetching data');
        })
}

const createUsers =async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    if (await checkUsernameRepetition(username) ) {
        return res.status(409).send('Username already exists!!');
    }
    else if (await checkEmailRepetition(email)) { 
        return res.status(409).send('Email already exists!!');
    } else {
        const query = 'INSERT INTO userInfo (username,email,password,role) values (?,?,?,?)';
        db.query(query, [username, email, hashedPassword, 'user'])
        .then(([result]) => {
                if (result.affectedRows > 0) {
                    res.status(200).json({success:true, message: `User created successfully!` });
                } else {
                    res.status(404).json({success:false, message: 'Failed to create the user' });
                }
            })
            .catch(err => {
                console.log('Error creating user', err);
                res.status(500).send('Failed to create user');
            })
    }
}

const deleteUser = (req, res) => {
    const query = "DELETE FROM userInfo WHERE userId = ?";
    const userId = Number(req.params.id);
    db.execute(query, [userId])
        .then(([result]) => {
            if (result.affectedRows > 0) {
                res.status(200).json({ message: `Deleted user with id: ${userId}` });
            } else {
                res.status(404).json({ message: `User with id: ${userId} doesnot exists` });
            }
        })
        .catch(err => {
            console.error('Error deleting user: ', err);
            res.status(500).send('Failed to delete the user');
        })
}

const userLogin = (req,res) => {
    const { email, password } = req.body;
    const emailPresent = checkEmailRepetition(email);

    if (emailPresent) {
        const query = 'SELECT password,userId,role FROM userInfo where email = ?';
        db.query(query, [email])
            .then(([result]) => {
                const dbPassword = result.length > 0 && result[0].password;
                if (dbPassword) {
                    const isMatched = bcrypt.compareSync(password, dbPassword);
                    if (isMatched) {
                        console.log("user: ",result);
                        res.status(200).json({success:true,userId:result[0].userId,role:result[0].role, token: jwtTokenForAuthentication(email,result[0].role) });
                    } else {
                        res.status(401).json({ success: false, message: 'Email or password doesn\'nt match!' });
                    }
                } else {
                    res.status(404).json({ success: false, message: 'User not found! Please make sure you are registered!!' });
                }
        })
    }
}

const getUser = (req, res) => {
    if (req.user) {
        const query = 'SELECT * FROM userInfo WHERE userId = ?';
    
        db.query(query, [req.params.id])
            .then(([row]) => {
                if (row.length > 0) {
                    res.status(200).json({
                        success:true,
                        userId: row[0].userId,
                        username: row[0].username,
                        email: row[0].email,
                        role: row[0].role
                    });
                } else {
                    res.status(422).json({ success: false, message: 'Couldn\'nt find the user data!' });
                }
            }).catch(err => {
                console.log('Error getting the user data: ', err);
                res.status(500).json({ success: false, message: 'Couldn\'t fetch the user!' });
        })
    }
}

const test = (req, res) => {
    res.status(200).json({ message: 'got otp' });
}

module.exports = {
    getUsers,
    createUsers,
    deleteUser,
    userLogin,
    getUser,
    test
};