# Hardware

## Battery Charge System

## Description

This panel provide a charge system for charing the batteries via a solar cell.
It seems to be very easy to make this, but actually there comes a lot to play
in the game.
You'll read here how I made this PCB.

### Develop boards

I first started with some development boards. These PCB's are for sell on the web.
I got 3 boards, so I need to find out witch one was the best for our project.
In this table you'll see the difference between those development boards.

|Feature|Solar Charge Shield V2.2|Adafruit MCP73871|Sparkfun LiPo USB charger|
| -----------------|:------:|:-----:|:-------:|
| **Output disconect** | X  |    |    |
| **Short circuit protection** | X  | X   |   |
| **3W output power when connecting battery** | X    |   | X    |
| **Continious charge current**| X  | X | x  |
| **Battery status indication** | X   | X    |   |
| **Micro USB connection** | X   | X    | X    |
| **Load sharing** |  | X   |    |
| **Temperature monitoring**  |  | X    | X   |
| **Possible to add extra leds** |  | X   |  |
| **Lithium - Polymer batteries** |    | X   | X   |
| **Lithium - Ion batteries** | X   | X   | X   |

I worked together with my classmate Niels to find out with PCB was the best.
We came to a conclusion that the Adafruit board was the best for us.
So the next step was to find oud how it works and how we need to setup the prototype.

#### More information about the development board

#### Specifications

