const { authService } = require("../services");

const register = async (req, resp) => {
    try {
        const user = await authService.register(req.body);
        resp.status(200).json({ user: user });
    } catch (e) {
        resp.status(500).json({ error: e });
    }
};

const login = async (req, resp) => {
    try {
        const result = await authService.login(req.body);
        resp.status(200).json({ result: result });
    } catch (e) {
        resp.status(500).json({ error: e });
    }
};

const sendActivationCode = async (req, resp) => {
    try {
        const { activationToken, phoneNumber } = req.body;
        const result = await authService.sendActivationCode(activationToken, phoneNumber);
        resp.status(200).json({ result: result });
    } catch (e) {
        resp.status(500).json({ error: e });
    }
};

const activate = async (req, resp) => {
    try {
        const result = await authService.authorize(req.body.activationCode);
        resp.status(200).json({ result: result });
    } catch (e) {
        resp.status(500).json({ error: e });
    }
};

module.exports = {
    register: register,
    login: login,
    sendActivationCode: sendActivationCode,
    activate: activate,
};