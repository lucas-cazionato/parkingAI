package parking_ai.msmensagens.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import parking_ai.msmensagens.model.Questionario;

public interface QuestionarioRepositorio extends JpaRepository<Questionario, Long> {

    Optional<Questionario> findByIdQuestionario(Long idQuestionario);

    Optional<Questionario> findByCpfUsuario(String cpfUsuario);

}