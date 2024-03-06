import java.net.*;

public class URLParser {
    public static void main(String[] args) {
        String inputUrl = "https://google.com/path/to/resource?query=string#fragment";
        try {
            try {
                URI uri = new URI(inputUrl);
                URL url = uri.toURL();
                String protocol = url.getProtocol();
                String host = url.getHost();
                int port = url.getPort();
                String file = url.getFile();
                String query = url.getQuery();
                String ref = url.getRef();

                System.out.println("URL: " + inputUrl);
                System.out.println("Protocol: " + protocol);
                System.out.println("Host: " + host);
                System.out.println("Port: " + (port == -1 ? url.getDefaultPort() : port)); 
                System.out.println("File: " + file);
                System.out.println("Query: " + query);
                System.out.println("Ref: " + ref);
            } catch (MalformedURLException e) {
                System.out.println("Invalid URL: " + inputUrl + "Malformed URL");
                e.printStackTrace();
            }
        } catch (URISyntaxException e) {
            System.out.println("Invalid URI: " + inputUrl + "URI Syntax Exception");
            e.printStackTrace();
        } finally {
            System.out.println("URL parsing complete.");
        }
    }
}

