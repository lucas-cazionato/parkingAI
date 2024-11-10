package parking_ai.msusuario.dto;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * Classe DTO (Data Transfer Object) de Usuario com seus atributos (POJO)
 */
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class UsuarioDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;
    private String cpf;
    private String login;
    private String nome;
    private LocalDate dataNascimento;
    private String telefone;
    private String senha;    
}