package parking_ai.msusuario.exception;

/*
 * Classe de exception para senha incorreta
 */
public class SenhaIncorretaException extends RuntimeException {
  public SenhaIncorretaException(String mensagem) {
      super(mensagem);
  }
}