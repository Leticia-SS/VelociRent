package com.velocirent.telegram.checkout;

import com.google.gson.Gson;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.MediaType;
import okhttp3.RequestBody;

import java.util.HashMap;
import java.util.Map;

public class Costumer {
    public static void main(String[] args) {
        // Criação do cliente HTTP
        OkHttpClient client = new OkHttpClient();

        // Dados do cliente
        String userName = "Giovani Marlon";
        String userEmail = "giovani@infnet.edu.br"; // E-mail válido
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
                .addHeader("access_token", "acessTokenAqui") // Substitua pela sua chave real
                .build();

        // Executa a chamada HTTP
        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                System.out.println("Resposta: " + response.body().string());
            } else {
                System.out.println("Erro: " + response.code() + " - " + response.message());
                if (response.body() != null) {
                    System.out.println("Detalhes do erro: " + response.body().string());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
