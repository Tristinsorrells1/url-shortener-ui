describe("URL shortener user flows", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/api/v1/urls",
      },
      {
        statusCode: 200,
        body: { urls: [
          {
            id: 1,
            long_url: "https://frontend.turing.edu/",
            title: "Cypress Stub #1",
            short_url: "http://localhost:3001/useshorturl/3",
          },
          {
            id: 2,
            long_url: "https://calendar.google.com/calendar/u/0/r",
            title: "Cypress Stub #2",
            short_url: "http://localhost:3001/useshorturl/2",
          },
        ]}
      }
    );

       cy.intercept(
         {
           method: "POST",
           url: "http://localhost:3001/api/v1/urls",
         },
         {
           statusCode: 200,
           body: {
             urls: [
               {
                 id: 1,
                 long_url: "https://frontend.turing.edu/",
                 title: "Cypress Stub #1",
                 short_url: "http://localhost:3001/useshorturl/3",
               },
               {
                 id: 2,
                 long_url: "https://calendar.google.com/calendar/u/0/r",
                 title: "Cypress Stub #2",
                 short_url: "http://localhost:3001/useshorturl/2",
               },
               {
                 id: 3,
                 long_url: "http://localhost:9000/file=cypress/",
                 title: "Cypress Stub #3",
                 short_url: "http://localhost:3001/useshorturl/1",
               },
             ],
           },
         }
       );

    cy.visit("http://localhost:3000");
  });

  it("When a user visits the page, they can view the page title and the existing shortened URLs", () => {
    cy.get("h1").should("contain", "URL Shortener")
    cy.get("section[class='url-container']").should("be.visible")
    cy.get("div[class='url']").should("have.length", 2)
    
    cy.get("h3").eq(0).should("contain", "Cypress Stub #1")
    cy.get("a").eq(0).should("contain", "http://localhost:3001/useshorturl/3");
    cy.get("p").eq(0).should("contain", "https://frontend.turing.edu/");

    cy.get("h3").eq(1).should("contain", "Cypress Stub #2");
    cy.get("a").eq(1).should("contain", "http://localhost:3001/useshorturl/2");
    cy.get("p").eq(1).should("contain", "https://calendar.google.com/calendar/u/0/r");

  });

  it("When a user visits the page, they can view the Form with the proper inputs", () => {
    cy.get("input[class='title']").should("be.visible")
    cy.get("input[class='url']").should("be.visible");
    cy.get("button").should("be.visible")
  });

  it("When a user fills out the form, the information is reflected in the input fields", () => {
    cy.get("input[class='title']").type("Cypress Test #3")
    cy.get("input[class='title']").should("have.attr", "value").should("equal", "Cypress Test #3")

    cy.get("input[class='url']").type("http://localhost:9000/file=cypress/");
    cy.get("input[class='url']").should("have.attr", "value").should("equal", "http://localhost:9000/file=cypress/");
  });

  it("When a user fills out and submits the form, the new shortened URL is rendered", () => {
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/api/v1/urls",
      },
      {
        statusCode: 200,
        body: {
          urls: [
            {
              id: 1,
              long_url: "https://frontend.turing.edu/",
              title: "Cypress Stub #1",
              short_url: "http://localhost:3001/useshorturl/3",
            },
            {
              id: 2,
              long_url: "https://calendar.google.com/calendar/u/0/r",
              title: "Cypress Stub #2",
              short_url: "http://localhost:3001/useshorturl/2",
            },
            {
              id: 3,
              long_url: "http://localhost:9000/file=cypress/",
              title: "Cypress Stub #3",
              short_url: "http://localhost:3001/useshorturl/1",
            },
          ],
        },
      }
    );

    cy.get("input[class='title']").type("Doesn't matter because stubbing");
    cy.get("input[class='url']").type("http://localhost:9000/file=cypress/");
    cy.get("button").click()
  
    cy.get("div[class='url']").should("have.length", 3);
    cy.get("h3").eq(2).should("contain", "Cypress Stub #3");
    cy.get("a").eq(2).should("contain", "http://localhost:3001/useshorturl/1");
    cy.get("p").eq(2).should("contain", "http://localhost:9000/file=cypress/");
  });
});
