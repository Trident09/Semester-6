import java.util.Scanner;

public class QuickSort {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Get array length from user
        System.out.print("Enter the number of elements: ");
        int length = scanner.nextInt();
        
        // Create array and read elements
        int[] array = new int[length];
        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < length; i++) {
            array[i] = scanner.nextInt();
        }
        
        // Perform the Quick Sort
        quickSort(array, 0, array.length - 1);
        
        // Print the sorted array
        System.out.println("Sorted array: ");
        for (int value : array) {
            System.out.print(value + " ");
        }
        
        // Close scanner
        scanner.close();
    }

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];  
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}