from os import walk
mypath="Downloads\Compressed\DS4Windows"
f= []
for (dirpath, dirnames, filenames) in walk(mypath):
    for directorios in dirnames:
        print(directorios)
    for filename in filenames:
        print(filename)