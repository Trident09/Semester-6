import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter first number:");
        double firstNumber = scanner.nextDouble();

        System.out.println("Enter second number:");
        double secondNumber = scanner.nextDouble();

        System.out.println("Choose an operation (+, -, *, /):");
        char operation = scanner.next().charAt(0);

        double result;

        switch (operation) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                // Check if the denominator is not zero before division
                if (secondNumber != 0) {
                    result = firstNumber / secondNumber;
                } else {
                    System.out.println("Error: Cannot divide by zero.");
                    scanner.close();
                    return;
                }
                break;
            default:
                // Handle the case where an unknown operation is used
                System.out.println("Error: Invalid operation. Use +, -, * or / only.");
                scanner.close();
                return;
        }

        System.out.printf("Result: %.2f %c %.2f = %.2f%n", firstNumber, operation, secondNumber, result);

        scanner.close();
    }
}