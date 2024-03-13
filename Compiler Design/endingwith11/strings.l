%{
#include <stdio.h>

int count_ending_with_11 = 0;
%}

%%

.*11\n { count_ending_with_11++;   printf("Found a line ending with '11': %s", yytext); }
.|\n   { /* Ignore all other characters */ }

%%

int main(int argc, char **argv) {
    yylex();
    printf("Total number of lines ending with '11': %d\n", count_ending_with_11);
    return 0;
}

int yywrap() {
    return 1;
}
