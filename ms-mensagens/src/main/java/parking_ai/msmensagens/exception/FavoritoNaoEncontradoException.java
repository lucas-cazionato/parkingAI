package parking_ai.msmensagens.exception;

/*
 * Classe de exception para endereço favorito não encontrado
 */
public class FavoritoNaoEncontradoException extends RuntimeException {
    public FavoritoNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}