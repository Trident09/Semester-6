package com.example;

import com.example.model.Book;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class App {
    public static void main(String[] args) {
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();

        // Create a new book
        Book book = new Book();
        book.setTitle("The Great Gatsby");
        book.setAuthor("F. Scott Fitzgerald");

        // Save the book
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.save(book);
        transaction.commit();
        session.close();

        System.out.println("Book saved successfully!");

        // Retrieve the book
        session = sessionFactory.openSession();
        Book retrievedBook = session.get(Book.class, book.getId());
        System.out.println("Retrieved book: " + retrievedBook.getTitle() + " by " + retrievedBook.getAuthor());
        session.close();

        sessionFactory.close();
    }
}