package parking_ai.msusuario.exception;

/*
 * Classe de exception para senha vazia
 */
public class SenhaVaziaException extends RuntimeException {
  public SenhaVaziaException(String mensagem) {
      super(mensagem);
  }
}