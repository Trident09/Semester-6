import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/configDemo")
public class ServletConfigDemo extends HttpServlet {
    private static final long serialVersionUID = 1L;

    private javax.servlet.ServletConfig config;

    public void init(javax.servlet.ServletConfig config) throws ServletException {
        this.config = config;
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String adminEmail = config.getInitParameter("adminEmail");
        String welcomeMessage = config.getInitParameter("welcomeMessage");

        out.println("<html><body>");
        out.println("<h1>Servlet Config Demo</h1>");
        out.println("<p>Admin Email: " + adminEmail + "</p>");
        out.println("<p>Welcome Message: " + welcomeMessage + "</p>");
        out.println("</body></html>");
    }
}