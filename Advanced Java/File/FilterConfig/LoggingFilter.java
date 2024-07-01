import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.FilterServletRequest;
import javax.servlet.FilterServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;

public class LoggingFilter implements Filter {
    private FilterConfig filterConfig = null;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig = filterConfig;
    }

    @Override
    public void doFilter(FilterServletRequest request, FilterServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        String uri = request.getRequestURI();
        System.out.println("Requested URI: " + uri);
        chain.doFilter(request, response); // Pass the request and response along the filter chain
    }

    @Override
    public void destroy() {
        this.filterConfig = null;
    }
}