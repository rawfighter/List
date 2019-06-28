control=True
f=open("nombres.txt","w")
while control:
    nombre=input("Dame un nombre")
    if(nombre == "salir"):
        control=False
    else:
        f.write(nombre+"\n")           
f.close()
print("Programa terminado")