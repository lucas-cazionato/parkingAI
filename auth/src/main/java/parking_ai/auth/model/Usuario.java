package parking_ai.auth.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;
    
    private String id;
    private String cpf;
    private String login;
    private String senha;
    private String salt;
    
}