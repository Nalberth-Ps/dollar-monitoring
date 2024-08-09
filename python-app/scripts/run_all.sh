#!/bin/bash

echo "Executando run_all.sh - $(date)" >> /var/log/cron_debug.log

# Execute o script de raspagem de dados
echo "Executando scrape_data.sh - $(date)" >> /var/log/cron_debug.log
/bin/bash /scripts/scrape_data.sh >> /var/log/cron_debug.log 2>&1

# Execute o script de limpeza de dados
echo "Executando o python - $(date)" >> /var/log/cron_debug.log
/usr/local/bin/python /scripts/main.py >> /var/log/cron_debug.log 2>&1

echo "Finalizado run_all.sh - $(date)" >> /var/log/cron_debug.log
