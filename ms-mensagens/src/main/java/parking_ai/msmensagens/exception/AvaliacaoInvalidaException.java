package parking_ai.msmensagens.exception;

/*
 * Classe de exception para avaliacao invalida
 */
public class AvaliacaoInvalidaException extends RuntimeException {
    public AvaliacaoInvalidaException(String mensagem) {
        super(mensagem);
    }
}