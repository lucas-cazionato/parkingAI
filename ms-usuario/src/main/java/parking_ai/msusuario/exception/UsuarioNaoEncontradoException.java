package parking_ai.msusuario.exception;

/*
 * Classe de exception para Usuario nao encontrado
 */
public class UsuarioNaoEncontradoException extends RuntimeException {
    public UsuarioNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}