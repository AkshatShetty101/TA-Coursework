#include <stdio.h>
#include <stdlib.h>

char toUpper(char character)
{
    if(character >= 97 && character <= 122) 
    {
        return character - 32;
    }
    exit(EXIT_FAILURE);
}


char toLower(char character)
{
    if(character >= 65 && character <= 90) 
    {
        return character + 32;
    }
    exit(EXIT_FAILURE);
}

int main() 
{
    char c = 'z';
    printf("\n%c\n", toUpper(c));
    return 0;
}