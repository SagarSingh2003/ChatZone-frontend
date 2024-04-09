import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./Components/Dashboard";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import ServerAndRoomContextProvider, {
  ServerAndRoomContext,
} from "./Context/ServerAndRoomData";
import AllServerDataContextProvider from "./Context/AllServerData";
import AccountDataContextProvider, {
  AccountDataContext,
} from "./Context/AccountData";
import ChatInterface from "./Components/ChatInterface";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ServerAndRoomContextProvider>
                <AllServerDataContextProvider>
                  <AccountDataContextProvider>
                    <Dashboard />
                  </AccountDataContextProvider>
                </AllServerDataContextProvider>
              </ServerAndRoomContextProvider>
            }
          ></Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />}></Route>
          <Route
            path="/chatzone/:server_id"
            element={
              <ServerAndRoomContextProvider>
                <AccountDataContextProvider>
                  <ChatInterface />
                </AccountDataContextProvider>
              </ServerAndRoomContextProvider>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
