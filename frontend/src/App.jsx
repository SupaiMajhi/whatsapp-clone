import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login.jsx";
import StatusPage from "./pages/StatusPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

//store imports
import useAuthStore from "./store/useAuthStore.js";
import HomeLayout from "./pages/HomeLayout.jsx";

// import useMessageStore from "./store/useMessageStore.js";

function App() {
  const checkAuthentication = useAuthStore((state) => state.checkAuthentication);
  const [isChatSelected, setIsChatSelected] = useState(false);
  const [chatPartner, setChatPartner] = useState(null);
  
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <div className="flex w-screen h-screen bg-black">
      <Routes>
        {/* login */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeLayout />}>
          <Route index element={
            <ChatPage 
              setIsChatSelected={setIsChatSelected}
              isChatSelected={isChatSelected}
              setChatPartner={setChatPartner}
              chatPartner={chatPartner}
            />} />
          <Route path='status' element={<StatusPage />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='profile' element={<ProfilePage />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
