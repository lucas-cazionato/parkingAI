package parking_ai.msusuario.exception;

public class SenhaIncorretaException extends RuntimeException {
  public SenhaIncorretaException(String mensagem) {
      super(mensagem);
  }
}