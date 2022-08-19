describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Govinda",
      username: "govinda",
      password: "123456",
    };
    cy.request("POST", "http://localhost:3003/users/", user);
    cy.visit("http://localhost:3000");
    cy.contains("show login").click();
  });

  describe("Login", function () {
    it("Login form is shown by default", function () {
      cy.get("#username").type("govinda");
      cy.get("#password").type("123456");
      cy.get("#login-btn").click();

      cy.contains("Govinda logged-in");

      cy.contains("logout");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("govinda");
      cy.get("#password").type("wrong");
      cy.get("#login-btn").click();
    });
  });

  describe("When Logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("govinda");
      cy.get("#password").type("123456");
      cy.get("#login-btn").click();
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Govinda");
      cy.get("#url").type("http://localhost:3000");
      cy.get("#create-btn").click();
      cy.contains("a blog created by cypress");
    });
  });

  describe("When log in and creates a new blog", function () {
    beforeEach(function () {
      cy.get("#username").type("govinda");
      cy.get("#password").type("123456");
      cy.get("#login-btn").click();
      cy.contains("new blog").click();
      cy.get("#title").type("Testing like functionality with cypress");
      cy.get("#author").type("Govinda");
      cy.get("#url").type("hhttp://localhost.com");
      cy.get("#create-btn").click();
    });

    it("A blog can be liked", function () {
      cy.contains("Testing like functionality with cypress")
        .get("#showView")
        .click();
      cy.get("#like-btn").click();
      cy.contains("1");
    });

    it("user who created a blog can delete it", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("First class tests");
      cy.get("#author").type("Edsger W. Dijkstra");
      cy.get("#url").type(
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
      );
      cy.contains("add").click();
      cy.contains("view").click();
      cy.get("#remove").click();
    });
  });
});
