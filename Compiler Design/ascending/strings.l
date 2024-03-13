%{
#include <stdio.h>

int count_ascending = 0;

int check_ascending(char *num) {
    for(int i = 0; i < 3; ++i) {
         if(num[i] >= num[i+1]) {
             return 0;
         }
    }
    return 1;
}

%}

%%

[0-9]{4}   { if (check_ascending(yytext)) { count_ascending++; printf("Found an ascending number: %s\n", yytext); } }
.|\n { /* Ignore all other characters */ }

%%

int main(int argc, char **argv) {
    yylex();
    printf("Total number of ascending 4 digit numbers: %d\n", count_ascending);
    return 0;
}

int yywrap() {
    return 1;
}
