import { RouterProvider } from "react-router-dom";
import { appRouter } from "./components/app/AppRouter";
import "./lsk/lskPosContext";

function App() {
  return (
    <div>
      <RouterProvider router={ appRouter } />
    </div>
  )
}

export default App
