const { ApolloServer, gql } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

let books = [
    {
        id: 'book-001',
        title: '1984',
        author: {
            id: 'author-001',
            name: 'George Orwell',
            company: {
                id: 'company-001',
                name: 'Penguin Random House',
            },
        },
    },
    {
        id: 'book-002',
        title: 'To Kill a Mockingbird',
        author: {
            id: 'author-002',
            name: 'Harper Lee',
            company: {
                id: 'company-002',
                name: 'J.B. Lippincott & Co.',
            },
        },
    },
    {
        id: 'book-003',
        title: 'Brave New World',
        author: {
            id: 'author-003',
            name: 'Aldous Huxley',
            company: {
                id: 'company-003',
                name: 'Chatto & Windus',
            },
        },
    },
    {
        id: 'book-004',
        title: 'The Great Gatsby',
        author: {
            id: 'author-004',
            name: 'F. Scott Fitzgerald',
            company: {
                id: 'company-004',
                name: 'Charles Scribner\'s Sons',
            },
        },
    },
];

const typeDefs = gql`
    type Company {
        id: ID!
        name: String!
    }

    type Author {
        id: ID!
        name: String!
        bio: String  # Add this line if you want to include bio
        company: Company!
    }

    type Book {
        id: ID!
        title: String!
        author: Author!
    }

    type Query {
        books: [Book]
        searchCompanyById(id: ID!): Company
        authors: [Author]
        author(id: ID!): Author
    }

    input CompanyInput {
        name: String!
    }

    input AuthorInput {
        name: String!
        company: CompanyInput!
    }

    input BookInput {
        title: String!
        author: AuthorInput!
    }

    type Mutation {
        createBook(input: BookInput): Book
    }
`;

const resolvers = {
    Query: {
        books: () => books,
        searchCompanyById: (_, { id }) => {
            const companies = books.map(book => book.author.company);
            return companies.find(company => company.id === id);
        },
        authors: () => {
            const authors = books.map(book => book.author);
            return authors.reduce((unique, author) => {
                const exists = unique.find(a => a.id === author.id);
                if (!exists) {
                    unique.push(author);
                }
                return unique;
            }, []);
        },
        author: (_, { id }) => {   // Add this resolver
            const authors = books.map(book => book.author);
            return authors.find(author => author.id === id);
        },
    },
    Mutation: {
        createBook: (_, { input }) => {
            const authorId = `author-${uuidv4()}`;
            const companyId = `company-${uuidv4()}`;

            const newBook = {
                id: `book-${uuidv4()}`,
                title: input.title,
                author: {
                    id: authorId,
                    name: input.author.name,
                    company: {
                        id: companyId,
                        name: input.author.company.name,
                    },
                },
            };

            books.push(newBook);
            return newBook;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,  // Enabled introspection for development purposes
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
