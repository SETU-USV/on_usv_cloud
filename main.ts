microIoT.microIoT_MQTT_Event(microIoT.TOPIC.topic_1, function (RCMessage) {
    if (RCMessage.includes("RC1")) {
        RC1Info = RCMessage.split(":")[1].split("\"")[0].split(",")
        setArm = parseFloat(RC1Info[0].split("=")[1])
        TROT = parseFloat(RC1Info[1].split("=")[1])
        REVR = parseFloat(RC1Info[2].split("=")[1])
        REVR = parseFloat(RC1Info[3].split("=")[1])
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
        TROT = message
    }
    if (message.includes("STEER")) {
        led.plot(4, 4)
        STEER = message
    }
})
radio.onReceivedValue(function (name, value) {
    if (name == "temp") {
        microIoT.microIoT_SendMessage("{\"temp\":" + value + ",\"ispublic\":true}", microIoT.TOPIC.topic_0)
    }
})
let STEER = ""
let leftThrottle = ""
let rightThrottle = ""
let REVR = 0
let TROT = 0
let setArm = 0
let RC1Info: string[] = []
microIoT.microIoT_WIFI("Home Wi-Fi", "rggc7wts")
microIoT.microIoT_MQTT(
"9h1rq3Hf5cxTeQcb2yTYK3N6",
"m33rs3IoJWxT9eX01hoxTLIDfLtq3EWN",
"test/control",
microIoT.SERVERS.Global
)
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_1, "test/RCcontrol")
radio.setGroup(1)
basic.showIcon(IconNames.Heart)
basic.forever(function () {
    if (setArm == 1) {
    	
    }
})
