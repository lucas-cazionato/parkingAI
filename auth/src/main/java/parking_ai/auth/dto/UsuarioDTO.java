package parking_ai.auth.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class UsuarioDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String id;
    private String cpf;
    private String login;
    private String senha;
    
}