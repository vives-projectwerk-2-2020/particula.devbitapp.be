# The Particula Firmware

[View the firmware GitHub repo](https://github.com/vives-projectwerk-2-2020/Particula-Firmware)

The Particula project is about a Smart Self-Sufficient Open Wireless Air Quality Sensor.
This IoT device makes use of a particle sensor, a Enviromental sensor (temperature, pressure, humidity) and LoRaWAN to transmit the data.

Take a look below to see what hardware you need (boards, sensors, modules)
to start building this project.

Hardware and software surely go hand in hand, so, to bring life to the hardware
of this project we present you, the firmware. Once you sourced the hardware
you can look below to see how to get the firmware up and running.

## The hardware

For development we used these two types of development boards:

- Nucleo L432KC
- Nucleo L476RG

With the following sensors/modules:

- RFM95W (LoRa)
- Bosch BME280 (temperature, pressure, humidity)
- SDS011 Particle sensor

The final hardware:

- [Solar panel with charge system](https://github.com/vives-projectwerk-2-2020/FinalSolarChargeSystem)
- [Prototype board with sensors](https://github.com/vives-projectwerk-2-2020/Prototype_Board_Niels.git)
- [LoRaWAN antanna board](https://github.com/vives-projectwerk-2-2020/LoRaWAN-antenna.git)

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
Have a look [here](../ttn/).

When this file is set up, connect your hardware and run the following command:

```PowerShell
mbed compile -f
```

## Pinout

### LoRaWAN + EEPROM Arduino compatible shield

We use the default pinmap of the shield, make sure the dip switches on the back
of the shield are configured correctly.

| Signal | Default pin              |
| ------ | ------------------------ |
| MOSI   | D11                      |
| MISO   | D12                      |
| CLK    | D13                      |
| NSS    | A0 (A3 on NUCLEO_L432KC) |
| RESET  | A1 (A4 on NUCLEO_L432KC) |
| DIO 0  | D2                       |
| DIO 1  | D3                       |

### BME280 (Temperature, Pressure, Humidity) Environmental sensor

| From | To  | Description                                 |
| ---- | --- | ------------------------------------------- |
| VDD  | 3V3 | power supply                                |
| GND  | GND | common ground                               |
| SDO  | GND | Selects 0X76 as the address on the I2C buss |
| CSB  | VDD | Selects I2C for communication               |
| SCK  | SCL | I2C bus clock                               |
| SDI  | SDA | I2C data bus                                |

SDA and SCK lines for the different development boards:
| Board         | SDA | SCK |
| ------------- | --- | --- |
| Nucleo_L432KC | D4  | D5  |
| Nucleo_L476RG | D14 | D15 |

### SDS011 (Particle) sensor

TX and RX lines for the different development boards:
| Board         | TX  | RX  |
| ------------- | --- | --- |
| Nucleo_L432KC | D1  | D0  |
| Nucleo_L476RG | A4  | A5  |

(remember to connect sensor-RX to nucleo-TX and vice versa)

For later implementation of the charge controller functionality the following
pins have been implemented:

| Pin 1 | Pin 2 | Pin 3 |
| ----- | ----- | ----- |
| D6    | D7    | D8    |

## What pins should I use with a different board

Choose UART RX and TX pins of your choice for the SDS011 particle sensor
and I2C SDA and SCK pins for the BME280 Environmental sensor.
You can add your board with it's preferred pins for serial communication
to the `target_overrides` section in the `mbed_app.json` file.

## TTN Payload Decoder Output Example

The payload decoder itself, needed to decode the transmitted message in TTN
(The Things Network) can be found in the `payload-decoder.js`
file in the firmware repository.

This is the form of the JSON object provided after the payload decoder did
it's work.

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

### LoRaWAN RFM95W Transceiver (SPI)

- [Mbed-Simple-LoRaWAN](https://github.com/sillevl/mbed-Simple-LoRaWAN)
- [AmbientSensorMessage](https://github.com/vives-projectwerk-2-2020/AmbiantSensorMessage)

### Bosch BME280 Environmental Sensor (I2C)

- [ParticulaTPH](https://github.com/vives-projectwerk-2-2020/ParticulaTPH)

### SDS011 Particle sensor (UART)

- [SDS011_Library](https://github.com/vives-projectwerk-2-2020/SDS011_Library)

### EEPROM (I2C)

We ended up not implementing the functionality from this driver but it's a
possible future addition.
It is setup to be able to store you LoRaWAN keys so this can be done in a batch.

- [EEPROM LoRaWAN Keys driver](https://github.com/vives-projectwerk-2-2020/EepromLoraWANKeys)
