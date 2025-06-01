package com.velocirent.service;

import com.velocirent.model.Booking;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import java.util.List;

public class PDFGenerator {
    public static byte[] generateHistoryPDF(List<Booking> bookings, byte[] logoBytes) throws Exception {
        Document document = new Document(PageSize.A4.rotate());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            if (logoBytes != null && logoBytes.length > 0) {
                Image logo = Image.getInstance(logoBytes);
                logo.scaleToFit(150, 150);
                logo.setAlignment(Element.ALIGN_CENTER);
                document.add(logo);
            }

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Paragraph title = new Paragraph("Histórico Completo de Aluguéis", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            Font dateFont = new Font(Font.FontFamily.HELVETICA, 10, Font.ITALIC);
            Paragraph date = new Paragraph("Gerado em: " + new Date(), dateFont);
            date.setAlignment(Element.ALIGN_RIGHT);
            date.setSpacingAfter(20);
            document.add(date);

            PdfPTable table = new PdfPTable(5); // 5 colunas
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);
            table.setSpacingAfter(10f);

            Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
            addTableHeader(table, headerFont);

            Font dataFont = new Font(Font.FontFamily.HELVETICA, 10);
            fillTableData(table, bookings, dataFont);

            document.add(table);

        } finally {
            document.close();
        }

        return baos.toByteArray();
    }

    private static void addTableHeader(PdfPTable table, Font font) {
        String[] headers = {"Usuário", "Modelo da Bike", "Início", "Término", "Status"};

        for (String header : headers) {
            PdfPCell cell = new PdfPCell();
            cell.setBackgroundColor(new BaseColor(0, 102, 204)); // Azul
            cell.setPadding(5);
            cell.setPhrase(new Phrase(header, font));
            table.addCell(cell);
        }
    }

    private static void fillTableData(PdfPTable table, List<Booking> bookings, Font font) {
        for (Booking booking : bookings) {
            table.addCell(new Phrase(booking.getUser().getName(), font));
            table.addCell(new Phrase(booking.getBike().getModel(), font));
            table.addCell(new Phrase(formatDate(booking.getStartTime()), font));
            table.addCell(new Phrase(booking.getEndTime() != null ?
                    formatDate(booking.getEndTime()) : "Em andamento", font));
            table.addCell(new Phrase(booking.getStatus(), font));
        }
    }

    private static String formatDate(Date date) {
        if (date == null) return "";
        return new SimpleDateFormat("dd/MM/yyyy HH:mm").format(date);
    }


}
