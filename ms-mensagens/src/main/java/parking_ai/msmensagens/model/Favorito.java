package parking_ai.msmensagens.model;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * Classe Model (ORM) de Enderecos Favoritos com seus atributos (POJO)
 * @Column mapeia o atributo Java para uma coluna no BD
 */
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
@Entity
public class Favorito implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_favorito")
    private Long idFavorito;

    @Column(name = "cpf_usuario")
    private String cpfUsuario;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "complemento")
    private String complemento;

    /*
     * Campos personalizados para uso da API do Google de Mapas
     */
    @Column(name = "id_google")
    private String idGoogle;

    @Column(name = "description")
    private String description;

    @Column(name = "latitude")
    private double latitude;

    @Column(name = "longitude")
    private double longitude;
}