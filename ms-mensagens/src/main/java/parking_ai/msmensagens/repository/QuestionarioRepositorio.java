package parking_ai.msmensagens.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import parking_ai.msmensagens.model.Questionario;

/*
 * Declaracao de interface de repositorio que extende de JpaRepository
 * Serve para facilitar operacoes com o banco de dados relacional
 * Oferece metodos prontos/padrao para operacoes com BD
 */
public interface QuestionarioRepositorio extends JpaRepository<Questionario, Long> {

    Optional<Questionario> findByIdQuestionario(Long idQuestionario);

    List<Questionario> findAllByCpfUsuario(String cpfUsuario);

}