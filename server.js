const express = require('express')
const nunjucks = require('nunjucks')

const db = require('./db')
const server = express()

server.use(express.static('public'))

server.use(express.urlencoded({ extended: true }))


nunjucks.configure('views', {
    express: server,
    noCache: true,
})


server.get('/', (request, response) => {

        db.all(`SELECT * FROM ideas`, function(error, rows) {
                if(error) {
                    return  response.send('Erro no banco de dados! Contate o suporte')
                }

                const reversedIdeas = [...rows].reverse()

                let lastIdeas = []
                for (let idea of reversedIdeas) {
                    if (lastIdeas.length < 2) {
                        lastIdeas.push(idea)
                    }
                }
            
                lastIdeas = lastIdeas.reverse()
            
                return response.render('index.html', { ideas: lastIdeas })
        })    
})

server.get('/ideias', (request, response) => {

    db.all(`SELECT * FROM ideas`, function(error, rows) {
        if(error) {
            return  response.send('Erro no banco de dados! Contate o suporte')
        }

        const reversedIdeas = [...rows].reverse()
    
        return response.render('ideias.html', { ideas: reversedIdeas })
    }) 
})

server.post('/ideias', (request, response) => {

    const insertQuery = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?, ?, ?, ?, ?)            
    `

    const valuesQuery = [
        request.body.image,
        request.body.title,
        request.body.category,
        request.body.description,
        request.body.link
    ]

    db.run(insertQuery, valuesQuery, function(error) {
        if(error) {
            return  response.send('Erro no banco de dados! Contate o suporte')
        }

        return response.redirect('/ideias')
    })
})

server.post('/', (request, response) => {

    const insertQuery = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?, ?, ?, ?, ?)            
    `

    const valuesQuery = [
        request.body.image,
        request.body.title,
        request.body.category,
        request.body.description,
        request.body.link
    ]

    db.run(insertQuery, valuesQuery, function(error) {
        if(error) {
            return  response.send('Erro no banco de dados! Contate o suporte')
        }

        return response.redirect('/ideias')
    })
})
server.listen(3000)