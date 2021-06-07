// const { strictRight } = require("sequelize/types/lib/operators")
const db = require("./db/models")

const loginUser = (req, res, user) => {
    console.log(user.id, "this thing")
    req.session.auth = {
        userId: user.id,
    }
}

const logoutUser = (req, res) => {
    delete req.session.auth;
    window.addEventListener("DOMContentLoaded", (e) => {
        localStorage.setItem('imember.sid', '')
    })
};

const requireAuth = (req, res, next) => {
    if (!res.locals.authenticated) {
        return res.redirect('/user/login')
    }
    return next();
}

const restoreUser = async (req, res, next) => {
    if (req.session.auth) {
        const { userId } = req.session.auth
        try {
            const user = await db.User.findByPk(userId)

            if (user) {
                res.locals.authenticated = true
                res.locals.user = user
                next()
            }
        } catch (err) {
            res.locals.authenticated = false
            next(err)
        }
    } else {
        res.locals.authenticated = false;
        next();
    }
}

module.exports = { loginUser, restoreUser, logoutUser, requireAuth }
