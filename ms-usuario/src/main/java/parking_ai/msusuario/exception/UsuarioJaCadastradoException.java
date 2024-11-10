package parking_ai.msusuario.exception;

/*
 * Classe de exception para Usuario ja cadastrado
 */
public class UsuarioJaCadastradoException extends RuntimeException {
  public UsuarioJaCadastradoException(String mensagem) {
      super(mensagem);
  }
}