package parking_ai.msmensagens.dto;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import parking_ai.msmensagens.enums.AchouVagaEnum;

/*
 * Classe DTO (Data Transfer Object) de Questionario/Avaliacao com seus atributos (POJO)
 */
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class QuestionarioDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long idQuestionario;

    private String cpfUsuario;

    private AchouVagaEnum achouVaga;

    private Integer notaGeral;
    
    private String comentario;

    private LocalDateTime dataRegistro;

    private Location localizacao;
}