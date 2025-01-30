"""
Design Concept:
---------------
We have some number of "flash patterns".

A flash pattern is a pattern of on/off commands along with a sleep duration.

Each of those patterns is stored in an array (patterns).

We initialize an index to 0, and we "play" whatever pattern is stored
at the index.  And when we press the button we jump to the next pattern.

Because the sleep period for the pattern could be long (say 5 seconds) and we
want the button to be responsive, we're going to break the sleep into some
number of cycles.  I've chosen 100ms.  This way if you press the button it'll
break out of the pattern and go to the next one within ~100ms.
"""

from gpiozero import Button, LED
from time     import sleep

# Define the GPIO controls
button = Button(17, pull_up = False) # use false to match our circuit design
led    = LED(4)


# Define all our flash patterns
pattern_off    = [('off', 1)]
pattern_slow   = [('on', 1), ('off', 1)]
pattern_fast   = [('on', 0.2), ('off', 0.2)]
pattern_blink  = [('on', 0.1), ('off', 0.1), ('on', 0.1), ('off', 0.1), ('on', 0.1), ('off', 1)]

patterns       = [pattern_off, pattern_blink, pattern_slow, pattern_fast]
pattern_names  = ["off", "blink", "slow", "fast"]

pattern_index  = 0

print(f"\nPress the button to start a pattern.\n")

while True:
   pattern_restart = False
   is_pressed      = False

   # i will be a 0->x-1 based on the pattern length
   for i in range(len(patterns[pattern_index])):

      # If we want to restart the pattern, break out and it'll restart for us
      if pattern_restart:
         break

      action  = patterns[pattern_index][i][0]
      seconds = patterns[pattern_index][i][1]

      if action == 'on':
         led.on()
      else:
         led.off()

      # cycles number of 100ms sleeps
      cycles = max(1, int(float(seconds) / 0.100))
      for _ in range(cycles):
         sleep(0.100)

         if button.is_pressed:
            if not is_pressed:
               # Reset the pattern
               is_pressed      = True
               pattern_restart = True
               pattern_index   = (pattern_index + 1) % len(patterns) # go to the next pattern

               print(f"Blink pattern {pattern_names[pattern_index]}")

         else:
            if is_pressed:
               is_pressed      = False

