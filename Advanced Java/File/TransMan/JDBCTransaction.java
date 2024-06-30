import java.sql.*;

public class JDBCTransaction {
    public static void main(String[] args) {
        // JDBC driver name and database URL
        final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
        final String DB_URL = "jdbc:mysql://localhost:3306/mydatabase";

        // Database credentials
        final String USER = "rupamuser";
        final String PASS = "rupampass";

        Connection conn = null;
        Statement stmt = null;

        try {
            // Register JDBC driver
            Class.forName(JDBC_DRIVER);

            // Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);

            // Set auto-commit to false to start a transaction
            conn.setAutoCommit(false);

            // Create a statement
            stmt = conn.createStatement();

            // Perform multiple operations within a transaction
            String sql1 = "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com')";
            String sql2 = "UPDATE users SET email = 'bob@example.com' WHERE name = 'Bob Johnson'";
            String sql3 = "DELETE FROM users WHERE name = 'John Doe'";

            System.out.println("Executing transaction...");
            stmt.executeUpdate(sql1);
            stmt.executeUpdate(sql2);
            stmt.executeUpdate(sql3);

            // Commit the transaction
            conn.commit();
            System.out.println("Transaction committed successfully.");

        } catch (SQLException se) {
            // Handle errors for JDBC
            se.printStackTrace();
            try {
                // Roll back the transaction on error
                System.out.println("Rolling back transaction...");
                if (conn != null) {
                    conn.rollback();
                }
            } catch (SQLException re) {
                re.printStackTrace();
            }
        } catch (Exception e) {
            // Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            // Finally block used to close resources
            try {
                if (stmt != null) stmt.close();
            } catch (SQLException se2) {
            }
            try {
                if (conn != null) conn.close();
            } catch (SQLException se) {
                se.printStackTrace();
            }
        }
        System.out.println("Goodbye!");
    }
}