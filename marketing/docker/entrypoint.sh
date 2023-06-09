#!/usr/bin/env sh

# The first part wrapped in a function
makeSedCommands() {
  printenv | \
      grep  '^NEXT_' | \
      sed -r "s/=/ /g" | \
      xargs -n 2 sh -c 'echo "sed -i \"s#APP_$0#$1#g\""'
}

# Set the delimiter to newlines (needed for looping over the function output)
IFS=$'\n'
# For each sed command
for c in $(makeSedCommands); do
  # For each file in the .next directory
  for f in $(find .next -type f); do
    # Execute the command against the file
    COMMAND="$c $f"
    eval $COMMAND
  done
  eval "$c ./server.js"
done

# Run any arguments passed to this script
exec "$@"