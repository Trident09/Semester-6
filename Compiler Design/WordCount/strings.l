%{
int word_count = 0;
%}

%%

[a-zA-Z]+   { word_count++; }

\n          { /* you can count lines here if you want to */ }

.           { /* ignore other characters */ }

%%

int main(int argc, char **argv) {
    yylex();
    printf("The number of words is: %d\n", word_count);
    return 0;
}

int yywrap(void) {
    return 1; // Returning 1 indicates that there's no more input
}