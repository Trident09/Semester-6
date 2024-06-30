import java.net.Socket;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Client {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 3333);
             DataInputStream din = new DataInputStream(socket.getInputStream());
             DataOutputStream dout = new DataOutputStream(socket.getOutputStream());
             BufferedReader br = new BufferedReader(new InputStreamReader(System.in))) {
            
            String str = "", str2 = "";
            while (!str.equalsIgnoreCase("stop")) {
                System.out.print("Enter message: ");
                str = br.readLine();
                dout.writeUTF(str);
                dout.flush();
                str2 = din.readUTF();
                System.out.println("Server says: " + str2);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
