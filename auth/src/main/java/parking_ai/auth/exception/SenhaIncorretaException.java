package parking_ai.auth.exception;

public class SenhaIncorretaException extends RuntimeException {
  public SenhaIncorretaException(String mensagem) {
      super(mensagem);
  }
}