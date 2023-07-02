from machine import Pin, Timer
from time import sleep, ticks_ms
motion = False
print('Microcontrollerslab.com')
URL_API = "http://localhost:3000"
timer0 = Timer(0)  # create as instance of the timer 0 of the esp
led = Pin(14, Pin.OUT)  # 22 number in is Output
carLed = Pin(2, Pin.OUT)  # 22 number in is Output



while True:
    carLed.value(1)
    print('funfouqweq')

    sleep(1)
    carLed.value(0)
    print('funfou')
    sleep(1)

