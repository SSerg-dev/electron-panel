#!/bin/bash
# This script rotates the screen and touchscreen

# by Ruben Barkow-Kuder: https://gist.github.com/rubo77/daa262e0229f6e398766

#### configuration
# find your Touchscreen device with `xinput`
TouchscreenDevice="$(xrandr |grep XWAY|cut -d" " -f1)"

if [ "$1" = "--help"  ] || [ "$1" = "-h"  ] ; then
echo 'Usage: rotate-screen.sh [OPTION]'
echo
echo 'This script rotates the screen and touchscreen input 90 degrees each time it is called,' 
echo
echo Usage:
echo ' -h --help display this help'
echo ' -r turn orientation 90° right'
echo ' -l turn orientation 90° left'
echo ' -i turn orientation 180°'
echo ' -n (or no options) rotates the screen back to normal'
exit 0
fi

if [ "$1" == "-i" ]; then
  echo "Upside down"
  xrandr --output "$TouchscreenDevice" --rotate inverted
elif [ "$1" == "-l" ]; then
  echo "90° to the left"
  xrandr --output "$TouchscreenDevice" --rotate left
elif [ "$1" == "-r" ]; then
  echo "90° to the right"
  xrandr --output "$TouchscreenDevice" --rotate right
else
  echo "Back to normal"
  xrandr --output "$TouchscreenDevice" --rotate normal
fi
