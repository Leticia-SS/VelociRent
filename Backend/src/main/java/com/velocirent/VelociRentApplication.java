package com.velocirent;

import com.velocirent.telegram.VelociBot;
import com.velocirent.telegram.checkout.Checkout;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
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
	public TelegramBotsApi telegramBotsApi(VelociBot velociBot) throws TelegramApiException {
		TelegramBotsApi botsApi = new TelegramBotsApi(DefaultBotSession.class);
		botsApi.registerBot(velociBot);
		System.out.println("=== BOT REGISTRADO COM SUCESSO ===");
		return botsApi;
	}

	public CommandLineRunner run(ApplicationContext ctx) {
		return args -> {
			Checkout checkout = ctx.getBean(Checkout.class);
			checkout.processCheckout();
		};
	}
}
