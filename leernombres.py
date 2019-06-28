f2=open('nombres.txt',"r") #! r+ read and write open
valor= f2.readline()
while valor != "":
    print(valor) #! reads one line
    valor= f2.readline()
f2.close()