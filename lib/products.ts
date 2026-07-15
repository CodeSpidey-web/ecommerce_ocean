import { Product, Testimonial, FAQItem } from '../types';

export function formatPrice(price: number): string {
  return '₹' + price.toLocaleString('en-IN');
}

export interface Tutorial {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
  excerpt: string;
}

export interface TechnicalVideo {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: string;
}

export const products: Product[] = [
  {
    id: 'arduino-uno-r4-minima',
    name: 'Arduino UNO R4 Minima',
    brand: 'Arduino',
    category: 'Development Boards',
    price: 1850,
    oldPrice: 2200,
    discount: 16,
    rating: 4.8,
    reviewsCount: 142,
    stock: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop'
    ],
    sku: 'ARD-UNO-R4-MIN',
    datasheet: 'https://docs.arduino.cc/resources/datasheets/ABX00080-datasheet.pdf',
    description: 'The Arduino UNO R4 Minima brings the power of a 32-bit Renesas RA4M1 microcontroller to the classic UNO form factor. Featuring an ARM Cortex-M4 processor running at 48 MHz, 256KB Flash, and 32KB SRAM, it is perfect for physical AI and prototyping.',
    specifications: {
      'Microcontroller': 'Renesas RA4M1 (ARM Cortex-M4)',
      'Operating Voltage': '5V',
      'Input Voltage': '6V - 24V',
      'Digital I/O Pins': '14 (6 PWM)',
      'Analog Input Pins': '6',
      'DAC': '1 (12-bit)',
      'Clock Speed': '48 MHz',
      'Interface': 'USB-C',
    },
    features: [
      '32-bit Renesas RA4M1 ARM Cortex-M4 operating at 48 MHz clock speed',
      '256 KB Flash and 32 KB SRAM for complex embedded firmware',
      'Supports PWM, I2C, SPI, UART, and 12-bit analog output DAC',
      'USB-C connector with faster data sync and higher current rating'
    ],
    warranty: '1-Year Arduino Official Warranty',
    deliveryInfo: 'Dispatched within 24 hours with tamper-proof ESD packaging.'
  },
  {
    id: 'raspberry-pi-5',
    name: 'Raspberry Pi 5 Single Board Computer (8GB)',
    brand: 'Raspberry Pi',
    category: 'Development Boards',
    price: 7650,
    oldPrice: 8500,
    discount: 10,
    rating: 4.9,
    reviewsCount: 320,
    stock: 'In Stock',
    images: [
      '/Raspberry%20Pi%205%20Single%20Board%20Computer%20(8GB).jpg',
      '/Raspberry%20Pi%205%20Single%20Board%20Computer%20(8GB).jpg'
    ],
    sku: 'RPI5-8GB',
    datasheet: 'https://datasheets.raspberrypi.com/rpi5/raspberry-pi-5-datasheet.pdf',
    description: 'The latest generation Raspberry Pi 5 features a 2.4GHz quad-core 64-bit Arm Cortex-A76 processor, delivering 2-3x the CPU performance of Raspberry Pi 4. Paired with 8GB LPDDR4X RAM, dual 4K micro-HDMI outputs, and a PCIe 2.0 interface for SSD compiling.',
    specifications: {
      'Processor': 'Broadcom BCM2712 Quad-core ARM A76 (2.4GHz)',
      'Memory': '8GB LPDDR4X-4267 SDRAM',
      'Operating Voltage': '5V DC via USB-C (5A recommended)',
      'Display Output': 'Dual micro-HDMI (4K at 60Hz)',
      'Connectivity': 'Dual-band Wi-Fi, Bluetooth 5.0, Gigabit Ethernet',
      'Interfaces': '2x USB 3.0, 2x USB 2.0, PCIe 2.0 x1, 40-pin GPIO',
      'Board Type': 'Single Board Computer',
      'Communication Protocol': 'I2C, SPI, UART, PCIe',
      'Operating Temperature': '0°C to 50°C',
      'Package Type': 'SBC Board',
      'Application': 'Embedded Systems, IoT, Edge AI',
      'Industry': 'Industrial Automation, Makers'
    },
    features: [
      'In-house built RP1 I/O controller chip manages peripherals dynamically',
      'PCIe 2.0 connector enables connecting high-speed NVMe M.2 SSD drives',
      'Real-Time Clock (RTC) connector for offline chronological precision tracking',
      'Onboard power button for safe software shutdowns and boots'
    ],
    warranty: '1-Year Raspberry Pi Brand Warranty',
    deliveryInfo: 'Fast dispatch from India warehouse. Secure anti-static packaging.'
  },
  {
    id: 'esp32-devkit-v1',
    name: 'ESP32 WROOM DevKit V1 IoT Board',
    brand: 'Espressif',
    category: 'IoT Modules',
    price: 350,
    oldPrice: 450,
    discount: 22,
    rating: 4.7,
    reviewsCount: 412,
    stock: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop'
    ],
    sku: 'ESP32-DEV-V1',
    datasheet: 'https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32d_esp32-wroom-32u_datasheet_en.pdf',
    description: 'A powerful ESP32-based development board offering integrated WiFi, Bluetooth Low Energy (BLE), and a dual-core Xtensa 32-bit LX6 processor. Running at 240MHz, it is the ultimate microchip for budget IoT, cloud integrations, and sensor logging.',
    specifications: {
      'Processor': 'Tensilica Xtensa Dual-Core 32-bit LX6 (240MHz)',
      'Memory': '520KB SRAM, 4MB Flash',
      'Operating Voltage': '3.3V (5V micro-USB input)',
      'Wireless Connectivity': 'Wi-Fi 802.11 b/g/n & Bluetooth v4.2 BR/EDR/BLE',
      'GPIO Pins': '25 with PWM, ADC, DAC, and capacitive touch',
      'Board Type': 'Microcontroller',
      'Communication Protocol': 'I2C, SPI, UART, Wi-Fi, BLE',
      'Operating Temperature': '-40°C to 85°C',
      'Package Type': 'DIP / Module',
      'Application': 'Smart Home, IoT Telemetry, Web Server',
      'Industry': 'Home Automation, Agriculture'
    },
    features: [
      'Ultra-low power co-processor lets you monitor sensors in deep sleep mode',
      'Integrated PCB antenna provides stable wireless range up to 100 meters',
      'Fully compatible with Arduino IDE, ESP-IDF, and MicroPython firmware packages',
      'Onboard CP2102 USB-to-UART bridge for simple programming interface'
    ],
    warranty: '6-Months Replacement Warranty for manufacturing defects',
    deliveryInfo: 'Ships same day. Order online. GST-compliant invoice.'
  },
  {
    id: 'stm32-blue-pill',
    name: 'STM32F103C8T6 Blue Pill Board',
    brand: 'STMicroelectronics',
    category: 'Development Boards',
    price: 290,
    oldPrice: 380,
    discount: 23,
    rating: 4.6,
    reviewsCount: 189,
    stock: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=600&auto=format&fit=crop'
    ],
    sku: 'STM32-F103-BP',
    datasheet: 'https://www.st.com/resource/en/datasheet/stm32f103c8.pdf',
    description: 'The STM32 Blue Pill is a low-cost ARM Cortex-M3 development board that outperforms traditional 8-bit AVR boards. It runs at 72 MHz, features 64KB Flash memory, and is highly favored by embedded engineers looking for professional register-level programming.',
    specifications: {
      'Core': 'ARM Cortex-M3 32-bit RISC',
      'Clock Speed': '72 MHz',
      'Operating Voltage': '3.3V',
      'Analog Inputs': '10 Channels (12-bit ADC)',
      'USB': 'USB 2.0 Full-Speed interface',
      'Board Type': 'Microcontroller',
      'Communication Protocol': 'I2C, SPI, UART, CAN, USB',
      'Operating Temperature': '-40°C to 85°C',
      'Package Type': 'DIP Board',
      'Application': 'Motor Control, Real-Time Compiling, Robotics',
      'Industry': 'Automotive, Industrial Automation'
    },
    features: [
      'ARM Cortex-M3 processor features nested vector interrupt controller (NVIC)',
      'Supports hardware debugging via Serial Wire Debug (SWD) port interface',
      'Onboard 8 MHz and 32.768 kHz RTC quartz crystal oscillators',
      'Rich set of timer units: 16-bit PWM, motor control timers, and watchdogs'
    ],
    warranty: 'N/A (Hobby Grade Component)',
    deliveryInfo: 'Wrapped in ESD protective shield. Standard delivery in 3 days.'
  },
  {
    id: 'teensy-41-maker',
    name: 'Teensy 4.1 Development Board',
    brand: 'Teensy',
    category: 'Development Boards',
    price: 3850,
    oldPrice: 4200,
    discount: 8,
    rating: 4.9,
    reviewsCount: 78,
    stock: 'Low Stock',
    images: [
      '/Teensy%204.1%20Development%20Board.jpg'
    ],
    sku: 'TEENSY-41-DEV',
    datasheet: 'https://www.pjrc.com/teensy/datasheet41.pdf',
    description: 'The Teensy 4.1 features an ARM Cortex-M7 processor running at 600 MHz, making it the fastest microcontroller available today. It includes an Ethernet PHY port, microSD card socket, and USB host port, built for real-time DSP audio compilation, automation, and flight controls.',
    specifications: {
      'Processor': 'ARM Cortex-M7 (600 MHz with FPU)',
      'Memory': '7936KB Flash, 1024KB RAM',
      'Operating Voltage': '3.3V (5V tolerant pins)',
      'Ethernet': '10/100 Mbit DP83825 PHY support',
      'Card Slot': 'Onboard MicroSD socket',
      'Board Type': 'Microcontroller',
      'Communication Protocol': 'I2C, SPI, UART, CAN, USB Host, Ethernet',
      'Operating Temperature': '-20°C to 85°C',
      'Package Type': 'DIP Module',
      'Application': 'DSP Audio, Industrial CAN Logging, Flight Control',
      'Industry': 'Aerospace, Academic Research'
    },
    features: [
      'Dynamic speed scaling allows over-clocking beyond 600 MHz safely',
      'Hardware floating-point unit (FPU) executes 64-bit double precision math',
      'USB Host interface allows direct connections to keyboards, MIDI, and hubs',
      'Onboard cryptosecure random number generator module'
    ],
    warranty: '1-Year Manufacturer Warranty by PJRC',
    deliveryInfo: 'Express courier delivery. Free technical support.'
  },
  {
    id: 'hc-sr04-ultrasonic',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    brand: 'Cytron',
    category: 'Sensors',
    price: 120,
    oldPrice: 180,
    discount: 33,
    rating: 4.5,
    reviewsCount: 304,
    stock: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop'
    ],
    sku: 'SEN-HCSR04-D',
    datasheet: 'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf',
    description: 'The HC-SR04 is an economical ultrasonic non-contact distance measurement sensor. Offering 2cm to 400cm range, it uses high-frequency acoustics to detect objects in front of mobile robots, obstacle avoidance vehicles, and level measurement setups.',
    specifications: {
      'Operating Voltage': '5V DC',
      'Operating Current': '15mA',
      'Ranging Distance': '2 cm - 400 cm',
      'Measuring Angle': '15 degrees',
      'Trigger Input Signal': '10µs TTL pulse',
      'Sensor Type': 'Ultrasonic',
      'Communication Protocol': 'GPIO (Trigger/Echo)',
      'Operating Temperature': '0°C to 70°C',
      'Package Type': 'Module',
      'Application': 'Obstacle Avoidance, Distance Monitoring',
      'Industry': 'Education, Hobbyist'
    },
    features: [
      'Requires only two GPIO pins (one for Trigger and one for Echo)',
      'Compact PCB footprint is easy to mount on servo brackets',
      'High accuracy reading up to 3mm resolution grids',
      'Low power draw allows connection directly to microcontroller pins'
    ],
    warranty: 'N/A (Hobby Grade)',
    deliveryInfo: 'Standard dispatch. Anti-static bubble bag packaging.'
  },
  {
    id: 'dht22-temp-humidity',
    name: 'DHT22 AM2302 Precision Temp/Humidity Sensor',
    brand: 'Adafruit',
    category: 'Sensors',
    price: 290,
    oldPrice: 390,
    discount: 25,
    rating: 4.6,
    reviewsCount: 224,
    stock: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop'
    ],
    sku: 'SEN-DHT22-AM',
    datasheet: 'https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf',
    description: 'The DHT22 (AM2302) is a basic, low-cost digital temperature and humidity sensor. It uses a capacitive humidity sensor and a thermistor to measure the surrounding air, sending out a digital signal on the data pin (no analog input pins needed).',
    specifications: {
      'Operating Voltage': '3.3V - 5V',
      'Humidity Range': '0% - 100% RH (±2% accuracy)',
      'Temperature Range': '-40°C to 80°C (±0.5°C accuracy)',
      'Sampling Rate': '0.5 Hz (every 2 seconds)',
      'Sensor Type': 'Temperature & Humidity',
      'Communication Protocol': '1-Wire Digital Bus',
      'Operating Temperature': '-40°C to 80°C',
      'Package Type': 'Module / Through-Hole',
      'Application': 'Weather Stations, Climate Control, Greenhouse',
      'Industry': 'Agriculture, HVAC'
    },
    features: [
      'Comes with a pull-up resistor and filter capacitor on select breakout boards',
      'Long-term stability and high reliability under humid environments',
      'Digital signal transmission up to 20 meters line distance',
      'Extremely accurate temperature readouts with 0.1-degree resolution'
    ],
    warranty: '3-Months Store Warranty',
    deliveryInfo: 'Packaged with 4-pin row connector header.'
  },
  {
    id: 'mpu6050-gyro-accel',
    name: 'MPU6050 6-DOF IMU Sensor Breakout',
    brand: 'SparkFun',
    category: 'Sensors',
    price: 190,
    oldPrice: 280,
    discount: 32,
    rating: 4.7,
    reviewsCount: 198,
    stock: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=600&auto=format&fit=crop'
    ],
    sku: 'SEN-MPU6050-IMU',
    datasheet: 'https://invensense.tdk.com/wp-content/uploads/2015/02/MPU-6000-Datasheet1.pdf',
    description: 'The MPU6050 is a popular 6-axis MotionTracking device that combines a 3-axis gyroscope and a 3-axis accelerometer. It features an onboard Digital Motion Processor (DMP) that filters complex sensor fusion calculations off-chip to provide clean angles via I2C.',
    specifications: {
      'Operating Voltage': '3V - 5V (Onboard LDO regulator)',
      'Gyro Range': '±250, ±500, ±1000, ±2000 °/s',
      'Accel Range': '±2g, ±4g, ±8g, ±16g',
      'Interface': 'Standard I2C protocol',
      'Sensor Type': 'IMU (6-Degrees of Freedom)',
      'Communication Protocol': 'I2C',
      'Operating Temperature': '-40°C to 85°C',
      'Package Type': 'Module (GY-521)',
      'Application': 'Self-Balancing Robots, Drone Stabilizers, VR Tracking',
      'Industry': 'Consumer Tech, Drones'
    },
    features: [
      'Onboard Digital Motion Processor (DMP) runs advanced motion fusion calculations',
      'Includes programmable interrupts for wake-on-motion and gesture detection',
      'Extremely small footprint is perfect for mounting on flight controller frames',
      'Onboard LED power indicator shows communication readiness'
    ],
    warranty: '6-Months replacement for manufacturing defects',
    deliveryInfo: 'Includes straight and right-angle header pins.'
  },
  {
    id: 'nema17-stepper-motor',
    name: 'NEMA 17 Stepper Motor 1.8° 40Ncm',
    brand: 'Pololu',
    category: 'Robotics',
    price: 850,
    oldPrice: 1100,
    discount: 22,
    rating: 4.8,
    reviewsCount: 165,
    stock: 'In Stock',
    images: [
      '/NEMA%2017%20Stepper%20Motor%201.8%C2%B0%2040Ncm.jpg'
    ],
    sku: 'MOT-NEMA17-40',
    datasheet: 'https://www.pololu.com/file/0J799/NEMA17-stepper-motor-datasheet.pdf',
    description: 'High-torque NEMA 17 hybrid stepper motor, ideal for 3D printers, CNC routers, and heavy-duty robotic platforms. Provides 40 Ncm holding torque, operating at 1.5A per phase, with standard 4-wire connection.',
    specifications: {
      'Step Angle': '1.8 degrees (200 steps/rev)',
      'Holding Torque': '40 Ncm (56.6 oz.in)',
      'Rated Current': '1.5 A/phase',
      'Phase Resistance': '1.5 Ohms',
      'Shaft Diameter': '5 mm (D-shape)',
      'Motor Type': 'Bipolar Stepper',
      'Communication Protocol': '4-Wire Phase coil',
      'Operating Temperature': '-10°C to 50°C',
      'Package Type': 'Frame NEMA 17',
      'Application': 'CNC Routers, 3D Printers, Linear Rails',
      'Industry': '3D Printing, Manufacturing'
    },
    features: [
      'D-shaped motor shaft prevents coupler slippage under heavy industrial load',
      'Comes with a 1-meter detachable connection cable with JST-XH connector',
      'Precision step angle tolerance of ±5% ensures micro-stepping reliability',
      'High efficiency winding minimizes thermal footprint during holding cycles'
    ],
    warranty: '1-Year Limited Warranty',
    deliveryInfo: 'Heavy item. Shipped in individual foam padded cartons.'
  },
  {
    id: 'mg996r-metal-servo',
    name: 'MG996R High Torque Metal Gear Servo',
    brand: 'Pololu',
    category: 'Robotics',
    price: 350,
    oldPrice: 480,
    discount: 27,
    rating: 4.7,
    reviewsCount: 231,
    stock: 'In Stock',
    images: [
      '/MG996R%20High%20Torque%20Metal%20Gear%20Servo.jpg'
    ],
    sku: 'MOT-MG996R-S',
    datasheet: 'https://components101.com/sites/default/files/component_datasheet/MG996R-Datasheet.pdf',
    description: 'The MG996R is an upgraded version of the famous MG995 servo. It features metal gearings, dual-bearing configurations, and high stall torque up to 11 kg-cm, making it an excellent fit for robotic arms, steering knuckles, and RC planes.',
    specifications: {
      'Operating Voltage': '4.8V - 7.2V',
      'Stall Torque': '9.4 kg-cm (at 4.8V), 11 kg-cm (at 6.0V)',
      'Operating Speed': '0.19 s/60° (4.8V), 0.15 s/60° (6.0V)',
      'Rotation Range': '180 degrees',
      'Gears': 'All Metal Gear Set',
      'Motor Type': 'Coreless Servo',
      'Communication Protocol': 'PWM Servo control',
      'Operating Temperature': '0°C to 55°C',
      'Package Type': 'Servo Housing',
      'Application': 'Robotic Arms, Steering, Grippers',
      'Industry': 'STEM Education, Toy Manufacturing'
    },
    features: [
      'Full metal gear assembly prevents stripping under sudden mechanical shock',
      'Double ball-bearing shaft design offers smooth friction-free operations',
      'Standard 30cm wire harness with JR/Futaba compatible servo plug',
      'Includes complete kit of plastic servo horns, grommets, and screws'
    ],
    warranty: '6-Months Direct Store Warranty',
    deliveryInfo: 'Includes full set of accessory horns (arms) and mounting screws.'
  },
  {
    id: 'l298n-motor-driver',
    name: 'L298N Dual H-Bridge Motor Driver Module',
    brand: 'Cytron',
    category: 'Robotics',
    price: 180,
    oldPrice: 250,
    discount: 28,
    rating: 4.6,
    reviewsCount: 287,
    stock: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop'
    ],
    sku: 'DVR-L298N-H',
    datasheet: 'https://www.sparkfun.com/datasheets/Robotics/L298_H_Bridge.pdf',
    description: 'The L298N module is a high-power dual H-Bridge motor driver designed to drive DC motors, stepper motors, or solenoids. Built around the L298N IC, it can drive two DC motors up to 2A each, with speed and direction controller features.',
    specifications: {
      'Drive Voltage': '5V - 35V DC',
      'Peak Drive Current': '2A per channel',
      'Logic Voltage': '5V DC',
      'Maximum Power': '25 Watts',
      'Driver Chip': 'L298N Dual H-Bridge',
      'Motor Type': 'DC / Stepper / Solenoid',
      'Communication Protocol': 'PWM & Direction Pins',
      'Operating Temperature': '-25°C to 130°C',
      'Package Type': 'Heatsink Module',
      'Application': 'Differential Drive Robots, Stepper Controls',
      'Industry': 'STEM Labs, Toy Engineering'
    },
    features: [
      'Onboard 78M05 5V regulator can provide logic power to external board',
      'Sturdy aluminum heatsink prevents thermal throttling during peak load cycles',
      'Flyback freewheeling diodes protect logic circuitry from inductive kickbacks',
      'Easy screw terminal blocks for motor connections and power inputs'
    ],
    warranty: 'N/A (Hobby Grade Component)',
    deliveryInfo: 'Shipped in static shielded bag. Bulk order discounts available.'
  },
  {
    id: 'panasonic-18650-cell',
    name: 'Panasonic NCR18650B Li-ion Cell (3.7V 3400mAh)',
    brand: 'Panasonic',
    category: 'Batteries',
    price: 290,
    oldPrice: 380,
    discount: 23,
    rating: 4.8,
    reviewsCount: 154,
    stock: 'In Stock',
    images: [
      '/Panasonic%20NCR18650B%20Li-ion%20Cell%20(3.7V%203400mAh).jpg'
    ],
    sku: 'BAT-18650-NCR',
    datasheet: 'https://www.batteryspace.com/prod-specs/ncr18650b.pdf',
    description: 'Original high-capacity Panasonic NCR18650B lithium-ion cell. Delivers 3400mAh at a nominal 3.7V, perfect for constructing custom robot battery packs, flashlight cells, and backup bank modules.',
    specifications: {
      'Nominal Voltage': '3.7V (4.2V fully charged)',
      'Rated Capacity': '3400 mAh',
      'Discharge Current': '6.8A max continuous',
      'Cell Type': 'Lithium-Ion (18650)',
      'Chemistry': 'LiNiCoAlO2 (NCA)',
      'Operating Temperature': '-20°C to 60°C (Discharge)',
      'Package Type': '18650 Cylindrical',
      'Application': 'Custom Pack Assembly, Robotics, Power Banks',
      'Industry': 'Energy Storage, EV Development'
    },
    features: [
      'Flat top configuration allows secure spot-welding with nickel strips',
      'Incredible energy density yields long runtime on autonomous drones',
      'Built-in internal pressure safety valve (CID) for thermal expansion protection',
      'Tested for up to 500 charge-discharge cycles down to 80% capacity'
    ],
    warranty: 'Store verification on delivery (No warranty after spot welding)',
    deliveryInfo: 'Requires special surface transport due to lithium transport laws.'
  },
  {
    id: 'lipo-3s-battery-pack',
    name: 'SKYRC 11.1V 2200mAh 35C 3S LiPo Battery',
    brand: 'SKYRC',
    category: 'Batteries',
    price: 1450,
    oldPrice: 1800,
    discount: 19,
    rating: 4.7,
    reviewsCount: 94,
    stock: 'In Stock',
    images: [
      '/SKYRC%2011.1V%202200mAh%2035C%203S%20LiPo%20Battery.jpg'
    ],
    sku: 'BAT-LIPO-3S2200',
    datasheet: 'https://www.skyrc.com/files/lipo-safety-guide.pdf',
    description: 'A premium 3S Lithium Polymer battery pack delivering 11.1V with a high discharge rating of 35C. Ideal for powering brushless motors, drone frames, robotic chassis, and high-current hardware assemblies.',
    specifications: {
      'Voltage': '11.1V (3S1P)',
      'Capacity': '2200 mAh',
      'Discharge Rate': '35C continuous (70C burst)',
      'Connector': 'XT60 Discharge & JST-XH Balance leads',
      'Chemistry': 'Lithium Polymer (LiPo)',
      'Operating Temperature': '0°C to 40°C (Charge), -20°C to 60°C (Discharge)',
      'Package Type': 'Soft Pack',
      'Application': 'Drone Flight Power, Brushless Motors, High Current Loads',
      'Industry': 'Aerospace, UAV Prototyping'
    },
    features: [
      'XT60 connector pre-soldered with heavy-gauge 12AWG silicon wires',
      'JST-XH balance connector allows precise voltage leveling per cell',
      'Compact format slips easily into generic drone battery trays',
      'High discharge rate supports sudden throttle bursts without voltage drops'
    ],
    warranty: '1-Month Manufacturer Warranty for bloating issues',
    deliveryInfo: 'Ships via surface transport only. Handled in specialized battery boxes.'
  },
  {
    id: 'meanwell-lrs-350-24',
    name: 'Mean Well LRS-350-24 Power Supply (24V 14.6A)',
    brand: 'Mean Well',
    category: 'Power Supplies',
    price: 2450,
    oldPrice: 2800,
    discount: 12,
    rating: 4.9,
    reviewsCount: 104,
    stock: 'In Stock',
    images: [
      '/Mean%20Well%20LRS-350-24%20Power%20Supply%20(24V%2014.6A).jpg'
    ],
    sku: 'PWR-MW-LRS35024',
    datasheet: 'https://www.meanwell.com/productPdf.aspx?i=438',
    description: 'The Mean Well LRS-350-24 is a 350W single-output enclosed type power supply with 30mm of low profile design. Adopting an input of 115VAC or 230VAC (selected by switch), it provides an output of 24V DC, ideal for CNCs and 3D printers.',
    specifications: {
      'Output Voltage': '24V DC (Adjustable ±10%)',
      'Output Current': '14.6 A',
      'Rated Power': '350.4 Watts',
      'Input Voltage': '90 - 132VAC / 180 - 264VAC (Selectable)',
      'Efficiency': '89%',
      'Power Supply Type': 'Enclosed SMPS',
      'Communication Protocol': 'Analog Terminal Outputs',
      'Operating Temperature': '-25°C to 70°C',
      'Package Type': 'Metal Enclosed Chassis',
      'Application': '3D Printers, CNC Controllers, LED Panels',
      'Industry': 'Industrial Control, Machinery'
    },
    features: [
      'Built-in cooling fan with automatic ON/OFF speed controller thermal sensing',
      'Short circuit, overload, overvoltage, and overtemperature safety shutdowns',
      'Withstands 5G vibration tests and can operate at altitudes up to 5000 meters',
      'Undergoes 100% full load burn-in factory testing before release'
    ],
    warranty: '3-Year Official Mean Well Manufacturer Warranty',
    deliveryInfo: 'Includes GST Invoice. Heavy product. Dispatched via express courier.'
  },
  {
    id: 'ender3-v3-3d-printer',
    name: 'Creality Ender 3 V3 CoreXZ 3D Printer',
    brand: 'Creality',
    category: '3D Printing',
    price: 19900,
    oldPrice: 24900,
    discount: 20,
    rating: 4.8,
    reviewsCount: 115,
    stock: 'In Stock',
    images: [
      '/Creality%20Ender%203%20V3%20CoreXZ%203D%20Printer.jpg',
      '/Creality%20Ender%203%20V3%20CoreXZ%203D%20Printer.jpg'
    ],
    sku: '3DP-ENDER3-V3',
    datasheet: 'https://img.creality.com/assets/ender-3-v3-datasheet.pdf',
    description: 'The Creality Ender-3 V3 features a breakthrough CoreXZ movement structure enabling printing speeds up to 600mm/s. Equipped with a direct drive Sprite extruder and automatic bed leveling, it is perfect for manufacturing enclosures and prototypes.',
    specifications: {
      'Print Volume': '220 x 220 x 250 mm',
      'Max Speed': '600 mm/s (XZ-axis Core)',
      'Extruder': 'Sprite Direct Drive (Dual-gear)',
      'Max Hotend Temp': '300°C',
      'Nozzle Size': '0.4 mm (Copper alloy)',
      'Board Type': '32-bit Silent Mainboard',
      'Communication Protocol': 'Wi-Fi, USB Flash Drive',
      'Operating Temperature': '15°C to 40°C',
      'Package Type': 'Semi-Assembled Kit',
      'Application': 'FDM Prototyping, Enclosure Fabrication',
      'Industry': 'Product Design, STEM Labs'
    },
    features: [
      'CoreXZ coordinate motion allows high-speed printing without ringing artifacts',
      'Sprite direct drive extruder handles flexible filaments like TPU with ease',
      'Auto calibration for Z-offset and leveling using load cell sensor pins',
      'Heavy-duty integrated die-cast aluminum frame ensures structural stiffness'
    ],
    warranty: '1-Year Creality Official Warranty',
    deliveryInfo: 'Large parcel box. Free delivery across India. GST bill issued.'
  },
  {
    id: 'dji-brushless-motor',
    name: 'DJI E305 2312E Brushless Motor (800KV CCW)',
    brand: 'DJI',
    category: 'Drone Components',
    price: 1200,
    oldPrice: 1500,
    discount: 20,
    rating: 4.7,
    reviewsCount: 65,
    stock: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=600&auto=format&fit=crop'
    ],
    sku: 'DRN-DJI-2312E',
    datasheet: 'https://dl.djicdn.com/downloads/accessories/E305_User_Manual_en.pdf',
    description: 'The DJI 2312E brushless motor features a stator winding configuration that improves heat dissipation and efficiency. Delivering 800KV, it is optimized for multirotors weighing 1.5kg to 2.5kg, supporting 3S to 4S LiPo inputs.',
    specifications: {
      'Stator Size': '23 x 12 mm',
      'KV Rating': '800 KV',
      'Supported LiPo': '3S - 4S LiPo Pack',
      'Rotation Direction': 'CCW (Counter-Clockwise, Black Cap)',
      'Motor Type': 'Brushless Outrunner',
      'Communication Protocol': '3-Phase AC PWM',
      'Operating Temperature': '-10°C to 40°C',
      'Package Type': 'Outrunner Housing',
      'Application': 'Quadcopters, UAV Heavy Lift Platforms',
      'Industry': 'UAV Prototyping, Aerial Photography'
    },
    features: [
      'Special electro-magnetic design increases thrust without drawing peak amps',
      'Proprietary self-tightening hub system allows tool-free propeller mounts',
      'High grade Japanese ball bearings offer quiet, low-vibration operation',
      'Coated copper wires prevent internal short circuits under humid conditions'
    ],
    warranty: '1-Year DJI Manufacturer Warranty',
    deliveryInfo: 'Includes mounting screws M3. Sealed anti-static box.'
  },
  {
    id: 'emax-30a-esc',
    name: 'Emax BLHeli 30A Speed Controller (ESC)',
    brand: 'Emax',
    category: 'Drone Components',
    price: 450,
    oldPrice: 600,
    discount: 25,
    rating: 4.6,
    reviewsCount: 142,
    stock: 'In Stock',
    images: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=600&auto=format&fit=crop'
    ],
    sku: 'DRN-EMX-ESC30',
    datasheet: 'https://emax-usa.com/BLHeli_ESC_User_Manual.pdf',
    description: 'An Electronic Speed Controller (ESC) programmed with BLHeli firmware. Capable of driving brushless motors at 30A continuous current, it features standard servo controls and programmable throttle calibrations.',
    specifications: {
      'Continuous Current': '30 A (40A Burst for 10s)',
      'Battery Input': '2S - 4S LiPo Pack',
      'BEC Output': 'Linear 5V / 2A regulator',
      'Firmware': 'BLHeli standard firmware',
      'Motor Type': 'Brushless Motor Driver',
      'Communication Protocol': 'PWM Throttle Signal',
      'Operating Temperature': '-20°C to 85°C',
      'Package Type': 'Shrink-wrapped Module',
      'Application': 'UAV ESC Control, Brushless Actuators',
      'Industry': 'Drone Manufacturing, STEM Projects'
    },
    features: [
      'Onboard 5V Linear BEC supplies clean regulated power to flight controllers',
      'Features low-voltage protection, thermal cutoffs, and transmitter signal loss shutdowns',
      'BLHeli firmware allows customizing settings via programmer card setups',
      'Includes pre-soldered motor wires and input power leads'
    ],
    warranty: '3-Months Replacement Warranty',
    deliveryInfo: 'Packed in ESD safe envelope. Lightweight delivery.'
  },
  {
    id: 'refurbished-teensy-41',
    name: '[Refurbished] Teensy 4.1 Development Board (Tested)',
    brand: 'Teensy',
    category: 'Development Boards',
    price: 2600,
    oldPrice: 3850,
    discount: 32,
    rating: 4.5,
    reviewsCount: 14,
    stock: 'In Stock',
    images: [
      '/%5BRefurbished%5D%20Teensy%204.1%20Development%20Board%20(Tested)32%25%20OFF.jpg'
    ],
    sku: 'RFB-TEENSY-41',
    datasheet: 'https://www.pjrc.com/teensy/datasheet41.pdf',
    description: 'Certified pre-owned and fully tested Teensy 4.1 development board. Features minor cosmetic solder pad wear, but guaranteed to function identical to new. High-speed 600MHz ARM processor, MicroSD slot, Ethernet support.',
    specifications: {
      'Processor': 'ARM Cortex-M7 (600 MHz with FPU)',
      'Memory': '7936KB Flash, 1024KB RAM',
      'Condition': 'Refurbished (Tested Working)',
      'Operating Voltage': '3.3V',
      'Board Type': 'Microcontroller',
      'Communication Protocol': 'I2C, SPI, UART, CAN, USB Host, Ethernet',
      'Operating Temperature': '-20°C to 85°C',
      'Package Type': 'DIP Module',
      'Application': 'DSP Audio, Industrial CAN Logging, Flight Control',
      'Industry': 'Academic Research, Hobbyist'
    },
    features: [
      'Individually inspected and flashed with standard diagnostics to verify GPIO health',
      'Same high-speed 600 MHz Cortex-M7 clock speed for floating-point computations',
      'MicroSD slot is pre-soldered and fully functional for read/write speed cycles',
      'Exceptional value for budget maker projects and university lab setups'
    ],
    warranty: '90-Day Replacement Warranty by Marketplace',
    deliveryInfo: 'Packaged in custom certified refurbished box. Anti-static shield.'
  },
  {
    id: 'refurbished-ender-3-v2',
    name: '[Refurbished] Creality Ender 3 V2 FDM 3D Printer',
    brand: 'Creality',
    category: '3D Printing',
    price: 11900,
    oldPrice: 16900,
    discount: 30,
    rating: 4.6,
    reviewsCount: 22,
    stock: 'Low Stock',
    images: [
      '/%5BRefurbished%5D%20Creality%20Ender%203%20V2%20FDM%203D%20Printer.jpg'
    ],
    sku: 'RFB-ENDER3-V2',
    datasheet: 'https://img.creality.com/assets/ender-3-v2-datasheet.pdf',
    description: 'Certified pre-owned Creality Ender 3 V2 3D printer. This machine has been fully disassembled, cleaned, belts retensioned, and tested for a continuous 10-hour printing run. Features a silent motherboard, carborundum glass plate, and rotary extruder feed knob.',
    specifications: {
      'Print Volume': '220 x 220 x 250 mm',
      'Max Speed': '100 mm/s',
      'Extruder': 'Bowden Extruder (Metal Upgraded)',
      'Max Hotend Temp': '250°C',
      'Nozzle Size': '0.4 mm (Brand New Installed)',
      'Board Type': '32-bit Silent Mainboard',
      'Condition': 'Refurbished (Extensively Serviced)',
      'Operating Temperature': '15°C to 40°C',
      'Package Type': 'Semi-Assembled Kit',
      'Application': 'PLA/PETG FDM Printing',
      'Industry': 'Hobbyist, Prototyping'
    },
    features: [
      'Silent motherboard with TMC2208 stepper drivers ensures quiet workspace setups',
      'Upgraded with brand new nozzle and pneumatic PTFE tube fittings pre-installed',
      'Individually leveled and test-printed; benchy sample included in shipping box',
      'Pre-flashed with the latest official stable firmware release'
    ],
    warranty: '6-Months Direct Service Center Warranty',
    deliveryInfo: 'Includes standard assembly tools and minor starter filament rolls.'
  }
];

