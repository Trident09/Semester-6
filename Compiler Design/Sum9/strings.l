%{
#include <stdio.h>
int sum_of_digits(const char *str);
int count_sum_9 = 0;

%}

%%
[0-9]{4}  { if (sum_of_digits(yytext) == 9) {count_sum_9++ ; printf("Valid number: %s\n", yytext);}}
.|\n       { /* ignore other input */ }
%%

int sum_of_digits(const char *str) {
    int sum = 0;
    while(*str) {
        sum += *str - '0'; // Convert char digit to int and add to sum
        str++;
    }
    return sum;
}

int yywrap() { return 1; }

int main() {
    yylex();
    printf("Total number of strings whose digits add up to 9 : %d\n", count_sum_9);
    return 0;
}