from luma.core.interface.serial import spi
from luma.oled.device           import sh1106

serial = spi(device=0, port=0, gpio_DC=6, gpio_RST=4, gpio_CS=None)  # CS grounded
oled   = sh1106(serial, width=128, height=64, rotate=0)