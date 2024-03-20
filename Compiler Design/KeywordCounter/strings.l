%{
#include <stdio.h>

int identifiers = 0;
int keywords = 0;
int digits = 0;

void countToken(const char *type);
%}

%%

"int"|"float"|"double"|"char"|"return"|"if"|"else"|"while"|"for"        { countToken("keyword"); }
[a-zA-Z_][a-zA-Z0-9_]*                                                  { countToken("identifier"); }
[0-9]+                                                                  { countToken("digit"); }
[\t\n ]+                                                                { /* ignore whitespace */ }
.                                                                       { /* ignore other characters */ }

%%

int main(int argc, char **argv) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        return 1;
    }

    FILE *file = fopen(argv[1], "r");
    if (!file) {
        perror("Error opening file");
        return 1;
    }

    yyin = file;
    yylex();
    fclose(file);

    printf("Identifiers: %d\n", identifiers);
    printf("Keywords: %d\n", keywords);
    printf("Digits: %d\n", digits);

    return 0;
}

void countToken(const char *type) {
    if (strcmp(type, "identifier") == 0) {
        identifiers++;
    } else if (strcmp(type, "keyword") == 0) {
        keywords++;
    } else if (strcmp(type, "digit") == 0) {
        digits++;
    }
}