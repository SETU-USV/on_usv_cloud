microIoT.microIoT_MQTT_Event(microIoT.TOPIC.topic_1, function (RCMessage) {
    if (RCMessage.includes("RC1")) {
        RC1Info = RCMessage.split(":")[1].split("\"")[0].split(",")
        setArm = parseFloat(RC1Info[0].split("=")[1])
        TROT = parseFloat(RC1Info[1].split("=")[1])
        REVR = parseFloat(RC1Info[2].split("=")[1])
        STEER = parseFloat(RC1Info[3].split("=")[1])
    }
    if (setArm == 1) {
        if (REVR == 0) {
            if (STEER > 90) {
                Add_Right = STEER - 90
                Add_Left = 0 - (STEER - 90)
            } else if (STEER < 90) {
                Add_Left = 90 - STEER
                Add_Right = 0 - (90 - STEER)
            }
            radio.sendValue("right", Math.constrain(TROT + Add_Right, 60, 120))
            serial.writeLine("Right" + Math.constrain(TROT + Add_Right, 60, 120))
            radio.sendValue("left", Math.constrain(TROT + Add_Left, 60, 120))
            serial.writeLine("Left" + Math.constrain(TROT + Add_Left, 60, 120))
        } else if (REVR == 1) {
            radio.sendValue("right", 180 - (TROT + Add_Right))
            serial.writeLine("Right" + (180 - (TROT + Add_Right)))
            radio.sendValue("left", 180 - (TROT + Add_Left))
            serial.writeLine("Left" + (180 - (TROT + Add_Left)))
        }
    }
})
microIoT.microIoT_MQTT_Event(microIoT.TOPIC.topic_0, function (message) {
    if (message.includes("arm")) {
        setArm = parseFloat(message.split(":")[1].split(",")[0])
    }
    if (message.includes("RT")) {
        led.plot(0, 0)
        rightThrottle = message
    }
    if (message.includes("LT")) {
        led.plot(4, 4)
        leftThrottle = message
    }
    if (message.includes("TROT")) {
        led.plot(4, 4)
    }
    if (message.includes("STEER")) {
        led.plot(4, 4)
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "temp") {
        microIoT.microIoT_SendMessage("{\"temp\":" + value + ",\"ispublic\":true}", microIoT.TOPIC.topic_0)
    }
})
let leftThrottle = ""
let rightThrottle = ""
let Add_Left = 0
let Add_Right = 0
let STEER = 0
let REVR = 0
let TROT = 0
let setArm = 0
let RC1Info: string[] = []
microIoT.microIoT_WIFI("Home Wi-Fi", "rggc7wts")
microIoT.microIoT_MQTT(
"u335T3QEEsEjumREZqdmRrKD",
"YDNdRDprfQrpYYGid7v0ontAsL3j9GXF",
"test/control",
microIoT.SERVERS.Global
)
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_1, "test/RCcontrol")
radio.setGroup(1)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
	
})
