#!/bin/bash

# Adicionar o cron job manualmente
echo "* * * * * /bin/bash /scripts/run_all.sh >> /var/log/cron_debug.log 2>&1" | crontab -

# Iniciar o cron em segundo plano
cron

# Executar o comando principal do container (mantém ele ativo)
tail -f /var/log/cron_debug.log
