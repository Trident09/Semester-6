%{
#include <stdio.h>

int count_with_222 = 0;
%}

%%

.*222 { count_with_222++;   printf("\nFound a line with '222': %s", yytext); }
.|\n   { /* Ignore all other characters */ }

%%

int main(int argc, char **argv) {
    yylex();
    printf("\nTotal number of lines with '222': %d\n", count_with_222);
    return 0;
}

int yywrap() {
    return 1;
}