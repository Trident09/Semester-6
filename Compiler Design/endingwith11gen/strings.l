%option noyywrap

%{
#include <stdio.h>

// Function to generate and print all numbers up to 99999 ending with '11'
void generate_numbers_ending_with_11() {
    for (int i = 0; i < 100000; ++i) {
        if(i % 100 == 11) {
            printf("%05d\n", i);
        }
    }
}
%}

%%
.* ;

%%
int main() {
    generate_numbers_ending_with_11();
    return 0;
}