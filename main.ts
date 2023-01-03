microIoT.microIoT_MQTT_Event(microIoT.TOPIC.topic_1, function (RCMessage) {
    if (RCMessage.includes("RC1")) {
        RC1Info = RCMessage.split(":")[1].split("\"")[0].split(",")
        setArm = parseFloat(RC1Info[0].split("=")[1])
        TROT = parseFloat(RC1Info[1].split("=")[1])
        REVR = parseFloat(RC1Info[2].split("=")[1])
        STEER = parseFloat(RC1Info[3].split("=")[1])
    }
    if (TROT == 0) {
        TROT = 90
    }
    if (STEER > 93) {
        Add_Right = 0 - (STEER - 90)
        Add_Left = STEER - 90
    } else if (STEER < 87) {
        Add_Left = 0 - (90 - STEER)
        Add_Right = 90 - STEER
    } else if (STEER >= 87 && STEER <= 93) {
        Add_Left = 0
        Add_Right = 0
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
microIoT.microIoT_WIFI("SSID", "PWD")
microIoT.microIoT_MQTT(
"MQTT_ID",
"MQTT_PWD",
"Channel/topic",
microIoT.SERVERS.Global
)
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_1, "Channel/topic")
radio.setGroup(1)
let toggle = 0
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (setArm == 1) {
        if (REVR == 0) {
            if (toggle == 0) {
                radio.sendValue("left", Math.constrain(TROT + Add_Left, 70, 110) + 1)
                toggle = 1
            } else {
                radio.sendValue("right", Math.constrain(TROT + Add_Right, 70, 110))
                toggle = 0
            }
        } else if (REVR == 1) {
            if (toggle == 0) {
                radio.sendValue("left", Math.constrain(180 - (TROT + Add_Left), 70, 110))
                toggle = 1
            } else {
                radio.sendValue("right", Math.constrain(180 - (TROT + Add_Right), 70, 110) - 1)
                toggle = 0
            }
        }
    }
})
