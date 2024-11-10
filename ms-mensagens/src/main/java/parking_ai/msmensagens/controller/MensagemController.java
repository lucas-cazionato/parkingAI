package parking_ai.msmensagens.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import parking_ai.msmensagens.dto.QuestionarioDTO;
import parking_ai.msmensagens.exception.AvaliacaoInvalidaException;
import parking_ai.msmensagens.exception.AvaliacaoNaoEncontradaException;
import parking_ai.msmensagens.model.Questionario;
import parking_ai.msmensagens.service.MensagemService;

/*
 * Classe Controller do MS-MENSAGENS
 * API REST com os metodos HTTP disponiveis
 */
@CrossOrigin
@RestController
@RequestMapping("/quest") // Endpoint para todos os metodos da API
public class MensagemController {
    // Declaracao do logger - interface de biblioteca de logging
    private static final Logger logger = LoggerFactory.getLogger(MensagemController.class);

    @Autowired
    private MensagemService mensagemService;

    // Metodo POST no endpoint /quest para registrar Questionario/Avaliacao
    @PostMapping
    public ResponseEntity<QuestionarioDTO> registrarAvaliacao(@RequestBody QuestionarioDTO questDTO) {
        try {
            Questionario questCriado = mensagemService.registrarQuestionario(mensagemService.converterDtoModel(questDTO));
            QuestionarioDTO q = mensagemService.converterModelDto(questCriado);
            return new ResponseEntity<>(q, HttpStatus.CREATED);
        } catch(AvaliacaoInvalidaException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo GET no endpoint /quest para listar todos Questionarios/Avaliacoes
    @GetMapping
    public ResponseEntity<List<QuestionarioDTO>> listarTodasAvaliacoes() {
        try {
            List<QuestionarioDTO> questDTOs = mensagemService
                .listarTodosQuestionarios()
                .stream()
                .map(mensagemService::converterModelDto)
                .collect(Collectors.toList());
            
            return new ResponseEntity<>(questDTOs, HttpStatus.OK);
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo GET no endpoint /quest/id/{id} para listar Questionario/Avaliacao por ID
    @GetMapping("/id/{id}")
    public ResponseEntity<QuestionarioDTO> buscarAvaliacaoPorId(@PathVariable("id") Long idQuest) {
        try {
            QuestionarioDTO questDTO = mensagemService.converterModelDto(mensagemService.listarQuestionarioPorId(idQuest));
            return new ResponseEntity<>(questDTO, HttpStatus.OK);
        } catch(AvaliacaoNaoEncontradaException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo GET no endpoint /quest/cpf/{cpf} para listar Questionario/Avaliacao por CPF do Usuario
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<List<QuestionarioDTO>> buscarAvaliacaoPorCpf(@PathVariable("cpf") String cpfUsuario) {
        try {
            List<QuestionarioDTO> questDTOs = mensagemService
                .listarQuestionarioPorCpf(cpfUsuario)
                .stream()
                .map(mensagemService::converterModelDto)
                .collect(Collectors.toList());
            
            return new ResponseEntity<>(questDTOs, HttpStatus.OK);
        } catch(AvaliacaoNaoEncontradaException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Metodo PUT no endpoint /quest/{id} para atualizar Questionario/Avaliacao por ID (do Questionario)
    @PutMapping("/{id}")
    public ResponseEntity<QuestionarioDTO> atualizarAvaliacao(@PathVariable("id") Long idQuest, @RequestBody QuestionarioDTO questDTO) {
        try {
            Questionario questAtualizado = mensagemService.atualizarQuestionario(idQuest, mensagemService.converterDtoModel(questDTO));
            QuestionarioDTO q = mensagemService.converterModelDto(questAtualizado);
            return new ResponseEntity<>(q, HttpStatus.OK);
        } catch(AvaliacaoInvalidaException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch(AvaliacaoNaoEncontradaException e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch(Exception e) {
            logger.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}