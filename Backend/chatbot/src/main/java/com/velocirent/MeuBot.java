package com.velocirent;

import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.*;

public class MeuBot extends TelegramLongPollingBot {

    private Map<Long, String> estadosUsuarios = new HashMap<>();
    private Map<Long, String> perfisUsuarios = new HashMap<>();
    private Map<Long, String> bicicletasAlugadas = new HashMap<>();
    private Map<Long, String> dadosTemporarios = new HashMap<>();

    @Override
    public String getBotUsername() {
        return "VelociRent_Bot";
    }

    @Override
    public String getBotToken() {
        return "7771915185:AAGy69iqSZthvV5hzBpIS4Mzbm5Jgctxw5M";
    }

    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage() && update.getMessage().hasText()) {
            Long chatId = update.getMessage().getChatId();
            String mensagem = update.getMessage().getText();
            String estado = estadosUsuarios.getOrDefault(chatId, "INICIO");

            // Verifica se o usuário quer voltar ao menu principal
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
                    tratarMatricula(chatId, mensagem);
                    break;

                case "MENU_ALUNO":
                    tratarMenuAluno(chatId, mensagem);
                    break;

                case "MENU_PROFESSOR":
                    tratarMenuProfessor(chatId, mensagem);
                    break;

                case "MENU_MECANICO":
                    tratarMenuMecanico(chatId, mensagem);
                    break;

                case "MENU_ADMIN":
                    tratarMenuAdmin(chatId, mensagem);
                    break;

                case "AGUARDANDO_RETORNO":
                    tratarRetornoBicicleta(chatId, mensagem);
                    break;

                case "AGUARDANDO_EDICAO_STATUS":
                    tratarEdicaoStatus(chatId, mensagem);
                    break;

                default:
                    enviarMensagem(chatId, "Erro de estado. Reinicie com /start.");
                    estadosUsuarios.put(chatId, "INICIO");
            }
        }
    }

    private void tratarMatricula(Long chatId, String mensagem) {
        if (mensagem.equals("123")) {
            perfisUsuarios.put(chatId, "ALUNO");
            estadosUsuarios.put(chatId, "MENU_ALUNO");
            PerfilUsuario.mostrarMenuAluno(this, chatId, "Argos");
        } else if (mensagem.equals("456")) {
            perfisUsuarios.put(chatId, "PROFESSOR");
            estadosUsuarios.put(chatId, "MENU_PROFESSOR");
            PerfilUsuario.mostrarMenuProfessor(this, chatId, "Lara");
        } else if (mensagem.equals("789")) {
            perfisUsuarios.put(chatId, "MECANICO");
            estadosUsuarios.put(chatId, "MENU_MECANICO");
            PerfilUsuario.mostrarMenuMecanico(this, chatId, "Megan");
        } else if (mensagem.equals("1011")) {
            perfisUsuarios.put(chatId, "ADMIN");
            estadosUsuarios.put(chatId, "MENU_ADMIN");
            PerfilUsuario.mostrarMenuAdmin(this, chatId, "Fazoeli");
        } else {
            enviarMensagem(chatId, "❌ Matrícula inválida. Tente novamente:");
        }
    }

    private void tratarMenuAluno(Long chatId, String mensagem) {
        switch (mensagem) {
            case "🚲 Alugar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    enviarMensagemComOpcaoMenu(chatId, "⚠️ Você já tem uma bicicleta alugada: " + bicicletasAlugadas.get(chatId));
                } else {
                    bicicletasAlugadas.put(chatId, "Bike#A" + new Random().nextInt(100));
                    enviarMensagemComOpcaoMenu(chatId, "✅ Você alugou a bicicleta: " + bicicletasAlugadas.get(chatId));
                }
                break;

            case "📜 Ver histórico":
                enviarMensagemComOpcaoMenu(chatId, "📅 Histórico de aluguéis:\n" +
                        "1. Bike#A23 - 10/05/2023 14:30\n" +
                        "2. Bike#A45 - 05/05/2023 09:15");
                break;

            case "🔄 Retornar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    enviarMensagem(chatId, "Por favor, informe o estado da bicicleta " +
                            bicicletasAlugadas.get(chatId) + " (ótimo, bom, regular, ruim):");
                } else {
                    enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhuma bicicleta alugada no momento.");
                }
                break;

            case "❌ Encerrar atendimento":
                enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent!");
                estadosUsuarios.put(chatId, "INICIO");
                break;

            default:
                enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    private void tratarMenuProfessor(Long chatId, String mensagem) {
        switch (mensagem) {
            case "🚲 Alugar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    enviarMensagemComOpcaoMenu(chatId, "⚠️ Você já tem uma bicicleta alugada: " + bicicletasAlugadas.get(chatId));
                } else {
                    bicicletasAlugadas.put(chatId, "Bike#A" + new Random().nextInt(100));
                    enviarMensagemComOpcaoMenu(chatId, "✅ Você alugou a bicicleta: " + bicicletasAlugadas.get(chatId));
                }
                break;

            case "📜 Ver histórico":
                enviarMensagemComOpcaoMenu(chatId, "📅 Histórico de aluguéis:\n" +
                        "1. Bike#A23 - 10/05/2023 14:30\n" +
                        "2. Bike#A45 - 05/05/2023 09:15");
                break;

            case "🔄 Retornar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    enviarMensagem(chatId, "Por favor, informe o estado da bicicleta " +
                            bicicletasAlugadas.get(chatId) + " (ótimo, bom, regular, ruim):");
                } else {
                    enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhuma bicicleta alugada no momento.");
                }
                break;

            case "❌ Encerrar atendimento":
                enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent!");
                estadosUsuarios.put(chatId, "INICIO");
                break;

            default:
                enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    private void tratarMenuMecanico(Long chatId, String mensagem) {
        switch (mensagem) {
            case "🔧 Verificar/Editar status das bikes":
                enviarMensagem(chatId, "🔧 Status das bicicletas:\n" +
                        "1. Bike#A23 - Disponível (bom estado)\n" +
                        "2. Bike#A45 - Em manutenção\n" +
                        "3. Bike#A67 - Alugada\n" +
                        "Digite o número da bike para editar status:");
                estadosUsuarios.put(chatId, "AGUARDANDO_EDICAO_STATUS");
                break;

            case "🚲 Alugar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    enviarMensagemComOpcaoMenu(chatId, "⚠️ Você já tem uma bicicleta alugada: " + bicicletasAlugadas.get(chatId));
                } else {
                    bicicletasAlugadas.put(chatId, "Bike#M" + new Random().nextInt(100));
                    enviarMensagemComOpcaoMenu(chatId, "✅ Você alugou a bicicleta: " + bicicletasAlugadas.get(chatId));
                }
                break;

            case "📜 Ver histórico":
                enviarMensagemComOpcaoMenu(chatId, "📅 Histórico de manutenções:\n" +
                        "1. Bike#A23 - Pneu furado - 08/05/2023\n" +
                        "2. Bike#A45 - Freios ajustados - 05/05/2023");
                break;

            case "🔄 Retornar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    enviarMensagem(chatId, "Por favor, informe o estado da bicicleta " +
                            bicicletasAlugadas.get(chatId) + " (ótimo, bom, regular, ruim):");
                } else {
                    enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhuma bicicleta alugada no momento.");
                }
                break;

            case "❌ Encerrar atendimento":
                enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent!");
                estadosUsuarios.put(chatId, "INICIO");
                break;

            default:
                enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    private void tratarMenuAdmin(Long chatId, String mensagem) {
        switch (mensagem) {
            case "🔍 Ver status das bikes":
                enviarMensagemComOpcaoMenu(chatId, "🚲 Status de todas as bicicletas:\n" +
                        "1. Bike#A23 - Alugada por Argos\n" +
                        "2. Bike#A45 - Disponível\n" +
                        "3. Bike#A67 - Em manutenção");
                break;

            case "📑 Ver histórico de todos":
                enviarMensagemComOpcaoMenu(chatId, "📊 Histórico completo:\n" +
                        "1. Argos - Bike#A23 - 10/05/2023\n" +
                        "2. Lara - Bike#A45 - 09/05/2023\n" +
                        "3. Megan - Bike#M12 - 08/05/2023");
                break;

            case "🚲 Alugar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    enviarMensagemComOpcaoMenu(chatId, "⚠️ Você já tem uma bicicleta alugada: " + bicicletasAlugadas.get(chatId));
                } else {
                    bicicletasAlugadas.put(chatId, "Bike#AD" + new Random().nextInt(100));
                    enviarMensagemComOpcaoMenu(chatId, "✅ Você alugou a bicicleta: " + bicicletasAlugadas.get(chatId));
                }
                break;

            case "📜 Ver meu histórico":
                enviarMensagemComOpcaoMenu(chatId, "📅 Seu histórico:\n" +
                        "1. Bike#AD12 - 10/05/2023\n" +
                        "2. Bike#AD34 - 05/05/2023");
                break;

            case "🔄 Retornar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    enviarMensagem(chatId, "Por favor, informe o estado da bicicleta " +
                            bicicletasAlugadas.get(chatId) + " (ótimo, bom, regular, ruim):");
                } else {
                    enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhuma bicicleta alugada no momento.");
                }
                break;

            case "❌ Encerrar atendimento":
                enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent!");
                estadosUsuarios.put(chatId, "INICIO");
                break;

            default:
                enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    private void tratarRetornoBicicleta(Long chatId, String mensagem) {
        String perfil = perfisUsuarios.get(chatId);
        String bike = bicicletasAlugadas.get(chatId);

        if (mensagem.matches("ótimo|bom|regular|ruim")) {
            bicicletasAlugadas.remove(chatId);
            enviarMensagemComOpcaoMenu(chatId, "✅ Bicicleta " + bike + " retornada com estado: " + mensagem +
                    "\nObrigado por utilizar nossos serviços!");

            // Volta para o estado do menu apropriado
            estadosUsuarios.put(chatId, "MENU_" + perfil);
        } else {
            enviarMensagem(chatId, "❌ Estado inválido. Por favor, informe o estado da bicicleta " +
                    bike + " (ótimo, bom, regular, ruim):");
        }
    }

    private void tratarEdicaoStatus(Long chatId, String mensagem) {
        if (mensagem.matches("[123]")) {
            enviarMensagemComOpcaoMenu(chatId, "✅ Status da bicicleta #" + mensagem + " atualizado com sucesso!");
            estadosUsuarios.put(chatId, "MENU_MECANICO");
        } else {
            enviarMensagem(chatId, "❌ Número inválido. Por favor, digite 1, 2 ou 3:");
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

        // Adiciona o botão "Voltar ao menu" apenas se não for o menu principal
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

class PerfilUsuario {

    public static List<String> optionsAluno() {
        return Arrays.asList(
                "🚲 Alugar bicicleta",
                "📜 Ver histórico",
                "🔄 Retornar bicicleta",
                "❌ Encerrar atendimento"
        );
    }

    public static void mostrarMenuAluno(MeuBot bot, Long chatId, String nome) {
        bot.enviarMensagemComBotoes(chatId, "🎓 Menu do Aluno", optionsAluno());
        bot.enviarMensagem(chatId, "Olá " + nome + "! Como posso te ajudar?");

    }

    public static void mostrarMenuProfessor(MeuBot bot, Long chatId, String nome) {
        List<String> opcoes = Arrays.asList(
                "🚲 Alugar bicicleta",
                "📜 Ver histórico",
                "🔄 Retornar bicicleta",
                "❌ Encerrar atendimento"
        );
        bot.enviarMensagemComBotoes(chatId, "📘 Menu do Professor", opcoes);
        bot.enviarMensagem(chatId, "Olá " + nome + "! Como posso te ajudar?");
    }

    public static void mostrarMenuMecanico(MeuBot bot, Long chatId, String nome) {
        List<String> opcoes = Arrays.asList(
                "🔧 Verificar/Editar status das bikes",
                "🚲 Alugar bicicleta",
                "📜 Ver histórico",
                "🔄 Retornar bicicleta",
                "❌ Encerrar atendimento"
        );
        bot.enviarMensagemComBotoes(chatId, "🛠️ Menu do Mecânico", opcoes);
        bot.enviarMensagem(chatId, "Olá " + nome + "! Como posso te ajudar?");

    }

    public static void mostrarMenuAdmin(MeuBot bot, Long chatId, String nome) {
        List<String> opcoes = Arrays.asList(
                "🔍 Ver status das bikes",
                "📑 Ver histórico de todos",
                "🚲 Alugar bicicleta",
                "📜 Ver meu histórico",
                "🔄 Retornar bicicleta",
                "❌ Encerrar atendimento"
        );
        bot.enviarMensagemComBotoes(chatId, "👑 Menu do Admin", opcoes);
        bot.enviarMensagem(chatId, "Olá " + nome + "! Como posso te ajudar?");
    }
}