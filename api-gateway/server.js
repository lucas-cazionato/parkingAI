// Importação de bibliotecas e declaração de constantes necessárias
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const httpProxy = require('express-http-proxy');
const jwt = require('jsonwebtoken');
const logger = require('morgan');
const { emitWarning } = require('process');
require("dotenv-safe").config();

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Cookie parser
app.use(cookieParser());

// Middleware CORS
app.use(cors());

// Middleware de segurança
app.use(helmet());

// Logger para desenvolvimento
app.use(logger('dev'));

// Função para autenticação no aplicativo
const authServiceProxy = httpProxy('http://localhost:3001', {
    proxyReqBodyDecorator: function(bodyContent, srcReq) {
        try {
            retBody = {};
            retBody.login = bodyContent.login;
            retBody.senha = bodyContent.senha;
            bodyContent = retBody;
        }
        catch(e) {
            console.log('- ERRO: ' + e);
        }
        return bodyContent;
    },
    proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        proxyReqOpts.headers['Content-Type'] = 'application/json';
        proxyReqOpts.method = 'POST';
        return proxyReqOpts;
    },
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        if (proxyRes.statusCode == 200) {
            var str = Buffer.from(proxyResData).toString('utf-8');
            var objBody = JSON.parse(str);
            const id = objBody.id;
            const cpf = objBody.cpf;
            const login = objBody.login;
            const token = jwt.sign({ id, cpf, login }, process.env.SECRET, {
                expiresIn: 10000000000000000000
            });
            userRes.status(200);
            userRes.setHeader('Content-Type', 'application/json');
            return JSON.stringify({ auth: true, token: token, data: objBody });
        } else {
            userRes.status(401);
            userRes.setHeader('Content-Type', 'application/json');
            return JSON.stringify({ message: 'Login/Senha inválidos!' });
        }
    }
});

// Função para validação do Token JWT
function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token recebido:', token);

    if (!token) {
        return res.status(401).json({ auth: false, message: 'Token não fornecido.' });
    }

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (err) {
            console.error('Erro ao verificar token:', err);
            return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });
        }
        
        req.id = decoded.id;
        req.cpf = decoded.cpf;
        req.login = decoded.login;
        console.log('Usuário autenticado:', req.id, req.cpf, req.login);
        next();
    });
}

// 0 - Endpoints para Login e Logout (Autenticação)
// 0.1 - Endpoint para Login
app.post('/auth/login', (req, res, next) => {
    authServiceProxy(req, res, next);
});
// 0.2 - Endpoint para Logout
app.post('/logout', function (req, res) {
    res.json({ auth: false, token: null });
});

// 1 - Endpoints para ms-usuario (CRUD Usuario)
const usuarioServiceProxy = httpProxy('http://localhost:3001');
// 1.1 - Endpoint para cadastrar Usuário
app.post('/auth', (req, res, next) => {
    usuarioServiceProxy(req, res, next);
});
// 1.2 - Endpoint para recuperar Senha
app.post('/auth/recuperar', (req, res, next) => {
    usuarioServiceProxy(req, res, next);
});
// 1.3 - Endpoint para buscar Usuário por ID
app.get('/auth/id/:id', verifyJWT, (req, res, next) => {
    usuarioServiceProxy(req, res, next);
});
// 1.4 - Endpoint para buscar Usuário por Login
app.get('/auth/login/:login', verifyJWT, (req, res, next) => {
    usuarioServiceProxy(req, res, next);
});
// 1.5 - Endpoint para buscar Usuário por CPF
app.get('/auth/cpf/:cpf', verifyJWT, (req, res, next) => {
    usuarioServiceProxy(req, res, next);
});
// 1.6 - Endpoint para atualizar Usuário por CPF
app.put('/auth/:cpf', verifyJWT, (req, res, next) => {
    usuarioServiceProxy(req, res, next);
});
// 1.7 - Endpoint para deletar Usuário por ID
app.delete('/auth/id/:id', verifyJWT, (req, res, next) => {
    usuarioServiceProxy(req, res, next);
});
// 1.8 - Endpoint para deletar Usuário por Login
app.delete('/auth/login/:login', verifyJWT, (req, res, next) => {
    usuarioServiceProxy(req, res, next);
});
// 1.9 - Endpoint para deletar Usuário por CPF
app.delete('/auth/cpf/:cpf', verifyJWT, (req, res, next) => {
    usuarioServiceProxy(req, res, next);
});

// 2 - Endpoints para ms-mensagens (CRUD Avaliação)
const mensagemServiceProxy = httpProxy('http://localhost:3002');

// 2.1 - Endpoint para registrar Avaliação
app.post('/quest', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 2.2 - Endpoint para listar todas Avaliações
app.get('/quest', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 2.3 - Endpoint para buscar Avaliação por ID (da avaliação)
app.get('/quest/id/:id', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 2.4 - Endpoint para buscar Avaliação por CPF
app.get('/quest/cpf/:cpf', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 2.5 - Endpoint para atualizar Avaliação por ID (da avaliação)
app.put('/quest/:id', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});

// 3 - Endpoints para ms-mensagens (CRUD Favoritos)
// 3.1 - Endpoint para cadastrar Endereço Favorito
app.post('/favoritos', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 3.2 - Endpoint para listar Endereço Favorito pelo seu ID
app.get('/favoritos/id/:id', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 3.3 - Endpoint para listar Endereços Favoritos pelo CPF do Usuario
app.get('/favoritos/cpf/:cpf', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 3.4 - Endpoint para listar Endereço Favorito pelo ID Google
app.get('/favoritos/idGoogle/:idGoogle', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 3.5 - Endpoint para atualizar Endereço Favorito pelo seu ID
app.put('/favoritos/:id', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 3.6 - Endpoint para excluir Endereço Favorito pelo seu ID
app.delete('/favoritos/id/:id', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 3.7 - Endpoint para excluir Endereços Favoritos pelo CPF do Usuario
app.delete('/favoritos/cpf/:cpf', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});
// 3.8 - Endpoint para excluir Endereço Favorito pelo ID Google
app.delete('/favoritos/idGoogle/:idGoogle', verifyJWT, (req, res, next) => {
    mensagemServiceProxy(req, res, next);
});

// Cria o servidor na porta 3000
const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});