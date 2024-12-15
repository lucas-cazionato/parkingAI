package parking_ai.msmensagens.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parking_ai.msmensagens.dto.Location;
import parking_ai.msmensagens.dto.QuestionarioDTO;
import parking_ai.msmensagens.enums.AchouVagaEnum;
import parking_ai.msmensagens.exception.AvaliacaoInvalidaException;
import parking_ai.msmensagens.exception.AvaliacaoNaoEncontradaException;
import parking_ai.msmensagens.model.Questionario;
import parking_ai.msmensagens.repository.QuestionarioRepositorio;

/*
 * Declaracao de classe Service de Questionario/Avaliacao, com metodos disponiveis
 */
@Service
public class MensagemService {

    @Autowired
    private QuestionarioRepositorio questRepo;

    // Metodo para registrar Questionario/Avaliacao no banco de dados
    public Questionario registrarQuestionario(Questionario quest) {
        if ((quest.getAchouVaga()!=AchouVagaEnum.SIM && quest.getAchouVaga()!=AchouVagaEnum.NÃO)
        || (quest.getNotaGeral()!=null && (!(quest.getNotaGeral() instanceof Integer) || quest.getNotaGeral()<1 || quest.getNotaGeral()>5))) {
            throw new AvaliacaoInvalidaException("Questionario com dados e/ou formato invalidos.");
        }
        try {
            return questRepo.save(quest);
        } catch(Exception e) {
            throw new RuntimeException("Erro ao registrar a avaliacao", e);
        }
    }

    // Metodo para listar todos os Questionarios/Avaliacoes do banco de dados
    public List<Questionario> listarTodosQuestionarios() {
        return questRepo.findAll();
    }

    // Metodo para listar Questionario/Avaliacao por ID (do Questionario)
    public Questionario listarQuestionarioPorId(Long idQuestionario) {
        return questRepo.findByIdQuestionario(idQuestionario).orElseThrow(() -> new AvaliacaoNaoEncontradaException("Avaliacao com este ID nao encontrada"));
    }

    // Metodo para listar Questionario/Avaliacao por CPF do Usuario
    public List<Questionario> listarQuestionarioPorCpf(String cpfUsuario) {
        List<Questionario> questionarios = questRepo.findAllByCpfUsuario(cpfUsuario);
        if (questionarios.isEmpty()) {
            throw new AvaliacaoNaoEncontradaException("Avaliacao com este CPF de usuario nao encontrada");
        }
        return questionarios;
    }

    // Metodo para atualizar Questionario por ID (do Questionario) e fazer UPDATE no BD
    public Questionario atualizarQuestionario(Long idQuestionario, Questionario quest) {
        Questionario q = listarQuestionarioPorId(idQuestionario);
        try {
            q.setAchouVaga(quest.getAchouVaga());
            q.setNotaGeral(quest.getNotaGeral());
            q.setComentario(quest.getComentario());
            q.setLatitude(quest.getLatitude());
            q.setLongitude(quest.getLongitude());
            if ((q.getAchouVaga()!=AchouVagaEnum.SIM && q.getAchouVaga()!=AchouVagaEnum.NÃO)
            || (q.getNotaGeral()!=null && (!(q.getNotaGeral() instanceof Integer) || q.getNotaGeral()<1 || q.getNotaGeral()>5))) {
                throw new AvaliacaoInvalidaException("Questionario com dados e/ou formato invalidos.");
            }
            return questRepo.save(q);
        } catch(Exception e) {
            throw new RuntimeException("Erro ao atualizar a avaliacao", e);
        }
    }

    // Metodo para converter de Questionario DTO para Questionario Model
    public Questionario converterDtoModel(QuestionarioDTO questDTO) {
        Questionario quest = new Questionario();
        quest.setIdQuestionario(questDTO.getIdQuestionario());
        quest.setCpfUsuario(questDTO.getCpfUsuario());
        quest.setAchouVaga(questDTO.getAchouVaga());
        quest.setNotaGeral(questDTO.getNotaGeral());
        quest.setComentario(questDTO.getComentario());
        quest.setDataRegistro(questDTO.getDataRegistro());

        // Verifica se localizacao é null antes de acessar seus atributos
        if (questDTO.getLocalizacao() != null) {
            quest.setLatitude(questDTO.getLocalizacao().getLat());
            quest.setLongitude(questDTO.getLocalizacao().getLng());
        } else {
            quest.setLatitude(-99999); 
            quest.setLongitude(-99999);
        }
        return quest;
    }

    // Metodo para converter de Questionario Model para Questionario DTO
    public QuestionarioDTO converterModelDto(Questionario quest) {
        QuestionarioDTO questDTO = new QuestionarioDTO();
        questDTO.setIdQuestionario(quest.getIdQuestionario());
        questDTO.setCpfUsuario(quest.getCpfUsuario());
        questDTO.setAchouVaga(quest.getAchouVaga());
        questDTO.setNotaGeral(quest.getNotaGeral());
        questDTO.setComentario(quest.getComentario());
        questDTO.setDataRegistro(quest.getDataRegistro());
        questDTO.setLocalizacao(new Location(quest.getLatitude(), quest.getLongitude()));
        return questDTO;
    }

}