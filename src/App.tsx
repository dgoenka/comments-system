import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layouts/Layout.component";
import routes from "Routes";
import AllPostsComponent from "./Pages/AllPosts/AllPosts.component";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import PostComponent from "./Pages/Post/Post.component";
const theme = createTheme({
  palette: {
    primary: {
      main: "#0277bd",
    },
    secondary: {
      main: "#5c6bc0",
    },
  },
  typography: {
    fontSize: 12,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to={routes.comments.path} replace />}
          ></Route>
          <Route path={routes.comments.path} element={<AllPostsComponent />} />
          <Route path={routes.post.path} element={<PostComponent />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
