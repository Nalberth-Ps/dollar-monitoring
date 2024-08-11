#!/bin/bash

# Adicionar o cron job manualmente para executar a cada 2 horas
echo "0 */2 * * * /bin/bash /scripts/run_all.sh >> /var/log/cron_debug.log 2>&1" | crontab -

# Iniciar o cron em segundo plano
cron

# Executar o comando principal do container (mantém ele ativo)
tail -f /var/log/cron_debug.log
