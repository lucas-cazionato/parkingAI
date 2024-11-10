package parking_ai.msusuario.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

import org.springframework.stereotype.Service;
/*
 * Declaracao de classe Service de Senha
 */
@Service
public class SenhaService {

    private static final String CARACTERES = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:',.<>?/`~";

    // Metodo para geracao de Salt
    public String gerarSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    // Metodo para geracao de Senha Hash
    public String gerarSenhaHash(String senha, String salt) throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        String saltedSenha = senha + salt;
        byte[] hash = digest.digest(saltedSenha.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(hash);
    }

    // Metodo para geracao de Senha Aleatoria
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