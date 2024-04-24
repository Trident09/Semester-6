Compiler Design


- Write a program to design a lexical analyser to recognise any 5 tokens.  //done
    ```c
    printf("hello world , %d");
    ```


- Case study about any language compiler.

Write a lex program to recognise the following :
1. tokens over the alphabet (0-9). -- same as above //done
2. set of all strings ending with 11. //done
3. Set all strings with 3 consecutive 2s. //done
4. set of all strings such that the 10th symbol from right end is 1. //done
5. the set of all 4 digit numbers whose sum is 9. //done
6. the set of all 4-digit numbers whose individual digits are in ascending order from left to right. //done
7. the set of all floating point numbers. //done
- Implement the same using JFlex also. if possible.

20 March 2024

1. Write a lex program to count the number of words in a text file. //done
2. Write a lex program to identify keywords and convert it into upper-case. //done
3. Write a lex program to count the number of vowels and consonants. //done
4. Write a lex to count the number of identifiers, keywords and digits. //done

- Write a lex program to generate all strings of length seven strings containing 3 consecutive 2 //done (RUPAM)
- Write a lex program to generate all strings till length 5 ending with 11. //done (KUSHAGRA)



for running the lex programs 
```cmd
cd Directory_name
cp ../lex.cc.y .
flex filename.l
gcc -o filename lex.yy.c -lfl
./filename
```

24 March 2024
1. Using JFLAP, implement :
    - desing a dfa , nfa , for any general language.
        - ε = {a,b}
        - Design DFA for the following : 

            -  L1 = aⁿbᵐ | n,m ≥ 0
            -  L2 = { w : | w | mod3 = 0 }
            -  L3 = aⁿb | n ≥ 0
            -  L4 = ab* (a+b)*    -     All strings with prefix ab 
        - design dfa for a given regex.
    - Construct a NFA that accepts set of strings with : 
        - Exactly one 'a'
        - Atleast one 'a'
        - No more than 3 'a'
        - Atleast 1 'a' and 2 'b'
        - Exactly 2 'a' and more than 2 'b'
2. write a cpp program to find the first and follow for all the non terminal present in the gramar.