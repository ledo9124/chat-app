import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
import notification from '../assets/sounds/frontend_src_assets_sounds_notification.mp3';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notification);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket , setMessages , messages]);
};

export default useListenMessages;
