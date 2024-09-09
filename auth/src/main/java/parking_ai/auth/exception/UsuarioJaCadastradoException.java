package parking_ai.auth.exception;

public class UsuarioJaCadastradoException extends RuntimeException {
  public UsuarioJaCadastradoException(String mensagem) {
      super(mensagem);
  }
}