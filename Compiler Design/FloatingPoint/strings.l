%{
#include <stdio.h>
int count = 0;
%}

digit       [0-9]
opt_sign    [-+]?
exp_part    ([eE]{opt_sign}{digit}+)
number      ({opt_sign}{digit}*"."{digit}+{exp_part}?)|({opt_sign}{digit}+"."{digit}*{exp_part}?)

%%
{number} { count++; printf("Found floating-point number: %s\n", yytext); }
%%

int main(int argc, char **argv) {
    yylex();
    printf("\nTotal number of floating-point numbers found: %d\n", count);
    return 0;
}

int yywrap(void) {
    return 1;
}