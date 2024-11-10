package parking_ai.msusuario.model;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*
 * Classe Model (ORM) de Usuario com seus atributos (POJO)
 */
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private String id;
    private String cpf;
    private String login;
    private String nome;
    private LocalDate dataNascimento;
    private String telefone;
    private String senha;
    private String salt;
    
}