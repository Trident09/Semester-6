Compiler Design


Write a program to design a lexical analysier to recognise any 5 tokens.  //done
printf("hello world , %d");


Case study about any language compiler.
Write a lex program to recognise the following :
1. tokens over the alphabet (0-9).
2. set of all string ending with 11. //done
3. set of all strings with 3 consecutive 2s. //done
4. set of all strings such that the 10th symbol from right end is 1. //done
5. the set of all 4 digit numbers whose sum is 9.
6. the set of all 4 digit numbers whose individual digits are in ascending order from left to right. //done \
Implement the same using JFlex also.




Write a Lex program to recongnise floating point numbers.



for running the lex programs 
```
lex filename.l
gcc -o filename lex.yy.c -lfl
./filename
```
