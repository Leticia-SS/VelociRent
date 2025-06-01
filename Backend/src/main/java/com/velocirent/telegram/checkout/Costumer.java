package com.velocirent.telegram.checkout;

import com.google.gson.Gson;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.MediaType;
import okhttp3.RequestBody;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

public class Costumer {
    @Value("${asaas.api.key}")
    public static String accessToken;

    public static String main() {
        // Criação do cliente HTTP
        OkHttpClient client = new OkHttpClient();

        // Dados do cliente
        String userName = "Argos Megan Lara";
        String userEmail = "giovani.ferreira@infnet.edu.br"; // E-mail válido (somente com @ ja serve)
        String userCpf = "10271345640"; // CPF com 11 dígitos válidos

        // Criação do JSON com Gson
        Gson gson = new Gson();
        Map<String, String> data = new HashMap<>();
        data.put("name", userName);
        data.put("email", userEmail);
        data.put("cpfCnpj", userCpf);
        String json = gson.toJson(data);

        // Define o tipo de mídia do corpo da requisição como JSON
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(json, mediaType);

        // Criação da requisição
        Request request = new Request.Builder()
                .url("https://api.asaas.com/v3/customers")
                .post(body)
                .addHeader("accept", "application/json")
                .addHeader("content-type", "application/json")
                .addHeader("access_token", accessToken)
                .build();

        // Executa a chamada HTTP
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                String responseBody = response.body().string();
                String customerId = responseBody.split("\"id\":\"")[1].split("\"")[0];
//                System.out.println("id do cliete gerado: " + customerId);
                return customerId;  // Retorna o ID
            } else {
                System.out.println("Erro: " + response.code() + " - " + response.message());
                if (response.body() != null) {
                    System.out.println("Detalhes do erro: " + response.body().string());
                }
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}

class Checkout {
    public static void main(String[] args) {
        String customerId = Costumer.main();
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
                    .addHeader("access_token", Costumer.accessToken)  // Note: "access" is misspelled as "acess"
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (response.isSuccessful()) {

                    if (response.body() != null) {
                        String responseBody = response.body().string();
                        String urlPayment = responseBody.split("\"invoiceUrl\":\"")[1].split("\"")[0];
                        System.out.println("link de pagamento: " + urlPayment);
                    }
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