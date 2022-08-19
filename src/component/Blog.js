import React, { useState } from "react";

const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const showWhenVisible = { display: visible ? "" : "none" };
  const handleVisible = () => setVisible(!visible);

  const buttonLabel = visible ? "hide" : "view";

  return (
    <div style={blogStyle} className="blog">
      <div>
        <p>
          {blog.title} - {blog.author}{" "}
          <button onClick={handleVisible} id="showView">
            {buttonLabel}
          </button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{" "}
          <button id="like-btn" onClick={() => handleUpdateBlog(blog.id)}>
            like
          </button>
        </p>
        <button id="remove" onClick={() => handleDeleteBlog(blog.id)}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
