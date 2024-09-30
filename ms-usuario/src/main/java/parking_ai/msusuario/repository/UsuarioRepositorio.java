package parking_ai.msusuario.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import parking_ai.msusuario.model.Usuario;
import java.util.Optional;


public interface UsuarioRepositorio extends MongoRepository<Usuario, String> {

    Optional<Usuario> findById(String id);

    Optional<Usuario> findByCpf(String cpf);

    Optional<Usuario> findByLogin(String login);

    void deleteByCpf(String cpf);

    void deleteByLogin(String login);
}