package com.velocirent.telegram;

import com.velocirent.model.Bikes;
import com.velocirent.model.Booking;
import com.velocirent.model.Users;
import com.velocirent.repository.UsersRepository;
import com.velocirent.service.PDFGenerator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.api.methods.send.SendDocument;
import org.telegram.telegrambots.meta.api.objects.InputFile;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.io.ByteArrayInputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.springframework.jdbc.datasource.init.DatabasePopulatorUtils.execute;

@Component
public class Tratamentos {

    @Autowired
    private UsersRepository usersRepository;

    public void tratarMatricula(VelociBot bot, Long chatId, String mensagem,
                                Map<Long, String> estadosUsuarios,
                                Map<Long, Integer> matriculasUsuarios,
                                Map<Long, String> perfisUsuarios,
                                Map<Long, String> nomesUsuarios) {
        try {
            int matricula = Integer.parseInt(mensagem);
            Users user = bot.getUsersRepository().findById(matricula).orElse(null);

            if (user != null) {
                matriculasUsuarios.put(chatId, matricula);
                perfisUsuarios.put(chatId, user.getRole());
                nomesUsuarios.put(chatId, user.getName());
                estadosUsuarios.put(chatId, "MENU_" + user.getRole());

                PerfilUsuario.mostrarMenuPorPerfil(bot, chatId, user.getName(), user.getRole());
            } else {
                bot.enviarMensagem(chatId, "❌ Matrícula inválida. Tente novamente:");
                estadosUsuarios.put(chatId, "AGUARDANDO_MATRICULA");
            }
        } catch (NumberFormatException e) {
            bot.enviarMensagem(chatId, "❌ Matrícula inválida. Deve conter apenas números. Tente novamente:");
            estadosUsuarios.put(chatId, "AGUARDANDO_MATRICULA");
        }
    }

    public void tratarAluguelBicicleta(VelociBot bot, Long chatId,
                                       Map<Long, String> bicicletasAlugadas,
                                       Map<Long, Integer> matriculasUsuarios,
                                       Map<Long, String> nomesUsuarios) {
        try {
            Integer matricula = matriculasUsuarios.get(chatId);
            if (matricula == null) {
                bot.enviarMensagemComOpcaoMenu(chatId, "❌ Matrícula não encontrada. Reinicie o bot.");
                return;
            }

            List<Booking> alugueisAtivos = bot.getBookingRepository()
                    .findActiveBookingByUserMatricula(matricula);
            if (!alugueisAtivos.isEmpty()) {
                bot.enviarMensagemComOpcaoMenu(chatId, "⚠️ Você já tem uma bicicleta alugada. Por favor, devolva-a antes de alugar outra.");
                return;
            }

            List<Bikes> bikesDisponiveis = bot.getBikesRepository().findByAvailable(true);
            if (bikesDisponiveis.isEmpty()) {
                bot.enviarMensagemComOpcaoMenu(chatId, "❌ Não há bicicletas disponíveis no momento.");
                return;
            }

            StringBuilder listaBikes = new StringBuilder("🚲 Bicicletas disponíveis:\n");
            for (int i = 0; i < bikesDisponiveis.size(); i++) {
                listaBikes.append(i + 1).append(". ").append(bikesDisponiveis.get(i).getModel()).append("\n");
            }

            bot.enviarMensagem(chatId, listaBikes.toString());
            bot.enviarMensagem(chatId, "Digite o número da bicicleta que deseja alugar:");

            bot.getBikesTemporarias().put(chatId, bikesDisponiveis);
            bot.getEstadosUsuarios().put(chatId, "AGUARDANDO_ESCOLHA_BIKE");

        } catch (Exception e) {
            System.err.println("ERRO ao iniciar aluguel: " + e.getMessage());
            bot.enviarMensagemComOpcaoMenu(chatId, "❌ Ocorreu um erro ao processar o aluguel");
        }
    }

