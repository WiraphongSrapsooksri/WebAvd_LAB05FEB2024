import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PostPut from "./Pages/PostPut"

const routers = createBrowserRouter([
  { path: "", element: <PostPut /> },
  { path: "/PostPut", element: <PostPut /> },]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;