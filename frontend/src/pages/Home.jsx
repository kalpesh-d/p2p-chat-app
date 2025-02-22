import { useDispatch, useSelector } from "react-redux";

import NoChat from "../components/NoChat";
import SideBar from "../components/SideBar";
import ChatContainer from "../components/ChatContainer";


function Home() {
  const { users, selectedUser } = useSelector(state => state.chat);
  const dispatch = useDispatch();

  return (
    <section className="h-screen bg-base-200">
      <div className="flex items-center px-4">
        <div className="rounded-lg w-full h-[calc(100vh)] bg-base-200">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar />

            {!selectedUser ? <NoChat /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
