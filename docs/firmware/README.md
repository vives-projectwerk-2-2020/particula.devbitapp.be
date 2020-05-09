# The Particula Firmware

[View the firmware GitHub repo](https://github.com/vives-projectwerk-2-2020/Particula-Firmware)

## Getting started

### Setting up the development environment

First of all you will need an development environment for Mbed OS.
Just pick the right installer for you're system [here](https://os.mbed.com/docs/mbed-os/v5.15/tools/installation-and-setup.html).

### Clone, install and flash the firmware

Next clone the project and install the dependencies.
Then setup your mbed development environment to compile the firmware and flash it:

```PowerShell
git clone git@github.com:vives-projectwerk-2-2020/Particula-Firmware.git
cd Particula-Firmware

mbed new .              // Create new mbed project and download mbed-os library
mbed deploy             // Install dependencies
mbed toolchain GCC_ARM  // Setting default toolchain (ARM, ARMC5, ARMC6, IAR, GCC_ARM)
mbed target detect      // Setting target to automatically detect connected device
```

Now have a look at the project.
You will see an `settings.example.h` in the `src/` directory.
This is a template, rename it to `settings.h` and add the following keys:
`devEui`, `appEui`, `appKey`.
(All of these keys can be retrieved from a TTN application.)

Need more information about how to setup or add your device to The Things Network?
Have a look [here](./TTN_README.md).

When this file is set up, connect your hardware and run the following command:

```PowerShell
mbed compile -f
```


## Pinout

### LoRaWAN + EEPROM Arduino compatible shield

We use the default pinmap of the shield,
make sure the dip switches on the back of the shield are configured correctly.

| Signal | Default pin
|--|--|
| MOSI | D11
| MISO | D12
| CLK | D13
| NSS | A0
| RESET | A1
| DIO 0 | D2
| DIO 1 | D3

On the NUCLEO_L432KC the A3 pin is used for NSS and A4 is used for RESET.

### BME280 (TPH) sensor

| From    | To       | Description         |
|------------|------------|---------------------|
| VDD        | 3V3        | power supply        |
| GND        | GND        | common ground       |
| SDO        | GND        | Selects 0X76 as the address on the I2C buss    |
| CSB        | VDD        | Selects I2C for communication
| SCK        | SCL        | I2C bus clock
| SDI        | SDA        | I2C data bus

SDA and SCK lines for the different development boards:
| Board     | SDA       | SCK       |
|-----------|-----------|-----------|
| Nucleo_L432KC | D4 | D5 |
| Nucleo_L476RG | D14 | D15 |

### SDS011 (Particle) sensor

TX and RX lines for the different development boards:
| Board     | TX     | RX      |
|-----------|-----------|-----------|
| Nucleo_L432KC | D1 | D0 |
| Nucleo_L476RG | A4 | A5 |

(remember to connect sensor-RX to nucleo-TX and vice versa)

### What pins should I use with a different board

Choose UART RX and TX pins of your choice for the SDS011 particle sensor
and I2C SDA and SCK pins for the BME280 TPH sensor.
You can add your board with it's preferred pins for serial communication to the
`target_overrides` section in the `mbed_app.json` file.

### Example `target_overrides` section

```json
"target_overrides": {
        "NUCLEO_L476RG": {
            "i2c_sda": "D14",
            "i2c_sck": "D15",
            "uart_tx": "A4",
            "uart_rx": "A5",
            "lora_nss": "A0",
            "lora_reset": "A1"
        },
        "NUCLEO_L432KC": {
            "i2c_sda": "D4",
            "i2c_sck": "D5",
            "uart_tx": "D1",
            "uart_rx": "D0",
            "lora_nss": "A3",
            "lora_reset": "A4"
        }
```

## TTN Payload Decoder Output Example

```javascript
{
  "hardwareStatus": {
    "BatteryIndicator": {
      "chargeComplete": true,
      "chargeStatus": true,
      "lowBattery": true,
      "timerTemperatureFault": true
    },
    "ParticleSensor": {
      "readSuccessful": true,
      "sleepSuccessful": true,
      "wakeUpSuccessful": true
    },
    "TphSensor": {
      "readSuccessful": true,
      "wakeUpSuccessful": true
    }
  },
  "humidity": 54.97,
  "pm10": 22.4,
  "pm25": 20.3,
  "pressure": 1007.5,
  "temperature": 16.18
}
```

## Used modules and libraries

### LoRaWAN RFM95W Transceiver (over ISP)

- [Mbed-Simple-LoRaWAN](https://github.com/sillevl/mbed-Simple-LoRaWAN)
- [AmbientSensorMessage](https://github.com/vives-projectwerk-2-2020/AmbiantSensorMessage)

### Bosch BME280 TPH Sensor (over I2C)

- [ParticulaTPH](https://github.com/vives-projectwerk-2-2020/ParticulaTPH)

### SDS011 Particel sensor (over UART)

- [SDS011_Library](https://github.com/vives-projectwerk-2-2020/SDS011_Library)

### EEPROM (over I2C)
