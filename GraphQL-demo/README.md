## Fastify GraphQL

```
npm i fastify
npm i graphql
npm i graphql-http
```

POST http://localhost:3000/graphql

```
{
  getAllBooks {
    id
    title
    description
    authorId
    author {
      id
      firstName
      lastName
      books {
        id
        title
      }
    }
  }
  getAllAuthors {
    id
    firstName
    lastName
    books {
      id
      title
    }
  }
  getBook(id:3){
    id
    title
    description
    author{
      id
      firstName
      lastName
    }
  }
}

mutation{
  addAuthor(authorInput:{firstName:"Oskar",lastName:"Don"}){
    id
    firstName
     lastName
  }
}

mutation {
  addBook(bookInput: {title: "Java", description: "about Java", authorId: 1}) {
    id
    title
    description
    authorId
  }
}
```