export const tutorials: Tutorial[] = [
  {
    id: 'tut-can-mcp2515',
    title: 'CAN Protocol using MCP2515 and Arduino',
    category: 'Development Boards',
    date: '2026-06-12',
    author: 'Er. Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=300&auto=format&fit=crop',
    readTime: '12 min read',
    excerpt: 'Learn how to establish CAN bus communication between two Arduino boards using the MCP2515 CAN controller and TJA1050 transceiver modules. Includes wiring diagrams, sample Arduino code, and packet sniffing setup.'
  },
  {
    id: 'tut-pid-balancing',
    title: 'PID Tuning for a Self Balancing Robot',
    category: 'Robotics',
    date: '2026-05-24',
    author: 'Dr. Sarah Jenkins',
    image: '/PID%20Tuning%20for%20a%20Self%20Balancing%20Robot.jpg',
    readTime: '18 min read',
    excerpt: 'Establish pitch calculations using an MPU6050 IMU, configure Kalman filters, and step-by-step tune the Proportional (P), Integral (I), and Derivative (D) coefficients for standard DC geared motors.'
  },
  {
    id: 'tut-esp32-iot-beginner',
    title: 'ESP32 IoT Beginner Guide: Connecting to Cloud Platforms',
    category: 'IoT Modules',
    date: '2026-05-02',
    author: 'Amit Sharma',
    image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=300&auto=format&fit=crop',
    readTime: '10 min read',
    excerpt: 'Connect your ESP32 WROOM DevKit to WiFi, read local sensors, and push data points in real time to Blynk and Adafruit IO dashboards using standard HTTP and MQTT protocols.'
  },
  {
    id: 'tut-interface-mpu6050',
    title: 'How to Interface MPU6050 Accelerometer & Gyro',
    category: 'Sensors',
    date: '2026-04-18',
    author: 'Johnathan Doe',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop',
    readTime: '8 min read',
    excerpt: 'Detailed tutorial on connecting GY-521 MPU6050 to your microchip, retrieving raw acceleration/gyro values, and configuring the Digital Motion Processor (DMP) to output clean roll/pitch/yaw angles.'
  },
  {
    id: 'tut-stm32-vs-arduino',
    title: 'STM32 vs Arduino: Choosing the Right Controller',
    category: 'Development Boards',
    date: '2026-03-29',
    author: 'Neha Deshmukh',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=300&auto=format&fit=crop',
    readTime: '15 min read',
    excerpt: 'An in-depth hardware comparison between the 8-bit AVR Arduino Uno and 32-bit ARM Cortex-M3 STM32 Blue Pill. We compare floating point processing, interrupt latency, compilation structures, and IDE support.'
  },
  {
    id: 'tut-motor-driver-guide',
    title: 'Choosing the Right Motor Driver: L298N vs TB6600',
    category: 'Robotics',
    date: '2026-02-14',
    author: 'Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=300&auto=format&fit=crop',
    readTime: '9 min read',
    excerpt: 'Understand motor driver architectures. We outline thermal limits, current ratings, microstepping configurations, and back-EMF spikes for brushed DC and bipolar NEMA stepper motors.'
  }
];

