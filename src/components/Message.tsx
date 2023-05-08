import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { MessageType } from "../pages/Chat";

interface Props {
  message: MessageType;
}

const style = {
  message: `flex items-center m-4 py-3 px-6 rounded-tl-full rounded-tr-full relative`,
  name: `absolute -top-6 text-gray-600 text-xs`,
  sent: `bg-indigo-600 text-white flex-row-reverse float-right rounded-bl-full`,
  received: `bg-gray-100 text-black float-left rounded-br-full`,
};

const Message = ({ message }: Props) => {
  const [user] = useAuthState(auth);
  const messageClass =
    message.uid === user?.uid ? `${style.sent}` : `${style.received}`;

  const nameClass = message.uid === user?.uid ? `right-4` : `left-4`;

  return (
    <div>
      <div className={`${style.message} ${messageClass}`}>
        <p className={`${style.name} ${nameClass}`}>{message.pseudo}</p>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default Message;
