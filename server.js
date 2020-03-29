const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))


nunjucks.configure('views', {
    express: server,
    noCache: true,
})

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Curso de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam animi ad suscipit assumenda eius, vel quasi amet impedit expedita! Quis optio sunt corporis suscipit aliquam sit asperiores dolorem temporibus quod.",
        url: "http://rocketseat.com.br",
    },
    
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercício",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam animi ad suscipit assumenda eius, vel quasi amet impedit expedita! Quis optio sunt corporis suscipit aliquam sit asperiores dolorem temporibus quod.",
        url: "http://rocketseat.com.br",
    },
    
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
        title: "Meditação",
        category: "Mentalidade",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam animi ad suscipit assumenda eius, vel quasi amet impedit expedita! Quis optio sunt corporis suscipit aliquam sit asperiores dolorem temporibus quod.",
        url: "http://rocketseat.com.br",
    },
    
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Karaokê",
        category: "Diversão em Família",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam animi ad suscipit assumenda eius, vel quasi amet impedit expedita! Quis optio sunt corporis suscipit aliquam sit asperiores dolorem temporibus quod.",
        url: "http://rocketseat.com.br",
    }
    
]

server.get('/', (request, response) => {

    const reversedIdeas = [...ideas].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
        if (lastIdeas.length < 2) {
            lastIdeas.push(idea)
        }
    }

    lastIdeas = lastIdeas.reverse()

    return response.render('index.html', { ideas: lastIdeas })
})

server.get('/ideias', (request, response) => {

    const reversedIdeas = [...ideas].reverse()

    return response.render('ideias.html', { ideas: reversedIdeas })
})

// server.get('/', function (request, response) {
//     return response.render("index.html")
// })

// server.get('/ideias', function (request, response) {
//     return response.render("ideias.html")
// }) 


server.listen(3000)