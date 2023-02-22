  NAME=${1:-web3NextAppFiction};
  SCRIPT=${2:-start}
  pm2 describe $NAME > /dev/null
  npm run build
  RUNNING=$?
  if [ "${RUNNING}" -ne 0 ]; then
    echo "start app '$NAME'..."
    pm2 start npm --name $NAME -- run $SCRIPT
  else
    echo "reload app '$NAME'..."
    pm2 reload $NAME
  fi;