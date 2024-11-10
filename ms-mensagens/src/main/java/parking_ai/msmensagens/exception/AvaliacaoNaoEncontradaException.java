package parking_ai.msmensagens.exception;

/*
 * Classe de exception para avaliacao nao encontrada
 */
public class AvaliacaoNaoEncontradaException extends RuntimeException {
    public AvaliacaoNaoEncontradaException(String mensagem) {
        super(mensagem);
    }
}