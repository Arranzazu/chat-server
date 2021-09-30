const models = require("../models");

const create = async (req, res) => {
  try {
    const { userOneId, userTwoId, userOwnerId, text } = req.body;

    if (text.length === 0) {
      return res.json({ err: "mensage vacio" });
    }

    const userOne = await models.user.findById(userOneId);
    if (!userOne) {
      return res.json({ erro: "User no existe" });
    }

    const userTwo = await models.user.findById(userTwoId);
    if (!userTwo) {
      return res.json({ erro: "User no existe" });
    }

    const userOwner = await models.user.findById(userOwnerId);
    if (!userOwner) {
      return res.json({ erro: "User no existe" });
    }

    let message = null;

    const messages = await models.message.find({
      userOne: userTwo,
      userTwo: userOne,
    });
    if (messages.length === 0) {
      message = await models.message.create({
        userOne,
        userTwo,
        userOwner,
        text,
      });
    } else {
      message = await models.message.create({
        userOne: userTwo,
        userTwo: userOne,
        userOwner,
        text,
      });
    }

    return res.json({ message });
  } catch (err) {
    return res.json({ err });
  }
};



const chat = async (req, res) => {
  try {
    const { userOneId, userTwoId } = req.body;

    console.log({ body: req.body });

    const userOne = await models.user.findById(userOneId);
    if (!userOne) {
      return res.json({ err: "El userOne no existe" });
    }

    const userTwo = await models.user.findById(userTwoId);
    if (!userTwo) {
      return res.json({ err: "El userTwo no existe" });
    }

    let result = [];

    const userList1 = await models.message.find({
      userOne: userOne,
      userTwo: userTwo,
    });
    if (userList1.length === 0) {
      const usersList2 = await models.message.find({
        userOne: userTwo,
        userTwo: userOne,
      });

      if (usersList2.length !== 0) {
        result = usersList2;
      }
    } else {
      result = userList1;
    }

    return res.json({ messages: result });
  } catch (err) {
    return res.json({ err });
  }
};

module.exports = {
  create,
  chat,
};
