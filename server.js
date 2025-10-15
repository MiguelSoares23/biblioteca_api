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
    const livro = livros.find(p => p.id === id);

    if (livro) {
        res.json(livro);
    } else {
        res.status(404).send('Livro não encontrado!');
    }
});

app.post('/livros', (req, res) => {
    const { nome, categoria, autor } = req.body;
    const novoLivro = { 
        id: livros.length + 1, 
        nome, 
        categoria, 
        autor 
    };
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});


app.put('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, categoria, autor } = req.body;

    const livro = livros.find(p => p.id === id);

    if (livro) {
        if (nome) livro.nome = nome;
        if (categoria) livro.categoria = categoria;
        if (autor) livro.autor = autor;
        res.json(livro);
    } else {
        res.status(404).json({ error: 'Livro não encontrado' });
    }
});

app.delete('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = livros.findIndex(p => p.id === id);

    if (index !== -1) {
        const deletado = livros.splice(index, 1);
        res.json(deletado);
    } else {
        res.status(404).json({ error: 'Livro não encontrado' });
    }
});


app.listen(port, () => {
  console.log(`servidor em execução: http://localhost:${port}`);
});