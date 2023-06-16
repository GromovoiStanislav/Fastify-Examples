const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')
const {books, authors} = require('./db');


const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }
    })
})

const BookInputType = new GraphQLInputObjectType({
    name: 'BookInput',
    description: 'a book input type',
    fields: () => ({
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLInt)},
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents a author of a book',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        lastName: {type: new GraphQLNonNull(GraphQLString)},
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
})

const AuthorInputType = new GraphQLInputObjectType({
    name: 'AuthorInput',
    description: 'a author input type',
    fields: () => ({
        firstName: {type: new GraphQLNonNull(GraphQLString)},
        lastName: {type: new GraphQLNonNull(GraphQLString)},
    })
})



const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        getBook: {
            type: BookType,
            description: 'A Single Book',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => books.find(book => book.id === args.id)
        },
        getAllBooks: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: () => books
        },
        getAllAuthors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: () => authors
        },
        getAuthor: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (parent, args) => authors.find(author => author.id === args.id)
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addBook: {
            type: BookType,
            description: 'Add a book',
            args: {
                bookInput: {type: new GraphQLNonNull(BookInputType)},
            },
            resolve: (parent, args) => {
                const book = {
                    id: books.length + 1,
                    title: args.bookInput.title,
                    description: args.bookInput.description,
                    authorId: args.bookInput.authorId
                }
                books.push(book)
                return book
            }
        },
        addAuthor: {
            type: AuthorType,
            description: 'Add an author',
            args: {
                authorInput: {type: new GraphQLNonNull(AuthorInputType)},
            },
            resolve: (parent, args) => {
                const author = {
                    id: authors.length + 1,
                    firstName: args.authorInput.firstName,
                    lastName: args.authorInput.lastName
                }
                authors.push(author)
                return author
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

module.exports = schema;
