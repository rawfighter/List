control=True
f=open("persona.csv","w")
f.write("Nombre"+","+"Edad" +"\n")
while control:
    nombre=input("Dame un nombre")
    if(nombre == "salir"):
        control=False
    else:
        edad = input("Dame una edad?")
        f.write(nombre+ ","+ edad + "\n")           
f.close()
print("Programa terminado")