    public void tratarEscolhaBicicleta(VelociBot bot, Long chatId, String mensagem,
                                       Map<Long, String> bicicletasAlugadas,
                                       Map<Long, Integer> matriculasUsuarios,
                                       Map<Long, String> nomesUsuarios) {
        try {
            Integer matricula = matriculasUsuarios.get(chatId);
            if (matricula == null) {
                bot.enviarMensagemComOpcaoMenu(chatId, "❌ Matrícula não encontrada. Reinicie o bot.");
                return;
            }

            List<Bikes> bikesDisponiveis = bot.getBikesTemporarias().get(chatId);
            if (bikesDisponiveis == null || bikesDisponiveis.isEmpty()) {
                bot.enviarMensagemComOpcaoMenu(chatId, "❌ Lista de bicicletas expirada. Comece novamente.");
                return;
            }

            int escolha;
            try {
                escolha = Integer.parseInt(mensagem) - 1;
                if (escolha < 0 || escolha >= bikesDisponiveis.size()) {
                    throw new NumberFormatException();
                }
            } catch (NumberFormatException e) {
                bot.enviarMensagem(chatId, "❌ Número inválido. Digite um número da lista:");
                return;
            }

            Bikes bikeEscolhida = bikesDisponiveis.get(escolha);
            Users user = bot.getUsersRepository().findById(matricula).orElse(null);

            if (user == null) {
                bot.enviarMensagemComOpcaoMenu(chatId, "❌ Usuário não encontrado.");
                return;
            }

            Booking novoAluguel = new Booking();
            novoAluguel.setUser(user);
            novoAluguel.setBike(bikeEscolhida);
            novoAluguel.setStartTime(new Date());
            novoAluguel.setStatus("EM_ANDAMENTO");

            bot.getBookingRepository().save(novoAluguel);

            bikeEscolhida.setAvailable(false);
            bot.getBikesRepository().save(bikeEscolhida);

            bicicletasAlugadas.put(chatId, bikeEscolhida.getModel() + "#" + bikeEscolhida.getId());

            bot.getBikesTemporarias().remove(chatId);
            bot.getEstadosUsuarios().put(chatId, "MENU_" + user.getRole());

            bot.enviarMensagem(chatId, "✅ Bicicleta " + bikeEscolhida.getModel() + " alugada com sucesso!");
            bot.enviarMensagem(chatId, "Checkout abrindo...");
            String urlPayment = "https://www.asaas.com/i/2j7k4fyohcgmc505";
            bot.enviarMensagem(chatId, urlPayment);

        } catch (Exception e) {
            System.err.println("ERRO ao processar escolha de bike: " + e.getMessage());
            bot.enviarMensagemComOpcaoMenu(chatId, "❌ Ocorreu um erro ao processar sua escolha");
        }
    }


    private void tratarHistorico(VelociBot bot, Long chatId,
                                 Map<Long, Integer> matriculasUsuarios,
                                 Map<Long, String> nomesUsuarios) {
        try {
            Integer matricula = matriculasUsuarios.get(chatId);
            if (matricula == null) {
                bot.enviarMensagem(chatId, "❌ Matrícula não encontrada. Reinicie o bot.");
                return;
            }

            Users user = bot.getUsersRepository().findById(matricula).orElse(null);
            if (user == null) {
                bot.enviarMensagem(chatId, "❌ Usuário não encontrado.");
                return;
            }

            List<Booking> historico = bot.getBookingRepository().findByUserMatricula(user.getMatricula());
            StringBuilder historicoStr = new StringBuilder("📅 Seu histórico:\n");

            if (historico.isEmpty()) {
                historicoStr.append("Nenhum aluguel registrado.");
                bot.enviarMensagemComOpcaoMenu(chatId, historicoStr.toString());
            } else {
                for (Booking booking : historico) {
                    historicoStr.append("- ")
                            .append(booking.getBike().getModel())
                            .append(" (")
                            .append(DateUtils.formatToBrazilian(booking.getStartTime()))
                            .append(" a ")
                            .append(booking.getEndTime() != null ?
                                    DateUtils.formatToBrazilian(booking.getEndTime()) : "em andamento")
                            .append(") - ")
                            .append(booking.getStatus())
                            .append("\n");
                }

                try {
                    ClassPathResource resource = new ClassPathResource("images/logo.png");
                    byte[] logoBytes = Files.readAllBytes(resource.getFile().toPath());

                    byte[] pdfBytes = PDFGenerator.generateHistoryPDF(historico, logoBytes);

                    bot.enviarDocumento(chatId, pdfBytes, "historico_aluguel.pdf",
                            "📄 Histórico detalhado em anexo");

                } catch (Exception e) {
                    System.err.println("Erro ao gerar PDF: " + e.getMessage());
                    bot.enviarMensagem(chatId, "⚠️ Histórico em PDF não pôde ser gerado, mas aqui está o resumo:\n\n" + historicoStr);
                }
            }
        } catch (Exception e) {
            System.err.println("ERRO ao buscar histórico: " + e.getMessage());
            bot.enviarMensagemComOpcaoMenu(chatId, "❌ Ocorreu um erro ao buscar o histórico");
        }
    }

