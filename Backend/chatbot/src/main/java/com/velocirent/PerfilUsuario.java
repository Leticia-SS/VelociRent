package com.velocirent;

import java.util.Arrays;
import java.util.List;

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

    public static void AvaliarBike(MeuBot bot, Long chatId, String nome){
        List<String> opcoes = Arrays.asList(
                "ótimo",
                "bom",
                "regular",
                "ruim"
        );

        bot.enviarMensagemComBotoes(chatId, "Avaliar bike", opcoes);

    }
}
