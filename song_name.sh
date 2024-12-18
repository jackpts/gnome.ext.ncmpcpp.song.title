#!/bin/bash

# Fetch the current song title from ncmpcpp
line_count=$(mpc | grep "" -c)
# TODO: handle the case when `mpc` isn't installed

if [ $line_count -gt 1 ]; then
  echo "$(mpc | head -n1)"
else
  echo "<No play>"
fi
