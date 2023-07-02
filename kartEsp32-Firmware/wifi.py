def connect():
    import network
    # ssid = "Cardosal"
    ssid = "_0ad3ds3c"
    password = "*28129510*"
    station = network.WLAN(network.STA_IF)
    if station.isconnected() == True:
        print("Already connected")
        return

    station.active(True)
    station.connect(ssid, password)
    while station.isconnected() == False:
        pass
    print("Connection successful")
