import { useState, useEffect, useRef } from "react";
import Blog from "./component/Blog";
import blogService from "./services/blogs";
import Notification from "./component/Notification";
import loginService from "./services/login";
import Togglable from "./component/Togglable";
import LoginForm from "./component/LoginForm";
import BlogForm from "./component/BlogForm";

const App = () => {
  const blogFormRef = useRef();

  const [blogs, setBlogs] = useState([]);
  const [msg, setMsg] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [classStatus, setClassStatus] = useState("");

  useEffect(() => {
    blogService.getAll().then((data) => setBlogs(data));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.create(BlogToAdd);
      setMsg(
        `A new blog [${BlogToAdd.title}] by ${BlogToAdd.author} was successfully added`
      );
      setBlogs(blogs.concat(createdBlog));
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    } catch (exception) {
      setMsg(`Cannot add blog ${BlogToAdd.title}`);
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setClassStatus(`error`);
      setMsg("invalid username or password");
      setTimeout(() => {
        setMsg(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleUpdateBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);

    const updateObject = { ...blog, likes: blog.likes + 1 };
    // console.log(updateObject);

    try {
      const result = await blogService.update(id, updateObject);
      console.log(result);

      setBlogs(blogs.map((blog) => (blog.id === result.id ? result : blog)));
    } catch (exception) {
      setMsg(`${exception.response.data.error}`);
    }
  };

  const handleDeleteBlog = async (id) => {
    console.log(id);
    if (
      window.confirm(
        `Remove blog. You're not going to need it! by ${user.name}`
      )
    ) {
      try {
        console.log("inside");
        await blogService.remove(id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (exception) {
        setMsg(`${exception.response.data.error}`);
      }
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel=" show login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} setClassStatus={setClassStatus} />
    </Togglable>
  );

  if (user === null) {
    return (
      <div>
        <Notification msg={msg} classStatus={classStatus} />
        {loginForm()}
      </div>
    );
  } else {
    return (
      <div>
        <Notification msg={msg} classStatus={classStatus} />
        <p>
          {user.name} logged-in <button onClick={handleLogout}>logout</button>
        </p>
        {blogForm()}

        <h1>Blogs</h1>
        <ul>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleUpdateBlog={handleUpdateBlog}
                handleDeleteBlog={handleDeleteBlog}
              />
            ))}
        </ul>
      </div>
    );
  }
};

export default App;
