import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../config/firebase";
import Message from "../components/Message";
import SendMessage from "../components/SendMessage";
import { useEffect, useRef } from "react";

export type MessageType = {
  id: string;
  text: string;
  pseudo: string;
  uid: string;
  timestamp: string;
};

export const Chat = () => {
  const [value] = useCollection(
    query(collection(db, "messages"), orderBy("timestamp", "asc"))
  );
  const scroll = useRef<HTMLElement>(null);

  const messages = value?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as MessageType[];
  console.log(messages);

  useEffect(() => {
    if (messages) {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const style = {
    main: `flex flex-col max-w-lg w-full mx-auto h-full pt-16 pb-24 overflow-y-auto`,
  };

  return (
    <>
      <h1 className="text-5xl text-center mt-24">Chat Room</h1>
      <main className={style.main}>
        {messages &&
          messages.map((message) => {
            return <Message key={message.id} message={message} />;
          })}
      </main>
      <SendMessage scroll={scroll} />
      <span ref={scroll}></span>
    </>
  );
};
