const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");
const helpers = require('../helpers');


const signUp = async (req, res) => {
  console.log('Hola SignUP')
	try {
		const { email, password1, password2 } = req.body;
;
		if (!email || !password1 || !password2 || password1 !== password2) {
			return res.status(409).json({ error: 'Email or password incorrect!!' });
		}
		const hash = await helpers.bcrypt.encrypt(password1);
		const user = models.user({ email, password: hash });
   		await user.save();
		return res.status(201).json({ user });
	} catch (err) {
		return res.status(409).json({ error: 'Hubo un error en tu logeo' });
	}
};


const login = async (req, res) => {
  console.log(login)
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(409).json({ error: 'Email or password incorrectos!!' });
		}

		const user = await models.user.findOne({ email });
		if (!user) {
			return res.status(409).json({ error: 'El usuario no existe!' });
		}

		const isValid = await helpers.bcrypt.compare(password, user.password);
		if (!isValid) {
			return res.status(409).json({ error: 'Password invalido!' });
		}

		const token = jwt.sign({ user }, config.jwt.secret);

    return res.json({ token, userId: user._id });
      } catch (err) {
        return res.json({ err });
	}
};

const suprime = async (req, res) => {
  try {
		const { id } = req.params;

		const user = await models.user.find({ user: _id });
		for (user in users) {
			await models.user.findByIdAndRemove(user._id);
		}

		await models.user.findByIdAndRemove(id);

		return res.json(true);
	} catch (_) {
		return res.status(409).json(false);
	}
};


const create = async (req, res) => {
  try {
    // const user = models.user(req.body)
    // await user.save()

    const user = await models.user.create(req.body);
    return res.json({ user });
  } catch (err) {
    return res.json({ err });
  }
};

const all = async (req, res) => {
  try {
    const data = jwt.verify(req.headers.token, config.jwt.secret);
    const users = await models.user.find({ _id: { $ne: data.user._id } }); // TODO listará todos los usuarios menos el mio

    return res.json({ users });
  } catch (err) {
    return res.json({ err });
  }
};

// const login = async (req, res) => {
//   try {
//     const user = await models.user.findOne({ email: req.body.email });
//     if (!user) {
//       return res.json({ error: "User no existe" });
//     }

//     if (user.password !== req.body.password) {
//       return res.json({ error: "User no existe" });
//     }

//     const token = jwt.sign({ user }, config.jwt.secret);
//     return res.json({ token, userId: user._id });
//   } catch (err) {
//     return res.json({ err });
//   }
// };

module.exports = {
  create,
  signUp,
  all,
  login,
  suprime,
  };