* 3.7V/4.2V Lithium Ion or Lithium Polymer battery charger
* Charge with 5-6V DC, USB or 6V solar panel!
* Automatic charging current tracking for high efficiency use of any wattage
solar panel
* Use any 6V solar panel
* Three color indicator LEDs - Power good, Charging and Done
* Low Battery Indicator (fixed at 3.1V) with LED output on (labeled CHRG)
* Set for 500mA max charge rate, can be adjusted from 50mA up to 1A by soldering
in a resistor
* Will always draw the most current possible from a solar cell- up to the max
charge rate!
* Smart load sharing automatically uses the input power when available, to keep
battery from constantly charging/discharging
* Temperature monitoring of battery by soldering in a 10K NTC thermistor
[thermistor](http://adafru.it/372) (not included) - suggested for outdoor projects
where the battery may get hot (50°C) or cold (0°C).

#### Indicator led's

* The red PWR LED indicates that there is good power connected to the charger.
If this LED is not lit, something is wrong with the power supply
* The orange CHRG LED indicates current charging status. When this LED is lit,
the charger is working to charge up a battery! It also acts as a low battery
indicator (fixed at 3.1V) when no power is connected. So, if you don't have
USB/Solar wired up, when the battery voltage drops below 3.1V, the orange LED
will come on.
* The green DONE LED is pretty easy to understand as well - when it's lit the
battery is charged up! Very handy for when you want to know that everything is done.

#### Extra features

* Load Sharing
* Temperature monitoring
* Adjusting the max charge current
* Adding external LEDs

This was quite easy.
In the picture below you'll see how is set this configuration up.

In the first pic it's the concept of the configuration.

![Concept configuration](./assets/BCS_AdafruitConceptConfig.png)

![Setup van prototype](./assets/BCS_AdafruitSetup.jpg)
![Indication leds](./assets/BCS_IndicationLed.jpg)

This system was well tested, so I did some measurements  to see how good it works.
You can see some pictures of the measurements below

#### Charge voltage

![Value of chargevoltage](./assets/BCS_ChargeVoltage.jpg)

As we can see, the batteries are supplied with a voltage of 4.3V. A Li-Ion battery
of 3.7V loads until it reaches 4.2V. You can see in the picture of the battery
voltage, that he isn't charged fully. So The charge current is maximum.

#### Charge current

![value of charge current](./assets/BCS_ChargeCurrent.jpg)

When the battery voltage raises, the charge current will go down. When 4.2V is
reached, the charge current is 0A.
So the current you see on the display, is near maximum.

#### Battery voltage

![value of battery voltage](./assets/BCS_BatteryVoltage.jpg)

The battery voltage is not high, the voltage will go to 4.2V.

#### solar panel voltage

![value of solar panel voltage](./assets/BCS_SolarPanelVoltage.jpg)

The solar panel provides a voltage of near 7V. This is quite high! In my own
PCB I'll need to protect my main IC from this high voltage.

## Our own design

### Description of my own design

I used the development boards to look for some inspiration, so I could (easily)
make my own design. I started with a prototype, and I'll explain how this works.

### Schematic

![schematic prototype](./assets/BCS_SchematicPrototype.png)

#### Description of the schematic

This is the prototype schematic with actually some bugs in it.
The first IC (MCP73871) manages the battery. This was the same IC of the
development board. He'll keep track on the charge current and voltage. When the
battery is charged, the charge current will be 0 because this IC will drop it down.
There is also a possibility to get some information via the PG, STAT1, STAT2 pins.
These aren't provided here, but in the final PCB it does. This IC takes the
voltage from the solar panel and have's an output of 4.3V.

The second IC is a battery management IC too, this will cause problems. You'll
see in the final PCB that this IC is deleted. In first place I thought that it
was necessary to provide a protection circuit for the battery. But the MCP73871
haves already this functionality. So I will discuss my problems later in this
document, and will explain there what went wrong.

The other components are some interfacing for these IC's.

### Board

![board prototype ](./assets/BCS_BoardPrototype.png)
![board prototype with polygon](./assets/BCS_BoardPrototypePoly.png)

#### Description of the board

The next step was to draw the board. This is quite easy. The first picture is
the schematic witout polygon, the second one is the PCB with polygon. We let
these PCB's made in Japan. Via [JLCPCB](http://JLCPCB.com). Then we bought our
components by Farnell for fast shipping. When we got all components and boards,
we could start soldering. Me and my colleagues are used to solder, so this
wasn't any problem for us.

In this pic you'll see the unsoldered and soldered PCB

![manufactured pcb](./assets/BCS_PrototypePCB.png)

### Description of the final design

You can find here the link to the GitHub repo of the schematic, board and partlist.
[GitHub repo final design](https://github.com/vives-projectwerk-2-2020/FinalSolarChargeSystem)

### Final Schematic

![final schematic](./assets/BCS_FinalSchematic.png)

#### Description of the final schematic

As you can see here, the other IC's are removed. This because they have the same
functionality as the MCP73871. I placed a voltage regulator before the IC, this
is because you can have a max voltage of 6V on the IC, and the solar panel
provides 6+V.
Here I brought the STAT1, STAT2 and PG pins outside, so we can manage the battery
on the Nucleo.
This PCB will fit on the main PCB (See Niels his documents).

### Final Board

![final board](./assets/BCS_FinalBoard.png)
![final board with polygon](./assets/BCS_FinalBoardPoly.png)

#### Description of the final Board

There is not so much to tell about it, here to, just draw the wires.
We couldn't order these PCB's because of the COVID-19 pandemic.

## Tests

When we had the prototype PCB, we soldered them, and then we need to test if they
really work.

When I tested the PCB without a battery connected, the charge voltage was 4.2V.
This was really good, that worked. But when I attached a battery, the system
falls down after 2 minutes. So is started looking for the problem. And as you
could see, there is a difference between the prototype PCB and the final PCB.
1 IC in stead of 3. This was because the MCP73871 have same functionality of all
those other IC's. So I don't need them. What was the source of the problem? Well,
the MCP73871 checked the battery status, but he actually checked the MCP83833
and this IC wasn't a battery, so the MCP73871 shuts down because he thought that
te battery was fully charged.
When scratching away the wire tot the MCP83833, the PCB worked like it need to be!

After this, is started a duration test. I made a setup with a Arduino UNO to
have a current taken away from the battery.
The charge PCB was still connected to the batteries.
The setup have been outside for 3 - 4 weeks, day and night.
In the picture below, you'll see the setup I made.

![duration setup](./assets/BCS_DurationSetup.jpg)
![outdoor config](./assets/BCS_OutdoorConfig.jpg)

I went daily for a measurement of the PCB. I measured the voltage of the solar
panel, IC input, IC output, battery voltage and charge current.
|Measurement    | Value         |
|---------------|---------------|
|Solar panel    |6,8V           |
|IC input       |5V             |
|IC output      |4,2V           |
|Battery voltage|3V - 4.2V      |
|charge current |0mA - 100mA    |

The charge current depends on the weather. When it is a nice day, you'll reach
higher current measurements. The charge current depends on the battery voltage
too. When the battery voltage reaches 4.2V, the current will drop town to 0.

How I did these measurements, can be found in mij Youtube video.

## Links

* [MCP73871 datasheet](http://adafru.it/aMO)
* [Fritzing object in Adafruit Fritzing library](http://adafru.it/aP3)
* [EagleCAD Board / Layout & Schematic files on Github](http://adafru.it/aMP)

## Antenna

## main pcb
