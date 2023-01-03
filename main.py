def on_microiot_mqtt_topic_0(message):
    basic.show_icon(IconNames.YES)
    if message.includes("RT"):
        led.plot(0, 4)
        radio.send_value("right",
            Math.round(parse_float(message.split(":")[1].split(",")[0])))
    if message.includes("LT"):
        led.plot(4, 0)
        radio.send_value("left",
            Math.round(parse_float(message.split(":")[1].split(",")[0])))
microIoT.microIoT_MQTT_Event(microIoT.TOPIC.TOPIC_0, on_microiot_mqtt_topic_0)

def on_button_pressed_a():
    microIoT.microIoT_SendMessage("{\"data\":29.2,\"ispublic\":true}", microIoT.TOPIC.TOPIC_0)
input.on_button_pressed(Button.A, on_button_pressed_a)

microIoT.microIoT_WIFI("SSID", "PWD")
microIoT.microIoT_MQTT("MQTT_SSID",
    "MQTT_PWD",
    "Channel/Topic",
    microIoT.SERVERS.GLOBAL)
radio.set_group(1)
basic.show_icon(IconNames.HEART)

def on_forever():
    pass
basic.forever(on_forever)