export const youtubeVideos: TechnicalVideo[] = [
  {
    id: 'vid-arduino-tut',
    title: 'Arduino Hardware Guide: Registers, Interrupts & PWM',
    category: 'Arduino Tutorials',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop',
    duration: '24:15',
    views: '42K views'
  },
  {
    id: 'vid-esp32-proj',
    title: 'Smart Home Automation Node with ESP32 & Home Assistant',
    category: 'ESP32 Projects',
    thumbnail: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?q=80&w=400&auto=format&fit=crop',
    duration: '18:50',
    views: '89K views'
  },
  {
    id: 'vid-drone-build',
    title: 'F550 Hexacopter Build: Flight Controller Calibration',
    category: 'Drone Building',
    thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=400&auto=format&fit=crop',
    duration: '35:20',
    views: '112K views'
  },
  {
    id: 'vid-pcb-design',
    title: 'KiCad Tutorial: Designing a Custom ESP32 Breakout Board',
    category: 'PCB Design',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop',
    duration: '42:10',
    views: '65K views'
  },
  {
    id: 'vid-robot-arm',
    title: 'Inverse Kinematics implementation on a 6-Axis Servo Robotic Arm',
    category: 'Robot Arm',
    thumbnail: 'https://images.unsplash.com/photo-1581092921461-39b9d08a9b21?q=80&w=400&auto=format&fit=crop',
    duration: '28:40',
    views: '38K views'
  },
  {
    id: 'vid-embedded-sys',
    title: 'Bare-Metal Programming on STM32 using GCC Compiler',
    category: 'Embedded Systems',
    thumbnail: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=400&auto=format&fit=crop',
    duration: '54:30',
    views: '54K views'
  }
];

