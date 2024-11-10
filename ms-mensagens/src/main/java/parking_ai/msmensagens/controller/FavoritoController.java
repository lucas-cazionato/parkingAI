package parking_ai.msmensagens.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import parking_ai.msmensagens.dto.FavoritoDTO;
import parking_ai.msmensagens.exception.FavoritoNaoEncontradoException;
import parking_ai.msmensagens.model.Favorito;
import parking_ai.msmensagens.service.FavoritoService;

/*
 * Classe Controller dos Endereços Favoritos
 * API REST com os metodos HTTP disponiveis
 */
@CrossOrigin
@RestController
@RequestMapping("/favoritos") // Endpoint para todos os metodos da API
public class FavoritoController {
    // Declaracao do logger - interface de biblioteca de logging
    private static final Logger logger = LoggerFactory.getLogger(MensagemController.class);

    @Autowired
    private FavoritoService favoritoService;

    // Metodo POST no endpoint /favoritos para salvar Endereço Favorito
    @PostMapping
    public ResponseEntity<FavoritoDTO> cadastrarFavorito(@RequestBody FavoritoDTO favoritoDTO) {
        try {
            Favorito favoritoCriado = favoritoService.criarFavorito(favoritoService.converterFavDtoModel(favoritoDTO));
            FavoritoDTO f = favoritoService.converterFavModelDto(favoritoCriado);
            return new ResponseEntity<>(f, HttpStatus.CREATED);
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo GET no endpoint /favoritos/id/{id} para consultar Endereço Favorito pelo seu ID
    @GetMapping("/id/{id}")
    public ResponseEntity<FavoritoDTO> buscarFavoritoPorId(@PathVariable("id") Long idFavorito) {
        try {
            FavoritoDTO favoritoDTO = favoritoService.converterFavModelDto(favoritoService.listarFavoritoPorId(idFavorito));
            return new ResponseEntity<>(favoritoDTO, HttpStatus.OK);
        } catch(FavoritoNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo GET no endpoint /favoritos/cpf/{cpf} para consultar Endereços Favoritos pelo CPF do Usuario
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<List<FavoritoDTO>> buscarFavoritoPorCpf(@PathVariable("cpf") String cpfUsuario) {
        try {
            List<FavoritoDTO> favoritos = favoritoService
            .listarFavoritoPorCpf(cpfUsuario)
            .stream()
            .map(favoritoService::converterFavModelDto)
            .collect(Collectors.toList());
        
        return new ResponseEntity<>(favoritos, HttpStatus.OK);
        } catch(FavoritoNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo GET no endpoint /favoritos/idGoogle/{idGoogle} para consultar Endereço Favorito pelo ID do Google
    @GetMapping("/idGoogle/{idGoogle}")
    public ResponseEntity<FavoritoDTO> buscarFavoritoPorIdGoogle(@PathVariable("idGoogle") String idGoogle) {
        try {
            FavoritoDTO favoritoDTO = favoritoService.converterFavModelDto(favoritoService.listarFavoritoPorIdGoogle(idGoogle));
            return new ResponseEntity<>(favoritoDTO, HttpStatus.OK);
        } catch(FavoritoNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo PUT no endpoint /favoritos/{id} para atualizar Endereço Favorito pelo seu ID
    @PutMapping("/{id}")
    public ResponseEntity<FavoritoDTO> atualizarFavorito(@PathVariable("id") Long idFavorito, @RequestBody FavoritoDTO favoritoDTO) {
        try {
            Favorito favoritoAtualizado = favoritoService.atualizarFavorito(idFavorito, favoritoService.converterFavDtoModel(favoritoDTO));
            FavoritoDTO f = favoritoService.converterFavModelDto(favoritoAtualizado);
            return new ResponseEntity<>(f, HttpStatus.OK);
        } catch(FavoritoNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo DELETE no endpoint /favoritos/id/{id} para excluir Endereço Favorito pelo seu ID
    @DeleteMapping("/id/{id}")
    public ResponseEntity<Void> excluirFavoritoPorId(@PathVariable("id") Long idFavorito) {
        try {
            favoritoService.excluirFavoritoPorId(idFavorito);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(FavoritoNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo DELETE no endpoint /favoritos/cpf/{cpf} para excluir Endereços Favoritos pelo CPF do Usuario
    @DeleteMapping("/cpf/{cpf}")
    public ResponseEntity<Void> excluirFavoritoPorCpf(@PathVariable("cpf") String cpfUsuario) {
        try {
            favoritoService.excluirFavoritoPorCpf(cpfUsuario);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(FavoritoNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo DELETE no endpoint /favoritos/idGoogle/{idGoogle} para excluir Endereço Favorito pelo ID Google
    @DeleteMapping("/idGoogle/{idGoogle}")
    public ResponseEntity<Void> excluirFavoritoPorIdGoogle(@PathVariable("idGoogle") String idGoogle) {
        try {
            favoritoService.excluirFavoritoPorIdGoogle(idGoogle);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(FavoritoNaoEncontradoException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}