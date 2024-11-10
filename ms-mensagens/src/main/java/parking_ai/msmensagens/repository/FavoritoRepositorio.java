package parking_ai.msmensagens.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import parking_ai.msmensagens.model.Favorito;

/*
 * Declaracao de interface de repositorio que extende de JpaRepository
 * Serve para facilitar operacoes com o banco de dados relacional
 * Oferece metodos prontos/padrao para operacoes com BD
 */
public interface FavoritoRepositorio extends JpaRepository<Favorito, Long> {

    Optional<Favorito> findByIdFavorito(Long idFavorito);

    List<Favorito> findAllByCpfUsuario(String cpfUsuario);

    Optional<Favorito> findByIdGoogle(String idGoogle);

    void deleteByIdFavorito(Long idFavorito);

    void deleteAllByCpfUsuario(String cpfUsuario);

    void deleteByIdGoogle(String idGoogle);
    
}