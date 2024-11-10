package parking_ai.msmensagens.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * Classe DTO (Data Transfer Object) de Enderecos Favoritos com seus atributos (POJO)
 */
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class FavoritoDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long idFavorito;

    private String cpfUsuario;

    private String descricao;

    private Integer numero;

    private String complemento;

    /*
     * Campos personalizados para uso da API do Google de Mapas
     */
    private String idGoogle;

    private String description;

    private Location location;
}