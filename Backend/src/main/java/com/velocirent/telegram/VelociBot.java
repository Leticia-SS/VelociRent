package com.velocirent.telegram;

import com.velocirent.model.Bikes;
import com.velocirent.model.Users;
import com.velocirent.repository.BikesRepository;
import com.velocirent.repository.BookingRepository;
import com.velocirent.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.*;

@Component
public class VelociBot extends TelegramLongPollingBot {

    private Map<Long, String> estadosUsuarios = new HashMap<>();
    private Map<Long, String> perfisUsuarios = new HashMap<>();
    private Map<Long, Integer> matriculasUsuarios = new HashMap<>();
    private Map<Long, String> nomesUsuarios = new HashMap<>();
    private Map<Long, String> bicicletasAlugadas = new HashMap<>();
    private Map<Long, List<Bikes>> bikesTemporarias = new HashMap<>();

    @Autowired
    private Tratamentos tratamentos;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private BikesRepository bikesRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Value("${telegram.bot.token}")
    private String token;

    @Override
    public String getBotUsername() {
        return "VelociRent_Bot";
    }

    @Override
    public String getBotToken() {
        return token;
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            Long chatId = update.getMessage().getChatId();
            String mensagem = update.getMessage().getText();
            String estado = estadosUsuarios.getOrDefault(chatId, "INICIO");

            if (mensagem.equals("↩️ Voltar ao menu")) {
                String perfil = perfisUsuarios.get(chatId);
                String nome = nomesUsuarios.getOrDefault(chatId, "Usuário");
                if (perfil != null) {
                    estadosUsuarios.put(chatId, "MENU_" + perfil);
                    PerfilUsuario.mostrarMenuPorPerfil(this, chatId, nome, perfil);
                } else {
                    enviarMensagem(chatId, "❌ Perfil não encontrado. Reinicie com /start");
                    estadosUsuarios.put(chatId, "INICIO");
                }
                return;
            }

            switch (estado) {
                case "INICIO":
                    enviarMensagem(chatId, "👋 Bem-vindo à VelociRent!\nPor favor, digite sua matrícula:");
                    estadosUsuarios.put(chatId, "AGUARDANDO_MATRICULA");
                    break;

                case "AGUARDANDO_MATRICULA":
                    tratamentos.tratarMatricula(this, chatId, mensagem, estadosUsuarios,
                            matriculasUsuarios, perfisUsuarios, nomesUsuarios);
                    break;

                case "MENU_ALUNO":
                    tratamentos.tratarMenuAluno(this, chatId, mensagem, bicicletasAlugadas,
                            estadosUsuarios, matriculasUsuarios, nomesUsuarios);
                    break;

                case "MENU_PROFESSOR":
                    tratamentos.tratarMenuProfessor(this, chatId, mensagem, bicicletasAlugadas,
                            estadosUsuarios, matriculasUsuarios, nomesUsuarios);
                    break;

                case "MENU_MECANICO":
                    tratamentos.tratarMenuMecanico(this, chatId, mensagem, bicicletasAlugadas,
                            estadosUsuarios, matriculasUsuarios, nomesUsuarios);
                    break;

                case "MENU_ADMIN":
                    tratamentos.tratarMenuAdmin(this, chatId, mensagem, bicicletasAlugadas,
                            estadosUsuarios, matriculasUsuarios, nomesUsuarios);
                    break;

                case "AGUARDANDO_RETORNO":
                    tratamentos.tratarRetornoBicicleta(this, chatId, mensagem, bicicletasAlugadas,
                            matriculasUsuarios, estadosUsuarios, nomesUsuarios);
                    break;

                case "AGUARDANDO_EDICAO_STATUS":
                    tratamentos.tratarEdicaoStatus(this, chatId, mensagem, estadosUsuarios, perfisUsuarios);
                    break;

                case "AGUARDANDO_ESCOLHA_BIKE":
                    tratamentos.tratarEscolhaBicicleta(this, chatId, mensagem,
                            bicicletasAlugadas, matriculasUsuarios,
                            nomesUsuarios);
                    break;
                default:
                    enviarMensagem(chatId, "Erro de estado. Reinicie com /start.");
                    estadosUsuarios.put(chatId, "INICIO");
            }
        }
    }

    public void enviarMensagem(Long chatId, String texto) {
        SendMessage mensagem = new SendMessage();
        mensagem.setChatId(chatId.toString());
        mensagem.setText(texto);
        try {
            execute(mensagem);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    public void enviarMensagemComOpcaoMenu(Long chatId, String texto) {
        SendMessage mensagem = new SendMessage();
        mensagem.setChatId(chatId.toString());
        mensagem.setText(texto);

        ReplyKeyboardMarkup teclado = new ReplyKeyboardMarkup();
        teclado.setResizeKeyboard(true);
        teclado.setOneTimeKeyboard(false);

        KeyboardRow linha = new KeyboardRow();
        linha.add("↩️ Voltar ao menu");
        teclado.setKeyboard(Collections.singletonList(linha));
        mensagem.setReplyMarkup(teclado);

        try {
            execute(mensagem);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    public void enviarMensagemComBotoes(Long chatId, String texto, List<String> opcoes) {
        SendMessage mensagem = new SendMessage();
        mensagem.setChatId(chatId.toString());
        mensagem.setText(texto);

        ReplyKeyboardMarkup teclado = new ReplyKeyboardMarkup();
        teclado.setResizeKeyboard(true);
        teclado.setOneTimeKeyboard(false);

        List<KeyboardRow> linhas = new ArrayList<>();
        for (String opcao : opcoes) {
            KeyboardRow linha = new KeyboardRow();
            linha.add(opcao);
            linhas.add(linha);
        }

        if (!opcoes.contains("❌ Encerrar atendimento")) {
            KeyboardRow linhaVoltar = new KeyboardRow();
            linhaVoltar.add("↩️ Voltar ao menu");
            linhas.add(linhaVoltar);
        }

        teclado.setKeyboard(linhas);
        mensagem.setReplyMarkup(teclado);

        try {
            execute(mensagem);
        } catch (TelegramApiException e) {
            e.printStackTrace();
        }
    }

    private String obterNomePorChatId(Long chatId) {
        String nome = nomesUsuarios.get(chatId);
        if (nome != null) {
            return nome;
        }

        Integer matricula = matriculasUsuarios.get(chatId);
        if (matricula != null) {
            return usersRepository.findById(matricula)
                    .map(Users::getName)
                    .orElse("Usuário");
        }

        return "Usuário";
    }

    public UsersRepository getUsersRepository() {
        return usersRepository;
    }

    public BikesRepository getBikesRepository() {
        return bikesRepository;
    }

    public BookingRepository getBookingRepository() {
        return bookingRepository;
    }

    public Map<Long, List<Bikes>> getBikesTemporarias() {
        return bikesTemporarias;
    }

    public Map<Long, String> getEstadosUsuarios() {
        return estadosUsuarios;
    }

    public Map<Long, String> getPerfisUsuarios() {
        return perfisUsuarios;
    }

    public Map<Long, Integer> getMatriculasUsuarios() {
        return matriculasUsuarios;
    }

    public Map<Long, String> getNomesUsuarios() {
        return nomesUsuarios;
    }

    public Map<Long, String> getBicicletasAlugadas() {
        return bicicletasAlugadas;
    }
}