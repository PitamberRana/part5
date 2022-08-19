import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> form calls the event handler props with the right details when a new blog is called.'", () => {
  const createBlog = jest.fn();
  const setClassStatus = jest.fn();

  const component = render(
    <BlogForm createBlog={createBlog} setClassStatus={setClassStatus} />
  );

  const input = component.container.querySelector("#title");
  const form = component.container.querySelector("form");

  fireEvent.change(input, {
    target: { value: "Component testing" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("Component testing");
});
