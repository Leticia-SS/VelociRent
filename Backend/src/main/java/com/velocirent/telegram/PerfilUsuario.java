package com.velocirent.telegram;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class PerfilUsuario {

    public static void mostrarMenuPorPerfil(VelociBot bot, Long chatId, String nome, String perfil) {
        String titulo = "";
        List<String> opcoes;

        switch (perfil.toUpperCase()) {
            case "ALUNO":
                titulo = "🎓 Menu do Aluno";
                opcoes = Arrays.asList(
                        "🚲 Alugar bicicleta",
                        "📜 Ver histórico",
                        "🔄 Retornar bicicleta",
                        "❌ Encerrar atendimento"
                );
                break;
            case "PROFESSOR":
                titulo = "📘 Menu do Professor";
                opcoes = Arrays.asList(
                        "🚲 Alugar bicicleta",
                        "📜 Ver histórico",
                        "🔄 Retornar bicicleta",
                        "❌ Encerrar atendimento"
                );
                break;
            case "MECANICO":
                titulo = "🛠️ Menu do Mecânico";
                opcoes = Arrays.asList(
                        "🔧 Verificar/Editar status das bikes",
                        "🚲 Alugar bicicleta",
                        "📜 Ver histórico",
                        "🔄 Retornar bicicleta",
                        "❌ Encerrar atendimento"
                );
                break;
            case "ADMIN":
                titulo = "👑 Menu do Admin";
                opcoes = Arrays.asList(
                        "🔍 Ver status das bikes",
                        "📑 Ver histórico de todos",
                        "🚲 Alugar bicicleta",
                        "📜 Ver histórico",
                        "🔄 Retornar bicicleta",
                        "❌ Encerrar atendimento"
                );
                break;
            default:
                titulo = "Menu";
                opcoes = Arrays.asList(
                        "🚲 Alugar bicicleta",
                        "❌ Encerrar atendimento"
                );
        }

        bot.enviarMensagemComBotoes(chatId, titulo, opcoes);
        bot.enviarMensagem(chatId, "Olá " + nome + "! Como posso te ajudar?");
    }

    public static void avaliarBike(VelociBot bot, Long chatId, String nome) {
        List<String> opcoes = Arrays.asList("ótimo", "bom", "regular", "ruim");
        bot.enviarMensagemComBotoes(chatId, "Avaliar bike", opcoes);
    }
}