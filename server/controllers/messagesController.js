const Messages = require("../model/messageModel");
const User = require("../model/userModel.js");


module.exports.addMessage = async (req, res, next) => {
    try {
      const {from, to, message } = req.body;
      const data = await Messages.create({
        message : {text : message},
        users : [from , to],
        sender : from ,
      })
     
    } catch (ex) {
      next(ex);
    }
  };
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const {from,to} = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};