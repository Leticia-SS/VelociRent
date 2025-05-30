package com.velocirent.telegram;

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
    private Map<Long, String> bicicletasAlugadas = new HashMap<>();
    private Map<Long, String> dadosTemporarios = new HashMap<>();
    private Tratamentos tratamentos = new Tratamentos();

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
                String nome = obterNomePorChatId(chatId);
                switch (perfil) {
                    case "ALUNO":
                        estadosUsuarios.put(chatId, "MENU_ALUNO");
                        PerfilUsuario.mostrarMenuAluno(this, chatId, nome);
                        break;
                    case "PROFESSOR":
                        estadosUsuarios.put(chatId, "MENU_PROFESSOR");
                        PerfilUsuario.mostrarMenuProfessor(this, chatId, nome);
                        break;
                    case "MECANICO":
                        estadosUsuarios.put(chatId, "MENU_MECANICO");
                        PerfilUsuario.mostrarMenuMecanico(this, chatId, nome);
                        break;
                    case "ADMIN":
                        estadosUsuarios.put(chatId, "MENU_ADMIN");
                        PerfilUsuario.mostrarMenuAdmin(this, chatId, nome);
                        break;
                }
                return;
            }

            switch (estado) {
                case "INICIO":
                    enviarMensagem(chatId, "👋 Bem-vindo à VelociRent!\nPor favor, digite sua matrícula:");
                    estadosUsuarios.put(chatId, "AGUARDANDO_MATRICULA");
                    break;

                case "AGUARDANDO_MATRICULA":
                    tratamentos.tratarMatricula(this, chatId, mensagem, estadosUsuarios, perfisUsuarios);
                    break;

                case "MENU_ALUNO":
                    tratamentos.tratarMenuAluno(this, chatId, mensagem, bicicletasAlugadas, estadosUsuarios);
                    break;

                case "MENU_PROFESSOR":
                    tratamentos.tratarMenuProfessor(this, chatId, mensagem, bicicletasAlugadas, estadosUsuarios);
                    break;

                case "MENU_MECANICO":
                    tratamentos.tratarMenuMecanico(this, chatId, mensagem, bicicletasAlugadas, estadosUsuarios);
                    break;

                case "MENU_ADMIN":
                    tratamentos.tratarMenuAdmin(this, chatId, mensagem, bicicletasAlugadas, estadosUsuarios);
                    break;

                case "AGUARDANDO_RETORNO":
                    tratamentos.tratarRetornoBicicleta(this, chatId, mensagem, bicicletasAlugadas, perfisUsuarios, estadosUsuarios);
                    break;

                case "AGUARDANDO_EDICAO_STATUS":
                    tratamentos.tratarEdicaoStatus(this, chatId, mensagem, estadosUsuarios);
                    break;

                default:
                    enviarMensagem(chatId, "Erro de estado. Reinicie com /start.");
                    estadosUsuarios.put(chatId, "INICIO");
            }
        }
    }

    private String obterNomePorChatId(Long chatId) {
        String perfil = perfisUsuarios.get(chatId);
        if (perfil == null) return "Usuário";

        switch (perfil) {
            case "ALUNO": return "Argos";
            case "PROFESSOR": return "Lara";
            case "MECANICO": return "Megan";
            case "ADMIN": return "Fazoeli";
            default: return "Usuário";
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

}
