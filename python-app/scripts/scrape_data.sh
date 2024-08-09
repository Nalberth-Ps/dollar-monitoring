#!/bin/bash

echo "Executando scrape_data.sh - $(date)" >> /var/log/cron_debug.log

# URL do site a ser raspado
URL="https://br.investing.com/currencies/usd-brl"

# Obtenha o conteúdo HTML da página
html=$(curl -s $URL)

# Extraia os dados usando seletores CSS e processadores de texto
price=$(echo "$html" | grep -oP 'data-test="instrument-price-last"[^>]*>\K[^<]*')
value_change=$(echo "$html" | grep -oP 'data-test="instrument-price-change"[^>]*>\K[^<]*')

# Captura a data e hora atuais
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

# Verifique se os valores estão corretos
echo "Price: $price"
echo "Value Change: $value_change"
echo "Timestamp: $timestamp"

# Salvar os dados em um arquivo de texto bruto usando | como delimitador
echo "$timestamp|$price|$value_change" > /data/raw/data.txt
