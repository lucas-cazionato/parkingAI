package parking_ai.msusuario.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.stereotype.Service;

@Service
public class SenhaService {

    private static final String CARACTERES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>?/`~";

    public String gerarSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    public String gerarSenhaHash(String senha, String salt) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        String saltedSenha = senha + salt;
        byte[] hash = digest.digest(saltedSenha.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hash);
    }

    public String gerarSenhaAleatoria() {
        SecureRandom secureRandom = new SecureRandom();
        StringBuilder senhaAleatoria = new StringBuilder(10);
        for (int i = 0; i < 16; i++) {
            int index = secureRandom.nextInt(CARACTERES.length());
            senhaAleatoria.append(CARACTERES.charAt(index));
        }
        return senhaAleatoria.toString();
    }
}