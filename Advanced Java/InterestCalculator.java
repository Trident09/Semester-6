import java.util.Scanner;

public class InterestCalculator {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Get principal, rate, and time from user
        System.out.print("Enter the principal amount (P): ");
        double principal = scanner.nextDouble();
        
        System.out.print("Enter the rate of interest per annum (R) in percentage: ");
        double rate = scanner.nextDouble();
        
        System.out.print("Enter the time period (T) in years: ");
        double time = scanner.nextDouble();
        
        // Calculate simple interest
        double simpleInterest = (principal * rate * time) / 100;
        
        // Calculate compound interest
        System.out.print("Enter the number of times that interest is compounded per year (n): ");
        int compoundingsPerYear = scanner.nextInt();
        
        double compoundInterest = principal * (Math.pow((1 + (rate / (100 * compoundingsPerYear))), (compoundingsPerYear * time))) - principal;

        // Print results
        System.out.printf("Simple Interest: %.2f%n", simpleInterest);
        System.out.printf("Compound Interest: %.2f%n", compoundInterest);
        
        // Close scanner
        scanner.close();
    }
}