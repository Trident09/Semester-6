import java.util.Scanner;

public class StringReversal {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a string to reverse: ");
        String originalString = scanner.nextLine();
        
        // Use StringBuilder to reverse the string
        String reversedString = new StringBuilder(originalString).reverse().toString();

        System.out.println("Reversed string: " + reversedString);
        
        scanner.close();
    }
}