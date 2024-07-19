#include <iostream>
#include <string>
#include <cctype>

bool isOperator(char c)
{
   return c == '+' || c == '-' || c == '*' || c == '/' || c == '=';
}

bool isSeparator(char c)
{
   return c == ';' || c == ',' || c == '(' || c == ')';
}

bool isKeyword(const std::string& str)
{
   static const char* keywords[] = {
       "int", "float", "double", "char", "void", "if", "else", "while", "for", "return"
   };
   static const int keywordCount = sizeof(keywords) / sizeof(keywords[0]);
   
   for (int i = 0; i < keywordCount; ++i) {
       if (str == keywords[i]) {
           return true;
       }
   }
   return false;
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
            inComment = false;
            i++;
         }
         continue;
      }
      if (inString)
      {
         token += c;
         if (c == '"')
         {
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
            if (isKeyword(token))
               std::cout << "'" << token << "' (keyword)\n";
            else if (std::isdigit(token[0]))
               std::cout << "'" << token << "' (number)\n";
            else
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
            if (isKeyword(token))
               std::cout << "'" << token << "' (keyword)\n";
            else if (std::isdigit(token[0]))
               std::cout << "'" << token << "' (number)\n";
            else
               std::cout << "'" << token << "' (identifier)\n";
            tokenCount++;
            token.clear();
         }
         std::cout << "'" << c << "' (separator)\n";
         tokenCount++;
         continue;
      }
      if (isOperator(c))
      {
         if (!token.empty())
         {
            if (isKeyword(token))
               std::cout << "'" << token << "' (keyword)\n";
            else if (std::isdigit(token[0]))
               std::cout << "'" << token << "' (number)\n";
            else
               std::cout << "'" << token << "' (identifier)\n";
            tokenCount++;
            token.clear();
         }
         std::cout << "'" << c << "' (operator)\n";
         tokenCount++;
         continue;
      }
      if (c == '/' && i + 1 < expression.length() && expression[i + 1] == '*')
      {
         inComment = true;
         i++;
         continue;
      }
      if (!std::isspace(c))
      {
         token += c;
      }
      else if (!token.empty())
      {
         if (isKeyword(token))
            std::cout << "'" << token << "' (keyword)\n";
         else if (std::isdigit(token[0]))
            std::cout << "'" << token << "' (number)\n";
         else
            std::cout << "'" << token << "' (identifier)\n";
         tokenCount++;
         token.clear();
      }
   }
   if (!token.empty())
   {
      if (isKeyword(token))
         std::cout << "'" << token << "' (keyword)\n";
      else if (std::isdigit(token[0]))
         std::cout << "'" << token << "' (number)\n";
      else
         std::cout << "'" << token << "' (identifier)\n";
      tokenCount++;
   }
   std::cout << "The number of tokens = " << tokenCount << std::endl;
   return 0;
}