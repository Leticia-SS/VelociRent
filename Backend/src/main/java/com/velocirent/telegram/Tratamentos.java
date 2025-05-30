package com.velocirent.telegram;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class Tratamentos {
    public void tratarMatricula(VelociBot bot, Long chatId, String mensagem,
                                Map<Long, String> estadosUsuarios, Map<Long, String> perfisUsuarios) {
        if (mensagem.equals("123")) {
            perfisUsuarios.put(chatId, "ALUNO");
            estadosUsuarios.put(chatId, "MENU_ALUNO");
            String userName = "Argos";
            PerfilUsuario.mostrarMenuAluno(bot, chatId, userName);
        } else if (mensagem.equals("456")) {
            perfisUsuarios.put(chatId, "PROFESSOR");
            estadosUsuarios.put(chatId, "MENU_PROFESSOR");
            String userName = "Argos";
            PerfilUsuario.mostrarMenuProfessor(bot, chatId, userName);
        } else if (mensagem.equals("789")) {
            perfisUsuarios.put(chatId, "MECANICO");
            estadosUsuarios.put(chatId, "MENU_MECANICO");
            String userName = "Argos";
            PerfilUsuario.mostrarMenuMecanico(bot, chatId, userName);
        } else if (mensagem.equals("1011")) {
            perfisUsuarios.put(chatId, "ADMIN");
            estadosUsuarios.put(chatId, "MENU_ADMIN");
            String userName = "Argos";
            PerfilUsuario.mostrarMenuAdmin(bot, chatId, userName);
        } else {
            bot.enviarMensagem(chatId, "❌ Matrícula inválida. Tente novamente:");
        }
    }

    public void tratarMenuAluno(VelociBot bot, Long chatId, String mensagem,
                                Map<Long, String> bicicletasAlugadas, Map<Long, String> estadosUsuarios) {
        switch (mensagem) {
            case "🚲 Alugar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    bot.enviarMensagemComOpcaoMenu(chatId, "⚠️ Você já tem uma bicicleta alugada: " + bicicletasAlugadas.get(chatId));
                } else {
                    bicicletasAlugadas.put(chatId, "Bike#A" + new Random().nextInt(100));
                    bot.enviarMensagem(chatId, "Checkout abrindo...");
                    String urlPayment = "https://www.asaas.com/i/2j7k4fyohcgmc505";
                    bot.enviarMensagem(chatId, urlPayment);
//                  bot.enviarMensagemComOpcaoMenu(chatId, "✅ Você alugou a bicicleta: " + bicicletasAlugadas.get(chatId));
                }
                break;

            case "📜 Ver histórico":
                bot.enviarMensagemComOpcaoMenu(chatId, "📅 Histórico de aluguéis:\n" +
                        "1. Bike#A23 - 10/05/2023 14:30\n" +
                        "2. Bike#A45 - 05/05/2023 09:15");
                break;

            case "🔄 Retornar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    bot.enviarMensagem(chatId, "Por favor, informe o estado da bicicleta " +
                            bicicletasAlugadas.get(chatId) + " (ótimo, bom, regular, ruim):");
                    List<String> opcoes = Arrays.asList(
                            "ótimo",
                            "bom",
                            "regular",
                            "ruim"
                    );
                    bot.enviarMensagemComBotoes(chatId, "Avaliar bike como:", opcoes);
                } else {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhuma bicicleta alugada no momento.");
                }
                break;

            case "❌ Encerrar atendimento":
                bot.enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent!");
                estadosUsuarios.put(chatId, "INICIO");
                break;

            default:
                bot.enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    public void tratarMenuProfessor(VelociBot bot, Long chatId, String mensagem,
                                    Map<Long, String> bicicletasAlugadas, Map<Long, String> estadosUsuarios) {
        switch (mensagem) {
            case "🚲 Alugar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    bot.enviarMensagemComOpcaoMenu(chatId, "⚠️ Você já tem uma bicicleta alugada: " + bicicletasAlugadas.get(chatId));
                } else {
                    bicicletasAlugadas.put(chatId, "Bike#A" + new Random().nextInt(100));
                    bot.enviarMensagem(chatId, "Checkout abrindo...");
                    String urlPayment = "https://www.asaas.com/i/2j7k4fyohcgmc505";
                    bot.enviarMensagem(chatId, urlPayment);
//                  bot.enviarMensagemComOpcaoMenu(chatId, "✅ Você alugou a bicicleta: " + bicicletasAlugadas.get(chatId));
                }
                break;

            case "📜 Ver histórico":
                bot.enviarMensagemComOpcaoMenu(chatId, "📅 Histórico de aluguéis:\n" +
                        "1. Bike#A23 - 10/05/2023 14:30\n" +
                        "2. Bike#A45 - 05/05/2023 09:15");
                break;

            case "🔄 Retornar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    bot.enviarMensagem(chatId, "Por favor, informe o estado da bicicleta " +
                            bicicletasAlugadas.get(chatId) + " (ótimo, bom, regular, ruim):");
                    List<String> opcoes = Arrays.asList(
                            "ótimo",
                            "bom",
                            "regular",
                            "ruim"
                    );
                    bot.enviarMensagemComBotoes(chatId, "Avaliar bike como:", opcoes);
                } else {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhuma bicicleta alugada no momento.");
                }
                break;

            case "❌ Encerrar atendimento":
                bot.enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent!");
                estadosUsuarios.put(chatId, "INICIO");
                break;

            default:
                bot.enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    public void tratarMenuMecanico(VelociBot bot, Long chatId, String mensagem,
                                   Map<Long, String> bicicletasAlugadas, Map<Long, String> estadosUsuarios) {
        switch (mensagem) {
            case "🔧 Verificar/Editar status das bikes":
                bot.enviarMensagem(chatId, "🔧 Status das bicicletas:\n" +
                        "1. Bike#A23 - Disponível (bom estado)\n" +
                        "2. Bike#A45 - Em manutenção\n" +
                        "3. Bike#A67 - Alugada\n" +
                        "Digite o número da bike para editar status:");
                estadosUsuarios.put(chatId, "AGUARDANDO_EDICAO_STATUS");
                break;

            case "🚲 Alugar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    bot.enviarMensagemComOpcaoMenu(chatId, "⚠️ Você já tem uma bicicleta alugada: " + bicicletasAlugadas.get(chatId));
                } else {
                    bicicletasAlugadas.put(chatId, "Bike#A" + new Random().nextInt(100));
                    bot.enviarMensagem(chatId, "Checkout abrindo...");
                    String urlPayment = "https://www.asaas.com/i/2j7k4fyohcgmc505";
                    bot.enviarMensagem(chatId, urlPayment);
//                  bot.enviarMensagemComOpcaoMenu(chatId, "✅ Você alugou a bicicleta: " + bicicletasAlugadas.get(chatId));
                }
                break;

            case "📜 Ver histórico":
                bot.enviarMensagemComOpcaoMenu(chatId, "📅 Histórico de manutenções:\n" +
                        "1. Bike#A23 - Pneu furado - 08/05/2023\n" +
                        "2. Bike#A45 - Freios ajustados - 05/05/2023");
                break;
            case "🔄 Retornar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    bot.enviarMensagem(chatId, "Por favor, informe o estado da bicicleta " +
                            bicicletasAlugadas.get(chatId) + " (ótimo, bom, regular, ruim):");
                    List<String> opcoes = Arrays.asList(
                            "ótimo",
                            "bom",
                            "regular",
                            "ruim"
                    );
                    bot.enviarMensagemComBotoes(chatId, "Avaliar bike como:", opcoes);
                } else {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhuma bicicleta alugada no momento.");
                }
                break;

            case "❌ Encerrar atendimento":
                bot.enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent!");
                estadosUsuarios.put(chatId, "INICIO");
                break;

            default:
                bot.enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    public void tratarMenuAdmin(VelociBot bot, Long chatId, String mensagem,
                                Map<Long, String> bicicletasAlugadas, Map<Long, String> estadosUsuarios) {
        switch (mensagem) {
            case "🔍 Ver status das bikes":
                bot.enviarMensagemComOpcaoMenu(chatId, "🚲 Status de todas as bicicletas:\n" +
                        "1. Bike#A23 - Alugada por Argos\n" +
                        "2. Bike#A45 - Disponível\n" +
                        "3. Bike#A67 - Em manutenção");
                break;

            case "📑 Ver histórico de todos":
                bot.enviarMensagemComOpcaoMenu(chatId, "📊 Histórico completo:\n" +
                        "1. Argos - Bike#A23 - 10/05/2023\n" +
                        "2. Lara - Bike#A45 - 09/05/2023\n" +
                        "3. Megan - Bike#M12 - 08/05/2023");
                break;

            case "🚲 Alugar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    bot.enviarMensagemComOpcaoMenu(chatId, "⚠️ Você já tem uma bicicleta alugada: " + bicicletasAlugadas.get(chatId));
                } else {
                    bicicletasAlugadas.put(chatId, "Bike#A" + new Random().nextInt(100));
                    bot.enviarMensagem(chatId, "Checkout abrindo...");
                    String urlPayment = "https://www.asaas.com/i/2j7k4fyohcgmc505";
                    bot.enviarMensagem(chatId, urlPayment);
//                  bot.enviarMensagemComOpcaoMenu(chatId, "✅ Você alugou a bicicleta: " + bicicletasAlugadas.get(chatId));
                }
                break;

            case "📜 Ver meu histórico":
                bot.enviarMensagemComOpcaoMenu(chatId, "📅 Seu histórico:\n" +
                        "1. Bike#AD12 - 10/05/2023\n" +
                        "2. Bike#AD34 - 05/05/2023");
                break;

            case "🔄 Retornar bicicleta":
                if (bicicletasAlugadas.containsKey(chatId)) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    bot.enviarMensagem(chatId, "Por favor, informe o estado da bicicleta " +
                            bicicletasAlugadas.get(chatId) + " (ótimo, bom, regular, ruim):");
                    List<String> opcoes = Arrays.asList(
                            "ótimo",
                            "bom",
                            "regular",
                            "ruim"
                    );
                    bot.enviarMensagemComBotoes(chatId, "Avaliar bike como:", opcoes);
                } else {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhuma bicicleta alugada no momento.");
                }
                break;

            case "❌ Encerrar atendimento":
                bot.enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent!");
                estadosUsuarios.put(chatId, "INICIO");
                break;

            default:
                bot.enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    public void tratarRetornoBicicleta(VelociBot bot, Long chatId, String mensagem,
                                       Map<Long, String> bicicletasAlugadas, Map<Long, String> perfisUsuarios,
                                       Map<Long, String> estadosUsuarios) {
        String perfil = perfisUsuarios.get(chatId);
        String bike = bicicletasAlugadas.get(chatId);

        if (mensagem.matches("ótimo|bom|regular|ruim".toLowerCase())) {
            bicicletasAlugadas.remove(chatId);
            bot.enviarMensagemComOpcaoMenu(chatId, "✅ Bicicleta " + bike + " retornada com estado: " + mensagem +
                    "\nObrigado por utilizar nossos serviços!");

            // Volta para o estado do menu apropriado
            estadosUsuarios.put(chatId, "MENU_" + perfil);
        } else {
            bot.enviarMensagem(chatId, "❌ Estado inválido. Por favor, informe o estado da bicicleta " +
                    bike + " (ótimo, bom, regular, ruim):");
        }
    }

    public void tratarEdicaoStatus(VelociBot bot, Long chatId, String mensagem, Map<Long, String> estadosUsuarios) {
        if (mensagem.matches("[123]")) {
            bot.enviarMensagemComOpcaoMenu(chatId, "✅ Status da bicicleta #" + mensagem + " atualizado com sucesso!");
            estadosUsuarios.put(chatId, "MENU_MECANICO");
        } else {
            bot.enviarMensagem(chatId, "❌ Número inválido. Por favor, digite 1, 2 ou 3:");
        }
    }
}
