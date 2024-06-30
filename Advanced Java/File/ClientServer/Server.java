import java.net.ServerSocket;
import java.net.Socket;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Server {
    public static void main(String[] args) {
        try (ServerSocket ss = new ServerSocket(3333);
             Socket socket = ss.accept();
             DataInputStream din = new DataInputStream(socket.getInputStream());
             DataOutputStream dout = new DataOutputStream(socket.getOutputStream());
             BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            
            String str = "", str2 = "";
            while (!str.equalsIgnoreCase("stop")) {
                str = din.readUTF();
                System.out.println("Client says: " + str);
                System.out.print("Enter reply: ");
                str2 = br.readLine();
                dout.writeUTF(str2);
                dout.flush();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
