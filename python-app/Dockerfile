FROM python:3.12

# Instale o cron e dos2unix
RUN apt-get update && apt-get install -y cron dos2unix

# Crie os diretórios necessários
RUN mkdir -p /data/raw /data/processed /scripts /cron

# Copie o arquivo requirements.txt para o contêiner
COPY requirements.txt /scripts/requirements.txt

# Instale as dependências do Python
RUN pip install --no-cache-dir -r /scripts/requirements.txt

# Copie os scripts para o contêiner
COPY scripts/ /scripts/

# Ajuste as permissões para os scripts
RUN chmod +x /scripts/*.sh

# Converta os arquivos para o formato Unix
RUN dos2unix /scripts/*.sh

# Crie os arquivos de log do cron
RUN mkdir -p /var/log/cron
RUN touch /var/log/cron/cron.log /var/log/cron_debug.log

# Copie o script de entrada
COPY scripts/entrypoint.sh /scripts/entrypoint.sh
RUN chmod +x /scripts/entrypoint.sh

CMD ["/scripts/entrypoint.sh"]
