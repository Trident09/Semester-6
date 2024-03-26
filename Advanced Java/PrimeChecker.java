import java.util.Scanner;

public class PrimeChecker {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter a number to check if it's prime: ");
        int number = scanner.nextInt();

        if (isPrime(number)) {
            System.out.println(number + " is a prime number.");
        } else {
            System.out.println(number + " is not a prime number.");
        }
        
        scanner.close();
    }

    private static boolean isPrime(int num) {
        if (num <= 1) {
            return false; // Numbers less than or equal to 1 are not prime numbers.
        }
        if (num == 2) {
            return true; // 2 is the only even prime number.
        }
        if (num % 2 == 0) {
            return false; // No even number greater than 2 can be a prime.
        }
        int sqrt = (int) Math.sqrt(num) + 1;
        for (int i = 3; i < sqrt; i += 2) {
            if (num % i == 0) {
                return false; // Found a factor, so num is not prime.
            }
        }
        return true; // No factors found, num is prime.
    }
}