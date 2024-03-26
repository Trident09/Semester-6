import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Scanner;

public class UserInputListArrayConversion {
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Enter number of elements:");
        int numberOfElements = Integer.parseInt(scanner.nextLine());
        
        List<MyObject> myList = new ArrayList<>();
        for (int i = 0; i < numberOfElements; i++) {
            System.out.println("Enter data for element " + (i+1) + ":");
            System.out.print("ID: ");
            int id = Integer.parseInt(scanner.nextLine());
            System.out.print("Name: ");
            String name = scanner.nextLine();
            
            myList.add(new MyObject(id, name));
        }
        
        // Convert List to Array
        MyObject[] myArray = myList.toArray(new MyObject[0]);
        System.out.println("\nArray (after conversion from List):");
        printArray(myArray);
        
        // Convert Array to List
        List<MyObject> myList2 = new ArrayList<>(Arrays.asList(myArray));
        System.out.println("\nList (after conversion from Array):");
        printList(myList2);
        
        scanner.close();
    }
    
    private static void printArray(MyObject[] array) {
        for (MyObject obj : array) {
            System.out.println(obj);
        }
    }
    
    private static void printList(List<MyObject> list) {
        for (MyObject obj : list) {
            System.out.println(obj);
        }
    }
}

class MyObject {
    private int id;
    private String name;

    public MyObject(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "MyObject{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}