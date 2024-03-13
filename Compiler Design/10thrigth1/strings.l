%{
#include <stdio.h>

int count_10th_from_right_is_1 = 0;
%}

%%

.*1.{9} { count_10th_from_right_is_1++;   printf("Found a line with '1' as 10th character from the right: %s", yytext); }
.|\n      { /* Ignore all other characters */ }

%%

int main(int argc, char **argv) {
    yylex();
    printf("\nTotal number of lines where the 10th character from the right is '1': %d\n", count_10th_from_right_is_1);
    return 0;
}

int yywrap() {
    return 1;
}