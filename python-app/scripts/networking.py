import requests
import logging
import json

logger = logging.getLogger()

def send_data_to_server(data):
    json_data = json.dumps([data])
    try:
        response = requests.post('http://node-server:3000/data/upload', json=json.loads(json_data))
        logger.info(f"Dataset enviado para o servidor Node.js. Status: {response.status_code}")
        logger.info(response.text)
    except Exception as e:
        logger.error(f"Erro ao enviar o dataset: {e}")
