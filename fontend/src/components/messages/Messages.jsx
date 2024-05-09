import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useEffect, useRef } from "react";

const Messages = () => {
    const { loading, messages } = useGetMessages();
    const lastItemRef = useRef();

    useEffect(() => {
        setTimeout(() => { lastItemRef.current?.scrollIntoView({ behavior: "smooth" }); }, 100);
    }, [messages])

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastItemRef}>
                    <Message message={message} />
                </div>
            ))}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 ?
                (<p className="text-center">Send a message to start the conversation.</p>) : ""}
        </div>
    );
};
export default Messages;

// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;