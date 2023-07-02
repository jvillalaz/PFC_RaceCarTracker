from machine import Pin, Timer
from time import sleep, ticks_ms
import urequests
motion = False
print('Microcontrollerslab.com')
URL_API = "http://192.168.1.13:3000"
timer0 = Timer(0)  # create as instance of the timer 0 of the esp
led = Pin(14, Pin.OUT)  # 22 number in is Output
carLed = Pin(2, Pin.OUT)  # 22 number in is Output
push_button = Pin(13, Pin.IN)  # 23 number pin is input
pir = Pin(27, Pin.IN)
currentCar = dict
counterLap = 0
initialLapTime = 0
startedRound = False



def getCurrent():
    global currentCar
    print('Buscando carro!')
    req = urequests.get(URL_API + "/track/current")
    if req.status_code == 200:
        res = req.json()
        currentCar = {
            "car": res[0]["car"]["_id"],
            "round": res[0]["round"]["_id"]
        }
        carLed.value(1)
        print(currentCar)


def registerLapTime(lapTime, currentCar):
    global counterLap
    lap = currentCar.copy()
    lap["time"] = lapTime
    req = urequests.post(URL_API + "/laptime/registerLap", json=lap)
    if req.status_code != 201:
        registerLapTime(lapTime, currentCar)
    else:
        print(req.json())
        if counterLap == 5:
            currentCar = dict
            carLed.value(0)



def handle_interrupt(pin):
    global counterLap
    global initialLapTime
    global motion
    global startedRound
    motion = True

    if counterLap < 5:
        if not startedRound:
            initialLapTime = ticks_ms()
            startedRound = True
            print('Bateria Iniciada!')
        else:
            lapTime = ticks_ms() - initialLapTime
            initialLapTime = ticks_ms()
            counterLap += 1
            lapTimeFormated = "{}:{}:{}".format((lapTime//(60000))%60, (lapTime//1000)%60, lapTime%1000)
            print("volta {}: {}".format(counterLap, lapTimeFormated))
            registerLapTime(lapTimeFormated,currentCar)




    # if counterLap == 0:
    #     initialLapTime = ticks_ms()
    #     counterLap += 1
    #     print("volta {}".format(counterLap))
    # elif counterLap < 5:
    #     currentMillis = ticks_ms()
    #     lapTime = (currentMillis - initialLapTime)
    #     print(lapTime)
    #     counterLap += 1
    #     print("volta {}: {}ms".format(counterLap, lapTime))
    # print(lapTime)

    # sleep(3)
    # total = ticks_ms()
    # print('Motion is detected!')

    # global interrupt_pin
    # interrupt_pin = pin


pir.irq(trigger=Pin.IRQ_RISING, handler=handle_interrupt)

while True:
    # distance = sensor.distance_cm()
    # print('Distance:', distance, 'cm')
    # sleep(1)
    # print(motion)
    # if motion:
    #     print('Motion detected! Interrupt caused by:')
    #     led.value(1)
    #     sleep(2)
    #     led.value(0)
    #     print('Motion stopped!')
    #     motion = False

    if motion:
        # print('Motion is detected!')
        led.value(1)
        sleep(1)
        # led.value(0)
        # print('Motion is stopped!')
        motion = False
    else:
        # led.value(1)  # led is on
        # sleep(1)  # delay of 1 second
        led.value(0)  # led is off
        # sleep(1)  # delay of 1 second

    logic_state = push_button.value()
    if logic_state == True:  # if pressed the push_button
        # led.value(1)  # led will turn ON
        getCurrent()
        # registerLapTime('2131312313',currentCar)

    # else:  # if push_button not pressed
    #     led.value(0)  # led will turn OFF
