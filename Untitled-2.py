# Conceptos condicionales y loops

print("Dame una palabra")
palabra = input()
print("Dame un numero")
numero = int(input())
if numero == 1:
     print(len(palabra))
else:
    for index in range(numero):
        print(palabra)