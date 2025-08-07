import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-[#0EA5E9] min-h-screen">
        <AppRoute />
      </div>
    </BrowserRouter>
  );
};

export default App;
