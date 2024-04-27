import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./components/navBar";
import ArticleForm from "./components/articles/articleForm";
import Home from "./components/home";
import ViewArticle from "./components/articles/viewArticle";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route key="home" exact path="/" element={<Home />} />
        <Route
          key="articleForm"
          exact
          path="/articleForm"
          element={
            <ArticleForm
              initialValues={{}}
              buttonText={"Create Article"}
              isUpdate={false}
              setIsOpen={() => false}
            />
          }
        />
        <Route
          key="slug"
          exact
          path="/article/:slug"
          element={<ViewArticle />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
