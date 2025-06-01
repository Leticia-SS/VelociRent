package com.velocirent.telegram.checkout;

import okhttp3.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class Checkout {

    private final Costumer costumer;

    public Checkout(Costumer costumer) {
        this.costumer = costumer;
    }

    public void processCheckout() {
        String customerId = costumer.createCustomer();
        LocalDate hoje = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String dataFormatada = hoje.format(formatter);

        if (customerId != null) {
            OkHttpClient client = new OkHttpClient();

            MediaType mediaType = MediaType.parse("application/json");
            RequestBody body = RequestBody.create(mediaType,
                    "{"
                            + "\"billingType\":\"UNDEFINED\","
                            + "\"customer\":\"" + customerId + "\","
                            + "\"value\":5,"
                            + "\"dueDate\":\"2026-07-01\","
                            + "\"description\":\"Referente ao aluguel da VelociBike realizado em " + dataFormatada + ". Agradecemos a sua preferência!\""
                            + "}");

            Request request = new Request.Builder()
                    .url("https://api.asaas.com/v3/payments")
                    .post(body)
                    .addHeader("accept", "application/json")
                    .addHeader("content-type", "application/json")
                    .addHeader("access_token", costumer.getAccessToken())
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (response.isSuccessful() && response.body() != null) {
                    String responseBody = response.body().string();
                    String urlPayment = responseBody.split("\"invoiceUrl\":\"")[1].split("\"")[0];
                    System.out.println("Link de pagamento: " + urlPayment);
                } else {
                    System.out.println("Erro: " + response.code() + " - " + response.message());
                    if (response.body() != null) {
                        System.out.println("Detalhes do erro: " + response.body().string());
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("Falha ao obter Customer ID");
        }
    }
}
