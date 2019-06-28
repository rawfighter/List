#! Look for this file on folder where you loaded this file.
#! Demo of reading the file we just wrote
f2=open("myfile", "r") #! r+ read and write open
print(f2.readline()) #! reads one line
f2.close()
f3=open("myfile","r") #!r+ read and write open
print(f3.read()) #! reads quantity specified no param reads entire file
f3.close()