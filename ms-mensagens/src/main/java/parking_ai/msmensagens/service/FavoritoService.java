package parking_ai.msmensagens.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import parking_ai.msmensagens.dto.FavoritoDTO;
import parking_ai.msmensagens.dto.Location;
import parking_ai.msmensagens.exception.FavoritoNaoEncontradoException;
import parking_ai.msmensagens.model.Favorito;
import parking_ai.msmensagens.repository.FavoritoRepositorio;

/*
 * Declaracao de classe Service de Enderecos Favoritos, com metodos disponiveis
 */
@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepositorio favoRepo;

    // Metodo para registrar Endereco Favorito no banco de dados
    public Favorito criarFavorito(Favorito favorito) {
        try {
            return favoRepo.save(favorito);
        } catch(Exception e) {
            throw new RuntimeException("Erro ao salvar o endereço como favorito", e);
        }
    }

    // Metodo para listar todos os Endereços Favoritos do banco de dados
    public List<Favorito> listarTodosFavoritos() {
        return favoRepo.findAll();
    }

    // Metodo para listar Endereço Favorito pelo seu ID
    public Favorito listarFavoritoPorId(Long idFavorito) {
        return favoRepo.findByIdFavorito(idFavorito).orElseThrow(() -> new FavoritoNaoEncontradoException("Favorito com este ID nao encontrado"));
    }

    // Metodo para listar Endereços Favoritos pelo CPF do Usuario
    public List<Favorito> listarFavoritoPorCpf(String cpfUsuario) {
        List<Favorito> favoritos = favoRepo.findAllByCpfUsuario(cpfUsuario);
        if (favoritos.isEmpty()) {
            throw new FavoritoNaoEncontradoException("Favorito com este CPF nao encontrado");
        }
        return favoritos;
    }

    // Metodo para listar Endereço Favorito pelo Place ID do Google
    public Favorito listarFavoritoPorIdGoogle(String idGoogle) {
        return favoRepo.findByIdGoogle(idGoogle).orElseThrow(() -> new FavoritoNaoEncontradoException("Favorito com este ID Google nao encontrado"));
    }

    // Metodo para excluir Endereço Favorito pelo seu ID
    @Transactional
    public void excluirFavoritoPorId(Long idFavorito) {
        @SuppressWarnings("unused")
        Favorito f = listarFavoritoPorId(idFavorito);
        favoRepo.deleteByIdFavorito(idFavorito);
    }

    // Metodo para excluir Endereços Favoritos pelo CPF do Usuario
    @Transactional
    public void excluirFavoritoPorCpf(String cpfUsuario) {
        @SuppressWarnings("unused")
        List<Favorito> favoritos = listarFavoritoPorCpf(cpfUsuario);
        favoRepo.deleteAllByCpfUsuario(cpfUsuario);
    }

    // Metodo para excluir Endereço Favorito pelo ID do Google
    @Transactional
    public void excluirFavoritoPorIdGoogle(String idGoogle) {
        @SuppressWarnings("unused")
        Favorito f = listarFavoritoPorIdGoogle(idGoogle);
        favoRepo.deleteByIdGoogle(idGoogle);
    }

    // Metodo para atualizar Endereço Favorito pelo seu ID e fazer UPDATE no BD
    public Favorito atualizarFavorito(Long idFavorito, Favorito favorito) {
        Favorito f = listarFavoritoPorId(idFavorito);
        try {
            f.setDescricao(favorito.getDescricao());
            f.setNumero(favorito.getNumero());
            f.setComplemento(favorito.getComplemento());
            f.setIdGoogle(favorito.getIdGoogle());
            f.setDescription(favorito.getDescription());
            f.setLatitude(favorito.getLatitude());
            f.setLongitude(favorito.getLongitude());
            return favoRepo.save(f);
        } catch(Exception e) {
            throw new RuntimeException("Erro ao atualizar o endereço favorito", e);
        }
    }

    // Metodo para converter de Favorito DTO para Favorito Model
    public Favorito converterFavDtoModel(FavoritoDTO favoritoDTO) {
        Favorito f = new Favorito();
        f.setIdFavorito(favoritoDTO.getIdFavorito());
        f.setCpfUsuario(favoritoDTO.getCpfUsuario());
        f.setDescricao(favoritoDTO.getDescricao());
        f.setNumero(favoritoDTO.getNumero());
        f.setComplemento(favoritoDTO.getComplemento());
        f.setIdGoogle(favoritoDTO.getIdGoogle());
        f.setDescription(favoritoDTO.getDescription());
        f.setLatitude(favoritoDTO.getLocation().getLat());
        f.setLongitude(favoritoDTO.getLocation().getLng());
        return f;
    }

    // Metodo para converter de Favorito Model para Favorito DTO
    public FavoritoDTO converterFavModelDto(Favorito favorito) {
        FavoritoDTO f = new FavoritoDTO();
        f.setIdFavorito(favorito.getIdFavorito());
        f.setCpfUsuario(favorito.getCpfUsuario());
        f.setDescricao(favorito.getDescricao());
        f.setNumero(favorito.getNumero());
        f.setComplemento(favorito.getComplemento());
        f.setIdGoogle(favorito.getIdGoogle());
        f.setDescription(favorito.getDescription());
        f.setLocation(new Location(favorito.getLatitude(), favorito.getLongitude()));
        return f;
    }

}