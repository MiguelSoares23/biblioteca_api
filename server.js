const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let livros = [
    { id: 1, nome: "Dom Casmurro", categoria: "Romance", autor: "Machado de Assis", ano: 1899},
    { id: 2, nome: "O Hobbit", categoria: "Fantasia", autor: "J.R.R. Tolkien", ano: 1937}
];

app.get('/livros', (req,  res) => {
    res.json(livros);
});


//rotas fixas
app.get('/livros/estatisticas', (req, res) => {
    if (livros.length === 0) {
        return res.status(404).json({ error: 'Nenhum livro cadastrado' });
    }

    const mediaCaracteres = livros.reduce((acc, l) => acc + l.nome.length, 0) / livros.length;

    res.json({
        total: livros.length,
        mediaCaracteresNome: mediaCaracteres.toFixed(2)
    });
});


app.get('/livros/filtro/:categoria', (req, res) => {
    const categoria = req.params.categoria.toLowerCase();
    const filtrados = livros.filter(l => l.categoria && l.categoria.toLowerCase() === categoria);
    res.json(filtrados);
});

app.get('/livros/quantidade', (req, res) => {
    res.json({ quantidade: livros.length });
});

app.get('/livros/primeiro', (req, res) => {
    if (livros.length > 0) {
        res.json(livros[0]);
    } else {
        res.status(404).json({ error: 'Nenhum livro cadastrado' });
    }
});

app.get('/livros/ultimo', (req, res) => {
    if (livros.length > 0) {
        res.json(livros[livros.length - 1]);
    } else {
        res.status(404).json({ error: 'Nenhum livro cadastrado' });
    }
});



app.post('/livros', (req, res) => {
    const { nome, categoria, autor, ano } = req.body;
    const novoLivro = { 
        id: livros.length + 1, 
        nome, 
        categoria, 
        autor,
        ano 
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


app.post('/livros/lote', (req, res) => {
    const novosLivros = req.body; 
    novosLivros.forEach(livro => {
        livro.id = livros.length + 1;
        livros.push(livro);
    });
    res.status(201).json(novosLivros);
});

//rota dinâmica
app.get('/livros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const livro = livros.find(p => p.id === id);

    if (livro) {
        res.json(livro);
    } else {
        res.status(404).send('Livro não encontrado!');
    }
});


/* post
{
  "nome": "As coisas que nunca superamos",
  "autor": "Lucy Score",
  "categoria": "Romance",
  "ano": 2023
}
*/

/* put
{
  "nome": "O Hobbit: Edição Especial",
  "categoria": "Fantasia",
  "autor": "J.R.R. Tolkien"
}
*/

/* lote
[
  { "nome": "O Pequeno Príncipe", "autor": "Saint-Exupéry", "categoria": "Infantil", "ano": 1943},
  { "nome": "Duna", "autor": "Frank Herbert", "categoria": "Ficcao", "ano": 1965}
]

*/


app.listen(port, () => {
  console.log(`servidor em execução: http://localhost:${port}`);
});