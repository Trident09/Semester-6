import java.util.Scanner;

public class FibonacciSeries {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt for the number of terms in the Fibonacci series
        System.out.print("Enter the number of terms in the Fibonacci series: ");
        int terms = scanner.nextInt();

        // First two terms of the Fibonacci series
        int firstTerm = 0;
        int secondTerm = 1;

        System.out.println("Fibonacci Series up to " + terms + " terms:");

        // Print the first n terms of the Fibonacci series
        for (int i = 1; i <= terms; ++i) {
            System.out.print(firstTerm + " ");

            // Compute the next term
            int nextTerm = firstTerm + secondTerm;
            firstTerm = secondTerm;
            secondTerm = nextTerm;
        }

        // Close the scanner
        scanner.close();
    }
}