export const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Shipping',
    question: 'How fast will my electronic components order arrive?',
    answer: 'We offer same-day shipping for all orders placed before 3:00 PM. Standard delivery takes 2-3 business days across India. High-capacity LiPo batteries or custom battery packs may take 4-5 business days due to mandatory ground transport regulations.'
  },
  {
    id: 'faq-2',
    category: 'GST & Invoicing',
    question: 'Can I get a GST-compliant invoice for my business or institute?',
    answer: 'Yes! We provide full GST invoices for all orders. Simply input your company name and GSTIN during the checkout flow, and a digital tax-compliant invoice will be emailed immediately on shipment dispatch.'
  },
  {
    id: 'faq-3',
    category: 'Vendor Registration',
    question: 'How can we list our robotics modules on your platform?',
    answer: 'We welcome component distributors, manufacturers, and maker product engineers! Navigate to our Contact page and select "Vendor Registration" under inquiry types to request access. Our vendor onboard coordinators will reply with commission and API settings.'
  },
  {
    id: 'faq-4',
    category: 'PCB & Services',
    question: 'How do I submit Gerber files for Custom PCB prototyping?',
    answer: 'To initiate a PCB manufacturing or SLA/FDM 3D printing custom quote, use the inquiry panel on the Contact page. Upload or link your zip files (containing Gerber RS-274X data or STL models). Our engineers will verify trace spacing and email a custom quote within 4 hours.'
  },
  {
    id: 'faq-5',
    category: 'Warranty & Returns',
    question: 'What is the return policy for development boards and sensors?',
    answer: 'Due to the electrostatic nature of components, we offer a 10-day replacement warranty for manufacturing defects only. Microcontrollers or sensors that show signs of soldering, reverse polarity input, or burned traces cannot be returned.'
  }
];

