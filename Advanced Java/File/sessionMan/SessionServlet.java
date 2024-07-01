package com.example.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@WebServlet(name = "SessionServlet", urlPatterns = {"/SessionServlet"})
public class SessionServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Get the current session, or create one if it doesn't exist
        HttpSession session = request.getSession(true);

        // Set session attributes
        session.setAttribute("userRole", "Admin");
        session.setAttribute("lastLoginTime", LocalDateTime.now().toString());
        session.setAttribute("fullName", "John Doe");
        session.setAttribute("email", "johndoe@example.com");

        // Create a list of recent activities
        List<String> recentActivities = Arrays.asList("Logged in", "Viewed profile", "Edited settings");
        session.setAttribute("recentActivities", recentActivities);

        // Redirect to a new page
        response.sendRedirect("session.jsp");
    }
}