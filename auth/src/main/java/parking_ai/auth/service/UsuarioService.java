package parking_ai.auth.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import parking_ai.auth.dto.UsuarioDTO;
import parking_ai.auth.exception.SenhaIncorretaException;
import parking_ai.auth.exception.SenhaVaziaException;
import parking_ai.auth.exception.UsuarioJaCadastradoException;
import parking_ai.auth.exception.UsuarioNaoEncontradoException;
import parking_ai.auth.model.Usuario;
import parking_ai.auth.repository.UsuarioRepositorio;

@Service
public class UsuarioService {

    @Autowired
    private SenhaService senhaService;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public Usuario criarUsuario(Usuario usuario) {
        if (usuarioRepositorio.findByCpf(usuario.getCpf()).isPresent()) {
            throw new UsuarioJaCadastradoException("Usuario ja esta cadastrado no banco");
        }
        if (usuario.getSenha() == null || usuario.getSenha().isEmpty()) {
            throw new SenhaVaziaException("Campo de senha nulo/vazio");
        }
        try {
            String salt = senhaService.gerarSalt();
            String senhaHash = senhaService.gerarSenhaHash(usuario.getSenha(), salt);
            usuario.setSenha(senhaHash);
            usuario.setSalt(salt);
            return usuarioRepositorio.save(usuario);
        } catch(Exception e) {
            throw new RuntimeException("Erro ao criar o usuario", e);
        }
    }

    public List<Usuario> listarTodosUsuarios() {
        return usuarioRepositorio.findAll();
    }

    public Usuario listarUsuarioPorId(String id) {
        return usuarioRepositorio.findById(id).orElseThrow(() -> new UsuarioNaoEncontradoException("Usuario com este ID nao encontrado"));
    }

    public Usuario listarUsuarioPorCpf(String cpf) {
        return usuarioRepositorio.findByCpf(cpf).orElseThrow(() -> new UsuarioNaoEncontradoException("Usuario com este CPF nao encontrado"));
    }

    public Usuario listarUsuarioPorLogin(String login) {
        return usuarioRepositorio.findByLogin(login).orElseThrow(() -> new UsuarioNaoEncontradoException("Usuario com este LOGIN nao encontrado"));
    }

    public Usuario atualizarUsuario(Usuario usuario) {
        Usuario u = listarUsuarioPorCpf(usuario.getCpf());
        try {
            u.setLogin(usuario.getLogin());
            if (usuario.getSenha() != null && !usuario.getSenha().isEmpty()) {
                u.setSenha(usuario.getSenha());
                u.setSalt(senhaService.gerarSalt());
                String senhaHash = senhaService.gerarSenhaHash(u.getSenha(), u.getSalt());
                u.setSenha(senhaHash);
            }
            return usuarioRepositorio.save(u);
        } catch(Exception e) {
            throw new RuntimeException("Erro ao atualizar o usuario", e);
        }
    }

    public void excluirUsuarioPorId(String id) {
        Usuario usuario = listarUsuarioPorId(id);
        usuarioRepositorio.deleteById(id);
    }

    public void excluirUsuarioPorCpf(String cpf) {
        Usuario usuario = listarUsuarioPorCpf(cpf);
        usuarioRepositorio.deleteByCpf(cpf);
    }

    public void excluirUsuarioPorLogin(String login) {
        Usuario usuario = listarUsuarioPorLogin(login);
        usuarioRepositorio.deleteByLogin(login);
    }

    public Usuario autenticarUsuario(Usuario usuario) {
        Usuario u = listarUsuarioPorLogin(usuario.getLogin());
        try {
            String senhaHash = senhaService.gerarSenhaHash(usuario.getSenha(), u.getSalt());
            if(u.getSenha().equals(senhaHash)) {
                return u;
            }
            else {
                throw new SenhaIncorretaException("Senha incorreta");
            }
        } catch(Exception e) {
            throw new RuntimeException("Erro ao autenticar o usuario", e);
        }
    }

    public Usuario converterDtoModel(UsuarioDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioDTO.getId());
        usuario.setCpf(usuarioDTO.getCpf());
        usuario.setLogin(usuarioDTO.getLogin());
        usuario.setSenha(usuarioDTO.getSenha());
        return usuario;
    }

    public UsuarioDTO converterModelDto(Usuario usuario) {
        UsuarioDTO usuarioDTO = new UsuarioDTO();
        usuarioDTO.setId(usuario.getId());
        usuarioDTO.setCpf(usuario.getCpf());
        usuarioDTO.setLogin(usuario.getLogin());
        return usuarioDTO;
    }
    
}