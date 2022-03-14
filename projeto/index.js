const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    #Pontos de entrada da sua API
    type Query {
        ola: String
        horaCerta: Date
    }
`

const resolvers = {
    Query: {
        ola() {
            return 'Basta retornar uma string'
        },
        horaCerta() {
            return new Date
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log('Executando em ' + url)
})

