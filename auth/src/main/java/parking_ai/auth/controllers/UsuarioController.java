package parking_ai.auth.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import parking_ai.auth.dto.UsuarioDTO;
import parking_ai.auth.exception.SenhaVaziaException;
import parking_ai.auth.exception.UsuarioJaCadastradoException;
import parking_ai.auth.model.Usuario;
import parking_ai.auth.service.UsuarioService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
@RestController
@RequestMapping("/auth")
public class UsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    @Autowired
    private UsuarioService usuarioService;

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
       
}