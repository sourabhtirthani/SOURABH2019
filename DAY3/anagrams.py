"""
Two words are anagrams if you can rearrange the letters of one to spell the second.  
For example, the following words are anagrams:

 ['abets', 'baste', 'bates', 'beast', 'beats', 'betas', 'tabes']

Hint: How can you tell quickly if two words are anagrams?  
Dictionaries allow you to find a key quickly.  

"""


str1=input("Enter first string")
str2=input("Enter second string")
count=0

if len(str1)==len(str2):
    for i in str1:
        if i in str2:
            count=count+1
            continue
        else:
            print("not panagrma")
            
    if count==len(str1):
        print("True")
    
else:
    print("False")
        
        