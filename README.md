# Working with Rick and Morty GraphQL


gh-pages: https://kmlibin.github.io/RickandMortyTSGraphQL/

This is a quick React page that I made so I could work with GraphQL and TypeScript. It shows a full character, and you can filter those characters via dropdowns on the left of the page. You can also search characters by name with the search bar. All of these are connected to search params, so you can type in any of these in the url and the page and UI will load accordingly. There is basic pagination, and you can also "save" your favorites and display them by clicking the "show favorites" button at the top. At the moment, this is a toggle (ideal? not at all) - I didn't think about whether or not the api had a POST function, and I didn't want to connect it to a separate backend at this point in time.  

### Languages / Tools / Technologies

React, JavaScript, TypeScript, CSS (SASS), HTML

ApolloClient

Font Awesome Icons, Google Fonts, data aos library

Worked with Rick and Morty GraphQL API

### Project Highlights

This project was designed so that students could continue practicing React, React Router, fetching to APIS, and Redux. Some highlights include:

    1. Usual react stuff like useState, useEffect, useMemo, search Params, react router-dom, dynamic routes, conditional rendering, forms, etc.
    2. TypeScript for type checking
    3. Connection to GraphQL api with ApolloClient
    4. SASS styling - use of variables and mixins
    5. The Rick and Morty image shakes at the top. I like it.
    

### What I learned / Things to keep working on with this page

I learned TypeScript isn't that scary.

What I'd like to continue with this page:

    1. It isn't responsive. It would be good and relatively quick (jinx?) to make it so.
    
    2. Provide extra buttons in pagination so user can jump by increments, or at least to first and last pages.
    
    3. Connect to a backend so user can store favorites, then display them as a separate page (as opposed to the toggle). 
    I could then keep the search bar, but connect it to this backend instead.
    
    4. For the filters, it would also be nice for the user to click an option that then shows a search bar; 
    this way, the user can type in their own term (as I fully appreciate I may not have provided all of the options).
    
    5. Putting the dropdowns in their own component...I did initially, but didn't love all the prop drilling. However, I similarly don't 
    love how it bogged down the return statement in App. But, to do this, I'd like to use Context or Redux to provide global state to
    the App, this way it would also eliminate the prop drilling.
    
    6. It would be nice if a user can click on any character from the list, then have it take the user to a new page where it 
    further expands on character details (same info, plus list of episodes, plus whatever other info the API has for characters).



