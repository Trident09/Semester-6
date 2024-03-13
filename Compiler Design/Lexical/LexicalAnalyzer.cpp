#include <iostream>
#include <string>
#include <cctype>

bool isOperator(char c)
{
   return c == '+' || c == '-' || c == '*' || c == '/';
}

bool isSeparator(char c)
{
   return c == ';' || c == ',' || c == '(' || c == ')';
}

int main()
{
   std::string expression;
   std::cout << "Enter the expression: ";
   std::getline(std::cin, expression);

   std::string token;
   int tokenCount = 0;
   bool inString = false;
   bool inComment = false;

   for (size_t i = 0; i < expression.length(); ++i)
   {
      char c = expression[i];

      if (inComment)
      {
         if (c == '*' && i + 1 < expression.length() && expression[i + 1] == '/')
         {
            // End of block comment
            inComment = false;
            i++; // Skip the closing '/'
         }
         continue; // Ignore everything inside comments
      }

      if (inString)
      {
         token += c;
         if (c == '"')
         {
            // End of string literal
            inString = false;
            std::cout << "'" << token << "' (string)\n";
            tokenCount++;
            token.clear();
         }
         continue;
      }

      if (c == '"')
      {
         if (!token.empty())
         {
            std::cout << "'" << token << "' (identifier)\n";
            tokenCount++;
            token.clear();
         }
         inString = true;
         token += c;
         continue;
      }

      if (isSeparator(c))
      {
         if (!token.empty())
         {
            std::cout << "'" << token << "' (identifier)\n";
            tokenCount++;
            token.clear();
         }
         std::cout << "'" << c << "' (separator)\n";
         tokenCount++; // Count separators
         continue;
      }

      if (isOperator(c))
      {
         if (!token.empty())
         {
            std::cout << "'" << token << "' (identifier)\n";
            tokenCount++;
            token.clear();
         }
         if (c == '+' && i + 1 < expression.length() && expression[i + 1] == '+')
         {
            std::cout << "'++' (increment operator)\n";
            i++; // Skip next character
         }
         else
         {
            std::cout << "'" << c << "' (operator)\n";
         }
         tokenCount++;
         continue;
      }

      if (c == '/' && i + 1 < expression.length() && expression[i + 1] == '*')
      {
         // Start of block comment
         inComment = true;
         i++; // Skip the opening '*'
         continue;
      }

      if (!std::isspace(c))
      {
         token += c;
      }
      else if (!token.empty())
      {
         std::cout << "'" << token << "' (identifier)\n";
         tokenCount++;
         token.clear();
      }
   }

   if (!token.empty())
   {
      std::cout << "'" << token << "' (identifier)\n";
      tokenCount++;
   }

   std::cout << "The number of tokens = " << tokenCount << std::endl;

   return 0;
}