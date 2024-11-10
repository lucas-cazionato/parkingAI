package parking_ai.msusuario.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import parking_ai.msusuario.dto.UsuarioDTO;
import parking_ai.msusuario.dto.RecSenhaDTO;
import parking_ai.msusuario.exception.SenhaIncorretaException;
import parking_ai.msusuario.exception.SenhaVaziaException;
import parking_ai.msusuario.exception.UsuarioJaCadastradoException;
import parking_ai.msusuario.exception.UsuarioNaoEncontradoException;
import parking_ai.msusuario.model.Usuario;
import parking_ai.msusuario.service.UsuarioService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/*
 * Classe Controller do MS-USUARIO
 * API REST com os metodos HTTP disponiveis
 */
@CrossOrigin
@RestController
@RequestMapping("/auth") // Endpoint para todos os metodos da API
public class UsuarioController {
    // Declaracao do logger - interface de biblioteca de logging
    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    private UsuarioService usuarioService;

    // Metodo POST no endpoint /auth/login para autenticar Usuario (Login)
    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> autenticarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuario = usuarioService.autenticarUsuario(usuarioService.converterDtoModel(usuarioDTO));
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuario.getId());
            usuDTO.setCpf(usuario.getCpf());
            usuDTO.setLogin(usuario.getLogin());
            usuDTO.setNome(usuario.getNome());
            usuDTO.setDataNascimento(usuario.getDataNascimento());
            usuDTO.setTelefone(usuario.getTelefone());
            return new ResponseEntity<>(usuDTO, HttpStatus.OK);
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch(SenhaIncorretaException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo POST no endpoint /auth para criar Usuario
    @PostMapping
    public ResponseEntity<UsuarioDTO> cadastrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuarioCriado = usuarioService.criarUsuario(usuarioService.converterDtoModel(usuarioDTO));
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuarioCriado.getId());
            usuDTO.setCpf(usuarioCriado.getCpf());
            usuDTO.setLogin(usuarioCriado.getLogin());
            usuDTO.setNome(usuarioCriado.getNome());
            usuDTO.setDataNascimento(usuarioCriado.getDataNascimento());
            usuDTO.setTelefone(usuarioCriado.getTelefone());
            return new ResponseEntity<>(usuDTO, HttpStatus.CREATED);
        } catch(UsuarioJaCadastradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch(SenhaVaziaException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo GET no endpoint /auth/id/{id} para consultar Usuario por ID
    @GetMapping("/id/{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorId(@PathVariable("id") String id) {
        try {
            Usuario usuario = usuarioService.listarUsuarioPorId(id);
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuario.getId());
            usuDTO.setCpf(usuario.getCpf());
            usuDTO.setLogin(usuario.getLogin());
            usuDTO.setNome(usuario.getNome());
            usuDTO.setDataNascimento(usuario.getDataNascimento());
            usuDTO.setTelefone(usuario.getTelefone());
            return new ResponseEntity<>(usuDTO, HttpStatus.OK);
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo GET no endpoint /auth/login/{login} para consultar Usuario por Login
    @GetMapping("/login/{login}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorLogin(@PathVariable("login") String login) {
        try {
            Usuario usuario = usuarioService.listarUsuarioPorLogin(login);
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuario.getId());
            usuDTO.setCpf(usuario.getCpf());
            usuDTO.setLogin(usuario.getLogin());
            usuDTO.setNome(usuario.getNome());
            usuDTO.setDataNascimento(usuario.getDataNascimento());
            usuDTO.setTelefone(usuario.getTelefone());
            return new ResponseEntity<>(usuDTO, HttpStatus.OK);
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo GET no endpoint /auth/cpf/{cpf} para consultar Usuario por CPF
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorCpf(@PathVariable("cpf") String cpf) {
        try {
            Usuario usuario = usuarioService.listarUsuarioPorCpf(cpf);
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuario.getId());
            usuDTO.setCpf(usuario.getCpf());
            usuDTO.setLogin(usuario.getLogin());
            usuDTO.setNome(usuario.getNome());
            usuDTO.setDataNascimento(usuario.getDataNascimento());
            usuDTO.setTelefone(usuario.getTelefone());
            return new ResponseEntity<>(usuDTO, HttpStatus.OK);
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo PUT no endpoint /auth/{cpf} para atualizar Usuario por CPF
    @PutMapping("/{cpf}")
    public ResponseEntity<UsuarioDTO> atualizarUsuario(@PathVariable("cpf") String cpf, @RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuarioAtualizado = usuarioService.atualizarUsuario(cpf, usuarioService.converterDtoModel(usuarioDTO));
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuarioAtualizado.getId());
            usuDTO.setCpf(usuarioAtualizado.getCpf());
            usuDTO.setLogin(usuarioAtualizado.getLogin());
            usuDTO.setNome(usuarioAtualizado.getNome());
            usuDTO.setDataNascimento(usuarioAtualizado.getDataNascimento());
            usuDTO.setTelefone(usuarioAtualizado.getTelefone());
            return new ResponseEntity<>(usuDTO, HttpStatus.OK);
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo POST no endpoint /auth/recuperar para recuperar senha de Usuario atraves de e-mail
    @PostMapping("/recuperar")
    public ResponseEntity<Void> recuperarSenha(@RequestBody RecSenhaDTO recSenha) {
        try {
            usuarioService.recuperarSenha(recSenha.getLogin());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo DELETE no endpoint /auth/id/{id} para excluir Usuario por ID
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> deletarUsuarioPorId(@PathVariable("id") String id) {
        try {
            usuarioService.excluirUsuarioPorId(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo DELETE no endpoint /auth/login/{login} para excluir Usuario por Login
    @DeleteMapping("/login/{login}")
    public ResponseEntity<Void> deletarUsuarioPorLogin(@PathVariable("login") String login) {
        try {
            usuarioService.excluirUsuarioPorLogin(login);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo DELETE no endpoint /auth/cpf/{cpf} para excluir Usuario por CPF
    @DeleteMapping("/cpf/{cpf}")
    public ResponseEntity<Void> deletarUsuarioPorCpf(@PathVariable("cpf") String cpf) {
        try {
            usuarioService.excluirUsuarioPorCpf(cpf);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}