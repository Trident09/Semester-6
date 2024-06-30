import java.io.*;
import java.net.*;

public class URLConnection {
    public static void main(String[] args) {
        String urlString = "https://guthib.com";
        
        try {
            // Create a URL object
            URL url = new URL(urlString);
            
            // Open a connection
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            
            // Set the request method
            connection.setRequestMethod("GET");
            
            // Get the response code
            int responseCode = connection.getResponseCode();
            
            // Check if the connection is successful (HTTP OK)
            if (responseCode == HttpURLConnection.HTTP_OK) {
                // Get the input stream
                InputStream inputStream = connection.getInputStream();
                
                // Create a BufferedReader to read the content
                BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
                String line;
                StringBuilder content = new StringBuilder();
                
                // Read and append each line to the content
                while ((line = reader.readLine()) != null) {
                    content.append(line);
                    content.append(System.lineSeparator());
                }
                
                // Print the fetched content
                System.out.println(content.toString());
                
                // Close the input stream
                reader.close();
            } else {
                System.out.println("HTTP request failed with code: " + responseCode);
            }
            
            // Disconnect the connection
            connection.disconnect();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}