import RPi.GPIO as GPIO
import argparse
from time import sleep

controle_pin = 17  

GPIO.setmode(GPIO.BCM)
GPIO.setup(controle_pin, GPIO.OUT)
GPIO.output(controle_pin, GPIO.LOW) 

def ativar_rele():
    GPIO.output(controle_pin, GPIO.LOW)

def desativar_rele():
    GPIO.output(controle_pin, GPIO.HIGH) 

def verificar_pino():
    estado = GPIO.input(controle_pin)
    if estado == GPIO.LOW:
        print("Relé está ativado - Energia passando")
    else:
        print("Relé está desativado - Energia interrompida")

def main():
    parser = argparse.ArgumentParser(description="Controla um relé para permitir/bloquear a passagem de energia")
    parser.add_argument("--reboot", action="store_true", help="abre e fecha a passagem de energia")
    parser.add_argument("--longo", action="store_true", help="abre e fecha a passagem de energia por 10seg")
    parser.add_argument("--verifica", action="store_true", help="Verifica o status do relé")
    args = parser.parse_args()

    if args.longo:
        desativar_rele()
        sleep(1)
        ativar_rele()

    if args.reboot:
        desativar_rele()
        sleep(1)
        ativar_rele()

    elif args.verifica:
        verificar_pino()

    else:
        print("Opção inválida")

    GPIO.cleanup()  

if __name__ == "__main__":
    main()