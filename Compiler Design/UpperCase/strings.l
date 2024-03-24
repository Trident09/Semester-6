%{
#include <stdio.h>
#include <string.h>
#include <ctype.h>

char *keywords[] = {"int", "float", "double", "char", "void", "if", "else", "while", "for", "switch", "case", "default", "break", "continue", "return"};
int num_keywords = sizeof(keywords) / sizeof(char *);

int is_keyword(char *word) {
    for (int i = 0; i < num_keywords; i++) {
        if (strcmp(word, keywords[i]) == 0) {
            return 1;
        }
    }
    return 0;
}
%}

%%
[a-zA-Z]+   {
                char word[256];
                strcpy(word, yytext);
                if (is_keyword(word)) {
                    for (int i = 0; word[i]; i++) {
                        word[i] = toupper(word[i]);
                    }
                    printf("%s ", word);
                } else {
                    printf("%s ", yytext);
                }
            }
[ \t]+      /* Ignore whitespace */
\n          printf("\n");
.           printf("%s", yytext);
%%

int yywrap() {
    return 1;
}

int main() {
    yylex();
    return 0;
}