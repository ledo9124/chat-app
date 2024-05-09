import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
	const {loading , conversations} = useGetConversation();

	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation , Idx) => (
				<Conversation 
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={Idx === conversations.length - 1}
				/>
			))}
			{loading ? <span className="loading loading-spinner"></span> : null}
		</div>
	);
};
export default Conversations;

// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
// 	return (
// 		<div className='py-2 flex flex-col overflow-auto'>
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 			<Conversation />
// 		</div>
// 	);
// };
// export default Conversations;