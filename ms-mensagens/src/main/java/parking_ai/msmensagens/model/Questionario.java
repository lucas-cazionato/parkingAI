package parking_ai.msmensagens.model;

import java.io.Serializable;
import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import parking_ai.msmensagens.enums.AchouVagaEnum;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
@Entity
public class Questionario implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_questionario")
    private Long idQuestionario;

    @Column(name = "cpf_usuario")
    private String cpfUsuario;

    @Column (name = "achou_vaga")
    private AchouVagaEnum achouVaga;

    @Min(1)
    @Max(5)
    @Column (name = "nota_geral")
    private Integer notaGeral;

    @Column (name = "comentario")
    private String comentario;

    @CreatedDate
    @Column (name = "data_registro")
    private Instant dataRegistro;
}