import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component tests", () => {
  let blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  let mockUpdateBlog = jest.fn();
  let mockDeleteBlog = jest.fn();

  test("renders title and author", () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );
    expect(component.container).toHaveTextContent(
      "React patterns - Michael Chan"
    );
  });

  test("clicking the view button displays url and number of likes", () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );

    const button = component.getByText("view");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("https://reactpatterns.com/");

    expect(component.container).toHaveTextContent("7");
  });

  test("checking if like button is clicked twice", () => {
    const component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateBlog}
        deleteBlog={mockDeleteBlog}
      />
    );
    const button = component.getByText("like");
    fireEvent.click(button);
    fireEvent.click(button);
    expect(component.container).toHaveTextContent("9");
  });

  // test("Checking if the like button is clicked twice", async () => {
  //   const mockHandler = jest.fn();
  //   const component = render(<Blog blog={blog} handleLikeBlog={mockHandler} />);

  //   const user = userEvent.setup();
  //   const button = screen.getByText("view");
  //   await user.click(button);

  //   const likebutton = screen.getByText("likes");
  //   await user.click(likebutton);
  //   await user.click(likebutton);

  //   expect(mockHandler.mock.calls.length).toBe(2);
  // });
});
