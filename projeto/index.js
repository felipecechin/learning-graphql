const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id: 1,
    nome: 'João',
    email: 'f@hotmail.com',
    idade: 29
}, {
    id: 2,
    nome: 'Felipe',
    email: 'f@gmail.com',
    idade: 12
}
]

const typeDefs = gql`
    scalar Date

    type Usuario {
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float
    }

    #Pontos de entrada da sua API
    type Query {
        ola: String!
        horaCerta: Date!
        usuarioLogado: Usuario
        produto: Produto
        numerosMegaSena: [Int!]!
        usuarios: [Usuario]
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            return produto.preco - (produto.preco * produto.desconto)
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Query: {
        ola() {
            return 'Basta retornar uma string'
        },
        horaCerta() {
            return new Date
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: 'Ana da Web',
                email: 'anadaweb@email.com',
                idade: 23,
                salario_real: 1234.56,
                vip: true
            }
        },
        produto() {
            return {
                nome: 'Opa',
                preco: 31.45,
                desconto: 0.10
            }
        },
        numerosMegaSena() {
            // return [4, 8, 13, 27, 33]
            const crescente = (a, b) => a - b
            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente)
        },
        usuarios() {
            return usuarios
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