    public void tratarMenuAluno(VelociBot bot, Long chatId, String mensagem,
                                Map<Long, String> bicicletasAlugadas,
                                Map<Long, String> estadosUsuarios,
                                Map<Long, Integer> matriculasUsuarios,
                                Map<Long, String> nomesUsuarios) {
        String nome = nomesUsuarios.getOrDefault(chatId, "Usuário");

        switch (mensagem) {
            case "🚲 Alugar bicicleta":
                tratarAluguelBicicleta(bot, chatId, bicicletasAlugadas, matriculasUsuarios, nomesUsuarios);
                break;
            case "📜 Ver histórico":
                tratarHistorico(bot, chatId, matriculasUsuarios, nomesUsuarios);
                break;
            case "🔄 Retornar bicicleta":
                Integer matricula = matriculasUsuarios.get(chatId);
                if (matricula == null) {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Matrícula não encontrada. Reinicie o bot.");
                    break;
                }

                List<Booking> alugueisAtivos = bot.getBookingRepository()
                        .findActiveBookingByUserMatricula(matricula);

                if (!alugueisAtivos.isEmpty()) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    Bikes bike = alugueisAtivos.get(0).getBike();
                    String mensagemBike = "Por favor, avalie o estado da bicicleta:\n" +
                            "Modelo: " + bike.getModel() + "\n" +
                            "ID: " + bike.getId();

                    bot.enviarMensagem(chatId, mensagemBike);
                    List<String> opcoes = Arrays.asList("ótimo", "bom", "regular", "ruim");
                    bot.enviarMensagemComBotoes(chatId, "Avaliação:", opcoes);
                } else {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhum aluguel ativo.");
                }
                break;
            case "❌ Encerrar atendimento":
                bot.enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent, " + nome + "!");
                estadosUsuarios.put(chatId, "INICIO");
                break;
            default:
                bot.enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    public void tratarMenuProfessor(VelociBot bot, Long chatId, String mensagem,
                                    Map<Long, String> bicicletasAlugadas,
                                    Map<Long, String> estadosUsuarios,
                                    Map<Long, Integer> matriculasUsuarios,
                                    Map<Long, String> nomesUsuarios) {
        String nome = nomesUsuarios.getOrDefault(chatId, "Usuário");

        switch (mensagem) {
            case "🚲 Alugar bicicleta":
                tratarAluguelBicicleta(bot, chatId, bicicletasAlugadas, matriculasUsuarios, nomesUsuarios);
                break;
            case "📜 Ver histórico":
                tratarHistorico(bot, chatId, matriculasUsuarios, nomesUsuarios);
                break;
            case "🔄 Retornar bicicleta":
                Integer matricula = matriculasUsuarios.get(chatId);
                if (matricula == null) {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Matrícula não encontrada. Reinicie o bot.");
                    break;
                }

                List<Booking> alugueisAtivos = bot.getBookingRepository()
                        .findActiveBookingByUserMatricula(matricula);

                if (!alugueisAtivos.isEmpty()) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    Bikes bike = alugueisAtivos.get(0).getBike();
                    String mensagemBike = "Por favor, avalie o estado da bicicleta:\n" +
                            "Modelo: " + bike.getModel() + "\n" +
                            "ID: " + bike.getId();

                    bot.enviarMensagem(chatId, mensagemBike);
                    List<String> opcoes = Arrays.asList("ótimo", "bom", "regular", "ruim");
                    bot.enviarMensagemComBotoes(chatId, "Avaliação:", opcoes);
                } else {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhum aluguel ativo.");
                }
                break;
            case "❌ Encerrar atendimento":
                bot.enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent, " + nome + "!");
                estadosUsuarios.put(chatId, "INICIO");
                break;
            default:
                bot.enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    public void tratarMenuMecanico(VelociBot bot, Long chatId, String mensagem,
                                   Map<Long, String> bicicletasAlugadas,
                                   Map<Long, String> estadosUsuarios,
                                   Map<Long, Integer> matriculasUsuarios,
                                   Map<Long, String> nomesUsuarios) {
        String nome = nomesUsuarios.getOrDefault(chatId, "Usuário");

        switch (mensagem) {
            case "🔧 Verificar/Editar status das bikes":
                List<Bikes> todasBikes = bot.getBikesRepository().findAll();
                StringBuilder statusBikes = new StringBuilder("🔧 Status das bicicletas:\n");

                int i = 1;
                for (Bikes bike : todasBikes) {
                    statusBikes.append(i++).append(". ").append(bike.getModel())
                            .append(" - ").append(bike.isAvailable() ? "Disponível" : "Indisponível")
                            .append("\n");
                }

                bot.enviarMensagem(chatId, statusBikes.toString());
                bot.enviarMensagem(chatId, "Digite o número da bike para editar status:");
                estadosUsuarios.put(chatId, "AGUARDANDO_EDICAO_STATUS");
                break;
            case "🚲 Alugar bicicleta":
                tratarAluguelBicicleta(bot, chatId, bicicletasAlugadas, matriculasUsuarios, nomesUsuarios);
                break;
            case "📜 Ver histórico":
                tratarHistorico(bot, chatId, matriculasUsuarios, nomesUsuarios);
                break;
            case "🔄 Retornar bicicleta":
                Integer matricula = matriculasUsuarios.get(chatId);
                if (matricula == null) {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Matrícula não encontrada. Reinicie o bot.");
                    break;
                }

                List<Booking> alugueisAtivos = bot.getBookingRepository()
                        .findActiveBookingByUserMatricula(matricula);

                if (!alugueisAtivos.isEmpty()) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    Bikes bike = alugueisAtivos.get(0).getBike();
                    String mensagemBike = "Por favor, avalie o estado da bicicleta:\n" +
                            "Modelo: " + bike.getModel() + "\n" +
                            "ID: " + bike.getId();

                    bot.enviarMensagem(chatId, mensagemBike);
                    List<String> opcoes = Arrays.asList("ótimo", "bom", "regular", "ruim");
                    bot.enviarMensagemComBotoes(chatId, "Avaliação:", opcoes);
                } else {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhum aluguel ativo.");
                }
                break;
            case "❌ Encerrar atendimento":
                bot.enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent, " + nome + "!");
                estadosUsuarios.put(chatId, "INICIO");
                break;
            default:
                bot.enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    public void tratarMenuAdmin(VelociBot bot, Long chatId, String mensagem,
                                Map<Long, String> bicicletasAlugadas,
                                Map<Long, String> estadosUsuarios,
                                Map<Long, Integer> matriculasUsuarios,
                                Map<Long, String> nomesUsuarios) {
        String nome = nomesUsuarios.getOrDefault(chatId, "Usuário");

        switch (mensagem) {
            case "🔍 Ver status das bikes":
                List<Bikes> todasBikes = bot.getBikesRepository().findAll();
                StringBuilder statusBikes = new StringBuilder("🚲 Status das bicicletas:\n");

                for (Bikes bike : todasBikes) {
                    statusBikes.append("- ").append(bike.getModel())
                            .append(" (").append(bike.getId()).append("): ")
                            .append(bike.isAvailable() ? "Disponível" : "Indisponível");

                    if (!bike.isAvailable()) {
                        List<Booking> bookings = bot.getBookingRepository()
                                .findByBikeIdAndStatus(bike.getId(), "EM_ANDAMENTO");
                        if (!bookings.isEmpty()) {
                            statusBikes.append(" - Alugada por ")
                                    .append(bookings.get(0).getUser().getName());
                        }
                    }

                    statusBikes.append("\n");
                }

                bot.enviarMensagemComOpcaoMenu(chatId, statusBikes.toString());
                break;
            case "📑 Ver histórico de todos":
                try {
                    List<Booking> todosHistoricos = bot.getBookingRepository().findAll();

                    ClassPathResource resource = new ClassPathResource("images/logo.png");
                    byte[] logoBytes = Files.readAllBytes(resource.getFile().toPath());

                    byte[] pdfBytes = PDFGenerator.generateHistoryPDF(todosHistoricos, logoBytes);

                    bot.enviarDocumento(chatId, pdfBytes, "historico_alugueis.pdf",
                            "📊 Histórico completo em anexo");

                } catch (Exception e) {
                    System.err.println("Erro ao gerar PDF: " + e.getMessage());
                    bot.enviarMensagem(chatId, "❌ Erro ao gerar o histórico em PDF");
                }
                break;
            case "🚲 Alugar bicicleta":
                tratarAluguelBicicleta(bot, chatId, bicicletasAlugadas, matriculasUsuarios, nomesUsuarios);
                break;
            case "📜 Ver histórico":
                tratarHistorico(bot, chatId, matriculasUsuarios, nomesUsuarios);
                break;
            case "🔄 Retornar bicicleta":
                Integer matricula = matriculasUsuarios.get(chatId);
                if (matricula == null) {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Matrícula não encontrada. Reinicie o bot.");
                    break;
                }

                List<Booking> alugueisAtivos = bot.getBookingRepository()
                        .findActiveBookingByUserMatricula(matricula);

                if (!alugueisAtivos.isEmpty()) {
                    estadosUsuarios.put(chatId, "AGUARDANDO_RETORNO");
                    Bikes bike = alugueisAtivos.get(0).getBike();
                    String mensagemBike = "Por favor, avalie o estado da bicicleta:\n" +
                            "Modelo: " + bike.getModel() + "\n" +
                            "ID: " + bike.getId();

                    bot.enviarMensagem(chatId, mensagemBike);
                    List<String> opcoes = Arrays.asList("ótimo", "bom", "regular", "ruim");
                    bot.enviarMensagemComBotoes(chatId, "Avaliação:", opcoes);
                } else {
                    bot.enviarMensagemComOpcaoMenu(chatId, "❌ Você não tem nenhum aluguel ativo.");
                }
                break;
            case "❌ Encerrar atendimento":
                bot.enviarMensagem(chatId, "👋 Atendimento encerrado. Obrigado por usar a VelociRent, " + nome + "!");
                estadosUsuarios.put(chatId, "INICIO");
                break;
            default:
                bot.enviarMensagemComOpcaoMenu(chatId, "Opção inválida. Por favor, selecione uma opção do menu.");
        }
    }

    @Transactional
    public void tratarRetornoBicicleta(VelociBot bot, Long chatId, String mensagem,
                                       Map<Long, String> bicicletasAlugadas,
                                       Map<Long, Integer> matriculasUsuarios,
                                       Map<Long, String> estadosUsuarios,
                                       Map<Long, String> nomesUsuarios) {
        try {
            Integer matricula = matriculasUsuarios.get(chatId);
            if (matricula == null) {
                bot.enviarMensagem(chatId, "❌ Matrícula não encontrada. Reinicie o bot.");
                return;
            }

            if (!mensagem.matches("ótimo|bom|regular|ruim")) {
                bot.enviarMensagem(chatId, "❌ Avaliação inválida. Por favor, escolha entre: ótimo, bom, regular ou ruim");
                return;
            }

            List<Booking> alugueisAtivos = bot.getBookingRepository()
                    .findActiveBookingByUserMatricula(matricula);

            if (alugueisAtivos.isEmpty()) {
                bot.enviarMensagemComOpcaoMenu(chatId, "❌ Nenhum aluguel ativo encontrado no banco de dados.");
                return;
            }

            Booking booking = alugueisAtivos.get(0);
            Bikes bike = booking.getBike();

            booking.setStatus("COMPLETO");
            booking.setEndTime(new Date());

            try {
                bot.getBookingRepository().save(booking);
            } catch (Exception e) {
                System.err.println("ERRO ao salvar booking: " + e.getMessage());
                bot.enviarMensagem(chatId, "❌ Falha ao atualizar o registro de aluguel");
                return;
            }

            boolean bikeEmBomEstado = mensagem.matches("ótimo|bom");
            bike.setAvailable(bikeEmBomEstado);
            bot.getBikesRepository().save(bike);

            bicicletasAlugadas.remove(chatId);

            String confirmacao = String.format(
                    "📋 Retorno registrado:\n" +
                            "Bike: %s\n" +
                            "Avaliação: %s\n" +
                            "Horário: %s",
                    bike.getModel(),
                    mensagem,
                    Tratamentos.DateUtils.formatToBrazilian(booking.getEndTime())
            );

            bot.enviarMensagemComOpcaoMenu(chatId, confirmacao);

            String perfil = bot.getPerfisUsuarios().get(chatId);
            if (perfil != null) {
                estadosUsuarios.put(chatId, "MENU_" + perfil);
                PerfilUsuario.mostrarMenuPorPerfil(bot, chatId, nomesUsuarios.get(chatId), perfil);
            } else {
                estadosUsuarios.put(chatId, "INICIO");
                bot.enviarMensagem(chatId, "❌ Perfil não encontrado. Reinicie o bot.");
            }

        } catch (Exception e) {
            System.err.println("ERRO no retorno: " + e.getMessage());
            e.printStackTrace();
            bot.enviarMensagem(chatId, "❌ Falha no retorno. Tente novamente ou contate o suporte.");
        }
    }

    public void tratarEdicaoStatus(VelociBot bot, Long chatId, String mensagem,
                                   Map<Long, String> estadosUsuarios,
                                   Map<Long, String> perfisUsuarios) {
        try {
            int numeroBike = Integer.parseInt(mensagem);
            List<Bikes> todasBikes = bot.getBikesRepository().findAll();

            if (numeroBike > 0 && numeroBike <= todasBikes.size()) {
                Bikes bike = todasBikes.get(numeroBike - 1);

                List<Booking> bookingsAtivos = bot.getBookingRepository()
                        .findByBikeIdAndStatus(bike.getId(), "EM_ANDAMENTO");

                if (!bike.isAvailable() && bookingsAtivos.isEmpty()) {
                    bike.setAvailable(true);
                } else if (bike.isAvailable()) {
                    bike.setAvailable(false);
                } else {
                    bot.enviarMensagem(chatId, "❌ Bike está alugada por " +
                            bookingsAtivos.get(0).getUser().getName());
                    return;
                }

                bot.getBikesRepository().save(bike);
                bot.enviarMensagemComOpcaoMenu(chatId, "✅ Status atualizado: " +
                        bike.getModel() + " agora está " +
                        (bike.isAvailable() ? "disponível" : "indisponível"));

                estadosUsuarios.put(chatId, "MENU_MECANICO");
            }
        } catch (NumberFormatException e) {
            bot.enviarMensagem(chatId, "❌ Digite apenas números");
        }
    }

    public class DateUtils {

        private static final SimpleDateFormat BRAZIL_FORMAT = new SimpleDateFormat("dd/MM/yy - HH:mm");

        public static String formatToBrazilian(Date date) {
            if (date == null) {
                return "EM_ANDAMENTO";
            }
            synchronized (BRAZIL_FORMAT) {
                return BRAZIL_FORMAT.format(date);
            }
        }
    }

}
