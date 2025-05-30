package com.velocirent;

import com.velocirent.telegram.VelociBot;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;
import org.telegram.telegrambots.updatesreceivers.DefaultBotSession;

@SpringBootApplication
public class VelociRentApplication {

	public static void main(String[] args) {
		SpringApplication.run(VelociRentApplication.class, args);
	}
	@Bean
	public TelegramBotsApi telegramBotsApi(VelociBot meuBot) throws TelegramApiException {
		TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
		botsApi.registerBot(meuBot);
		System.out.println("Bot inicializado com sucesso!");
		return botsApi;
	}
}
