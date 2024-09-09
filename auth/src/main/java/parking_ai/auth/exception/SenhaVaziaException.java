package parking_ai.auth.exception;

public class SenhaVaziaException extends RuntimeException {
  public SenhaVaziaException(String mensagem) {
      super(mensagem);
  }
}