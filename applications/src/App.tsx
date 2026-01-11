import DesktopTitleBar from "./components/DesktopTitleBar";
import { Outlet } from "react-router-dom";
import { isElectron } from "./utils/electron";

function App() {
  const electron = isElectron();

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {electron && <DesktopTitleBar />}
      <div className="flex-1" style={{ paddingTop: electron ? "40px" : 0 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
