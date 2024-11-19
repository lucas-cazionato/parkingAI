package parking_ai.msusuario.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import parking_ai.msusuario.dto.UsuarioDTO;
import parking_ai.msusuario.exception.SenhaIncorretaException;
import parking_ai.msusuario.exception.SenhaVaziaException;
import parking_ai.msusuario.exception.UsuarioJaCadastradoException;
import parking_ai.msusuario.exception.UsuarioNaoEncontradoException;
import parking_ai.msusuario.model.Usuario;
import parking_ai.msusuario.repository.UsuarioRepositorio;

/*
 * Declaracao de classe Service de Usuario, com metodos disponiveis
 */
@Service
public class UsuarioService {

    @Autowired
    private SenhaService senhaService;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    // Declaracao de interface JavaMailSender
    // Fornece funcionalidades para enviar e-mails usando o protocolo SMTP
    @Autowired
    private JavaMailSender emailSender;

    // Definicao do template de e-mail a ser enviado com a recuperacao de senha
    // Definicao do remetente e assunto do e-mail
    private SimpleMailMessage gerarTemplateEmail() {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setFrom("naoresponda@parkingai.com");
        email.setSubject("PARKING AI - Recuperação de Senha");
        return email;
    }

    // Metodo para autenticar Usuario (conferir senha e login)
    public Usuario autenticarUsuario(Usuario usuario) throws Exception {
        Usuario u = listarUsuarioPorLogin(usuario.getLogin());
        String senhaHash = senhaService.gerarSenhaHash(usuario.getSenha(), u.getSalt());
        if (u.getSenha().equals(senhaHash)) {
            return u;
        } else {
            throw new SenhaIncorretaException("Senha incorreta");
        }
    }

    // Metodo para criar Usuario no banco de dados
    public Usuario criarUsuario(Usuario usuario) {
        /*
         * if (usuarioRepositorio.findByCpf(usuario.getCpf()).isPresent() ||
         * usuarioRepositorio.findByLogin(usuario.getLogin()).isPresent()) {
         * throw new
         * UsuarioJaCadastradoException("Usuario ja esta cadastrado no banco");
         * }
         */
        if (usuario.getSenha() == null || usuario.getSenha().isEmpty()) {
            throw new SenhaVaziaException("Campo de senha nulo/vazio");
        }
        try {
            String salt = senhaService.gerarSalt();
            String senhaHash = senhaService.gerarSenhaHash(usuario.getSenha(), salt);
            usuario.setSenha(senhaHash);
            usuario.setSalt(salt);
            return usuarioRepositorio.save(usuario);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao criar o usuario", e);
        }
    }

    // Metodo para listar todos os Usuarios
    public List<Usuario> listarTodosUsuarios() {
        return usuarioRepositorio.findAll();
    }

    // Metodo para listar Usuario por ID
    public Usuario listarUsuarioPorId(String id) {
        return usuarioRepositorio.findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuario com este ID nao encontrado"));
    }

    // Metodo para listar Usuario por CPF
    public Usuario listarUsuarioPorCpf(String cpf) {
        return usuarioRepositorio.findByCpf(cpf)
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuario com este CPF nao encontrado"));
    }

    // Metodo para listar Usuario por Login
    public Usuario listarUsuarioPorLogin(String login) {
        return usuarioRepositorio.findByLogin(login)
                .orElseThrow(() -> new UsuarioNaoEncontradoException("Usuario com este LOGIN nao encontrado"));
    }

    // Metodo para atualizar Usuario por CPF e fazer UPDATE no BD
    public Usuario atualizarUsuario(String cpf, Usuario usuario) {
        Usuario u = listarUsuarioPorCpf(cpf);
        try {
            u.setLogin(usuario.getLogin());
            u.setNome(usuario.getNome());
            u.setDataNascimento(usuario.getDataNascimento());
            u.setTelefone(usuario.getTelefone());
            if (usuario.getSenha() != null && !usuario.getSenha().isEmpty()) {
                u.setSenha(usuario.getSenha());
                u.setSalt(senhaService.gerarSalt());
                String senhaHash = senhaService.gerarSenhaHash(u.getSenha(), u.getSalt());
                u.setSenha(senhaHash);
            }
            return usuarioRepositorio.save(u);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar o usuario", e);
        }
    }

    // Metodo para Recuperar Senha, a partir da informacao do Login
    public Usuario recuperarSenha(String login) {
        Usuario u = listarUsuarioPorLogin(login);
        try {
            String senhaAleatoria = senhaService.gerarSenhaAleatoria();

            /* Envio do e-mail de recuperação de senha */
            SimpleMailMessage msg = gerarTemplateEmail();
            msg.setTo(u.getLogin());
            msg.setText("Prezado(a) Cliente,\n\n" +
                    "Solicitação de recuperação de senha recebida.\n\n" +
                    "Nova senha de acesso: " + senhaAleatoria + "\n\n" +
                    "Atualizar a senha imediatamente após o primeiro acesso.\n\n" +
                    "Atenciosamente,\n\n" +
                    "Equipe Parking AI");
            this.emailSender.send(msg);

            u.setSalt(senhaService.gerarSalt());
            String senhaHash = senhaService.gerarSenhaHash(senhaAleatoria, u.getSalt());
            u.setSenha(senhaHash);
            return usuarioRepositorio.save(u);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao recuperar senha", e);
        }
    }

    // Metodo para excluir Usuario por ID
    public void excluirUsuarioPorId(String id) {
        @SuppressWarnings("unused")
        Usuario usuario = listarUsuarioPorId(id);
        usuarioRepositorio.deleteById(id);
    }

    // Metodo para excluir Usuario por CPF
    public void excluirUsuarioPorCpf(String cpf) {
        @SuppressWarnings("unused")
        Usuario usuario = listarUsuarioPorCpf(cpf);
        usuarioRepositorio.deleteByCpf(cpf);
    }

    // Metodo para excluir Usuario por Login
    public void excluirUsuarioPorLogin(String login) {
        @SuppressWarnings("unused")
        Usuario usuario = listarUsuarioPorLogin(login);
        usuarioRepositorio.deleteByLogin(login);
    }

    // Metodo para converter de Usuario DTO para Usuario Model
    public Usuario converterDtoModel(UsuarioDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioDTO.getId());
        usuario.setCpf(usuarioDTO.getCpf());
        usuario.setLogin(usuarioDTO.getLogin());
        usuario.setNome(usuarioDTO.getNome());
        usuario.setDataNascimento(usuarioDTO.getDataNascimento());
        usuario.setTelefone(usuarioDTO.getTelefone());
        usuario.setSenha(usuarioDTO.getSenha());
        return usuario;
    }

    // Metodo para converter de Usuario Model para Usuario DTO
    public UsuarioDTO converterModelDto(Usuario usuario) {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setCpf(usuario.getCpf());
        usuarioDTO.setLogin(usuario.getLogin());
        usuarioDTO.setNome(usuario.getNome());
        usuarioDTO.setDataNascimento(usuario.getDataNascimento());
        usuarioDTO.setTelefone(usuario.getTelefone());
        return usuarioDTO;
    }

}