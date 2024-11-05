package parking_ai.msusuario.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class RecSenhaDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String login;
}