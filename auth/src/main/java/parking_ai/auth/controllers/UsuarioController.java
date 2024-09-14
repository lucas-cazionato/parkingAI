package parking_ai.auth.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import parking_ai.auth.dto.UsuarioDTO;
import parking_ai.auth.exception.SenhaIncorretaException;
import parking_ai.auth.exception.SenhaVaziaException;
import parking_ai.auth.exception.UsuarioJaCadastradoException;
import parking_ai.auth.exception.UsuarioNaoEncontradoException;
import parking_ai.auth.model.Usuario;
import parking_ai.auth.service.UsuarioService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class UsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<UsuarioDTO> autenticarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuario = usuarioService.autenticarUsuario(usuarioService.converterDtoModel(usuarioDTO));
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuario.getId());
            usuDTO.setCpf(usuario.getCpf());
            usuDTO.setLogin(usuario.getLogin());
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

    @PostMapping
    public ResponseEntity<UsuarioDTO> cadastrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuarioCriado = usuarioService.criarUsuario(usuarioService.converterDtoModel(usuarioDTO));
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuarioCriado.getId());
            usuDTO.setCpf(usuarioCriado.getCpf());
            usuDTO.setLogin(usuarioCriado.getLogin());
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

    @GetMapping("/id/{id}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorId(@PathVariable("id") String id) {
        try {
            Usuario usuario = usuarioService.listarUsuarioPorId(id);
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuario.getId());
            usuDTO.setCpf(usuario.getCpf());
            usuDTO.setLogin(usuario.getLogin());
            return new ResponseEntity<>(usuDTO, HttpStatus.OK);
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/login/{login}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorLogin(@PathVariable("login") String login) {
        try {
            Usuario usuario = usuarioService.listarUsuarioPorLogin(login);
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuario.getId());
            usuDTO.setCpf(usuario.getCpf());
            usuDTO.setLogin(usuario.getLogin());
            return new ResponseEntity<>(usuDTO, HttpStatus.OK);
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<UsuarioDTO> buscarUsuarioPorCpf(@PathVariable("cpf") String cpf) {
        try {
            Usuario usuario = usuarioService.listarUsuarioPorCpf(cpf);
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuario.getId());
            usuDTO.setCpf(usuario.getCpf());
            usuDTO.setLogin(usuario.getLogin());
            return new ResponseEntity<>(usuDTO, HttpStatus.OK);
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<UsuarioDTO> atualizarUsuario(@PathVariable("cpf") String cpf, @RequestBody UsuarioDTO usuarioDTO) {
        try {
            Usuario usuarioAtualizado = usuarioService.atualizarUsuario(cpf, usuarioService.converterDtoModel(usuarioDTO));
            UsuarioDTO usuDTO = new UsuarioDTO();
            usuDTO.setId(usuarioAtualizado.getId());
            usuDTO.setCpf(usuarioAtualizado.getCpf());
            usuDTO.setLogin(usuarioAtualizado.getLogin());
            return new ResponseEntity<>(usuDTO, HttpStatus.OK);
        } catch(UsuarioNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

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