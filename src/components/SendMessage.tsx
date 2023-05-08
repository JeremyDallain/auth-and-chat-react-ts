import { ChangeEvent, FormEvent, RefObject, useState } from "react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  scroll: RefObject<HTMLElement>;
}

const SendMessage = ({ scroll }: Props) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState<string>("");

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    const displayName = user?.displayName;
    const uid = user?.uid;
    await addDoc(collection(db, "messages"), {
      text: input,
      pseudo: displayName,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
    scroll.current?.scrollIntoView();
  };

  // const style = {
  //   form: `fixed bottom-0 left-0 w-full max-w-md mx-auto p-[10px] bg-white flex text-xl`,
  //   input: `flex-grow text-xl p-3 bg-gray-200 text-black outline-none border-none rounded-lg`,
  //   button: `ml-4 py-2 px-6 bg-green-500 text-white rounded-lg`,
  // };

  return (
    <div className="w-full flex justify-center fixed bottom-0  bg-gray-50 p-4">
      <form onSubmit={sendMessage} className="max-w-lg w-full flex text-xl">
        <input
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          className="text-xl p-3 bg-gray-200 text-black outline-none border-none rounded-lg w-full"
          type="text"
          placeholder="Message..."
        />
        <button
          className="ml-4 py-2 px-6 bg-indigo-600 text-white rounded-lg"
          type="submit"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
