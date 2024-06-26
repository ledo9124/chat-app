import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const { _id: senderId } = req.user;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.message.push(newMessage._id);
        }

        //  this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        //SOKET IO FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage" , newMessage);
        }
        
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in send message controller", error.message);
        res.status(500).json({ error: "Interval server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("message"); // NOT REFERENCE BUT ACTUAL MESSAGES

        if (!conversation) return res.status(200).json([]);

        const message = conversation.message;

        res.status(200).json(message);
    } catch (error) {
        console.log("Error in get message controller", error.message);
        res.status(500).json({ error: "Interval server error" });
    }
};
