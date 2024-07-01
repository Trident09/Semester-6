<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>JSP Implicit Objects</title>
	</head>
	<body>
		<h1>JSP Implicit Objects</h1>

		<h2>Request Object</h2>
		<p>Client IP Address: <%= request.getRemoteAddr() %></p>
		<p>Request Method: <%= request.getMethod() %></p>

		<h2>Response Object</h2>
		<% response.setContentType("text/html;charset=UTF-8");
		out.println("Response MIME type set to text/html"); %>

		<h2>Session Object</h2>
		<% session.setAttribute("username", "Rupam Barui"); %>
		<p>Username from Session: <%= session.getAttribute("username") %></p>

		<h2>Application Object</h2>
		<% application.setAttribute("appName", "JSP Implicit Application
		Application"); %>
		<p>Application Name: <%= application.getAttribute("appName") %></p>

		<h2>Out Object</h2>
		<% out.println("This is printed using the out object."); %>

		<h2>Config Object</h2>
		<p>Servlet Name: <%= config.getServletName() %></p>

		<h2>Page Object</h2>
		<p>Current JSP Page: <%= page.toString() %></p>

		<h2>PageContext Object</h2>
		<% pageContext.setAttribute("pageAttribute", "This is a page context
		attribute"); %>
		<p>
			Page Context Attribute: <%=
			pageContext.getAttribute("pageAttribute") %>
		</p>
	</body>
</html>
