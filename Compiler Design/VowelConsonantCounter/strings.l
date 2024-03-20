%{
  int vowels = 0, consonants = 0;
%}

%%
[aeiouAEIOU]  { vowels++; }
[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z] { consonants++; }

%%

int main(int argc, char **argv) {
  printf("Enter text (Ctrl+D to end):\n");
  yylex();
  printf("\nNumber of vowels: %d\n", vowels);
  printf("Number of consonants: %d\n", consonants);
  return 0;
}

int yywrap() {
  return 1;
}