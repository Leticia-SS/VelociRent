package com.velocirent.telegram.checkout;

import com.google.gson.Gson;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import java.util.HashMap;
import java.util.Map;

@Component
public class Costumer {

    @Value("${asaas.api.key}")
    private String accessToken;

    public String createCustomer() {
        OkHttpClient client = new OkHttpClient();
        String userName = "Argos Megan Lara";
        String userEmail = "giovani.ferreira@infnet.edu.br";
        String userCpf = "10271345640";

        Gson gson = new Gson();
        Map<String, String> data = new HashMap<>();
        data.put("name", userName);
        data.put("email", userEmail);
        data.put("cpfCnpj", userCpf);
        String json = gson.toJson(data);

        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(json, mediaType);

        Request request = new Request.Builder()
                .url("https://api.asaas.com/v3/customers")
                .post(body)
                .addHeader("accept", "application/json")
                .addHeader("content-type", "application/json")
                .addHeader("access_token", accessToken)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.isSuccessful()) {
                String responseBody = response.body().string();
                String customerId = responseBody.split("\"id\":\"")[1].split("\"")[0];
                return customerId;
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

    public String getAccessToken() {
        return accessToken;
    }

}
