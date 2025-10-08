const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let livros = [];

app.get('/livros', (req,  res) => {
    res.json(livros);
});

app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livros = livros.find(p => p.id);
    if (livros) {
        res.json(livros);
    }else{
        res.status.send('Livro não encontrado!');
    }
});

app.post('/livros',
    (req, res) => {
        const nome = req.body.nome;
        const novoLivro = { id:livros.length + 1, nome: nome};
        livros.push(novoLivro);
        res.status(201).json(novoLivro);
    }
);

app.put('livros/:id',
    (req, res) => {
        const id = parseInt(req.params.id);
        const { nome } = req.body;

        const livro = livros.find(p => p.id === id);

        if (livros) {
            livro.nome = nome;
            res.json(livro);
        } else {
            res.status(404).json({ error: 'pessoa não encontrada'})
        }
    }
);

app.delete


app.listen(port, () => {
  console.log(`servidor em execução: http://localhost:${port}`);
});