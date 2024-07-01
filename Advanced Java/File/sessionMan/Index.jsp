<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.List" %>
<html>
<head>
    <title>Session Details</title>
</head>
<body>
    <h1>Session Details</h1>
    <p>User Role: <%= session.getAttribute("userRole") %></p>
    <p>Last Login Time: <%= session.getAttribute("lastLoginTime") %></p>
    <p>Full Name: <%= session.getAttribute("fullName") %></p>
    <p>Email: <%= session.getAttribute("email") %></p>
    <h2>Recent Activities:</h2>
    <ul>
        <%
            List<String> recentActivities = (List<String>) session.getAttribute("recentActivities");
            if (recentActivities != null) {
                for (String activity : recentActivities) {
                    out.println("<li>" + activity + "</li>");
                }
            } else {
                out.println("<li>No recent activities found.</li>");
            }
        %>
    </ul>
</body>
</html>