// Fallback for testimonials component referencing this data
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Tech Lead at Vercel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    comment: 'The user experience of buying my components here was flawless. The animations are clean, search is lightning fast, and delivery took less than 24 hours. Highly recommended!',
    rating: 5,
    featured: true
  },
  {
    id: 't2',
    name: 'Arjun Mehta',
    role: 'Founder, RoboLab India',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
    comment: 'We source all our STM32 and motor drivers from Ocean Student Projects. Genuine components, proper packaging, and GST invoices — everything a startup needs.',
    rating: 5,
    featured: true
  },
  {
    id: 't3',
    name: 'Priya Sharma',
    role: 'PhD Scholar, IIT Madras',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    comment: 'The Raspberry Pi 5 arrived in 2 days and was significantly cheaper than other Indian retailers. The datasheet links on each product page are a lifesaver for research.',
    rating: 5,
    featured: true
  },
  {
    id: 't4',
    name: 'Vikram Desai',
    role: 'Hobbyist Maker',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    comment: 'Great store for 3D printing supplies. The Ender 3 V3 was well-packed and the included beginner filament roll got me printing within an hour of unboxing.',
    rating: 4,
    featured: false
  },
  {
    id: 't5',
    name: 'Neha Gupta',
    role: 'Embedded Engineer, Tata Elxsi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
    comment: 'Finally a store that stocks genuine Panasonic 18650 cells and Mean Well power supplies. No counterfeit worries. Will be my go-to for all prototyping needs.',
    rating: 5,
    featured: false
  },
  {
    id: 't6',
    name: 'Rahul Venkatesh',
    role: 'UAV Researcher, DRDO',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
    comment: 'The BLHeli ESCs and DJI motors were authentic and matched OEM specs perfectly. Fast shipping to our lab in Hyderabad. Highly recommended for drone builders.',
    rating: 5,
    featured: false
  }
];
