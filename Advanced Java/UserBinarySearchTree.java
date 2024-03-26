import java.util.Scanner;

class BSTNode {
    int data;
    BSTNode left, right;

    public BSTNode(int data) {
        this.data = data;
        this.left = this.right = null;
    }
}

class BinarySearchTree {
    BSTNode root;

    public BinarySearchTree() {
        root = null;
    }

    public void insert(int data) {
        root = insertRec(root, data);
    }

    private BSTNode insertRec(BSTNode root, int data) {
        if (root == null) {
            root = new BSTNode(data);
            return root;
        }
        if (data < root.data) {
            root.left = insertRec(root.left, data);
        } else if (data > root.data) {
            root.right = insertRec(root.right, data);
        }
        return root;
    }

    public boolean search(int data) {
        return searchRec(root, data);
    }

    private boolean searchRec(BSTNode root, int data) {
        if (root == null) {
            return false;
        }
        if (data == root.data) {
            return true;
        }
        return data < root.data ? searchRec(root.left, data) : searchRec(root.right, data);
    }
}

public class UserBinarySearchTree {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        BinarySearchTree bst = new BinarySearchTree();

        System.out.print("Enter the number of elements to insert into BST: ");
        int numElements = scanner.nextInt();

        System.out.println("Enter the elements to insert into BST:");
        for (int i = 0; i < numElements; i++) {
            int element = scanner.nextInt();
            bst.insert(element);
        }

        System.out.print("Enter a value to search in BST: ");
        int valueToSearch = scanner.nextInt();

        boolean exists = bst.search(valueToSearch);
        if (exists) {
            System.out.println(valueToSearch + " exists in the BST.");
        } else {
            System.out.println(valueToSearch + " does not exist in the BST.");
        }

        scanner.close();
    }
}