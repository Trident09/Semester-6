%{
#include <stdio.h>
%}

%option noyywrap

%%

%%

int main() {
    // This is not typical usage of Lex.
    // In practice, you would perform this action with a regular C program.
    for (int num = 222; num <= 9999999; num++) {
        // As a string to check with the regex
        char numStr[8];
        sprintf(numStr, "%d", num);

        // Check if "222" is in numStr
        if (strstr(numStr, "222") != NULL) {
            printf("%s\n", numStr);
        }
    }
    return 0;
}