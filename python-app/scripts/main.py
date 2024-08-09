import logging
from data_processing import process_data
from file_handling import read_raw_data
from networking import send_data_to_server

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

RAW_DATA_DIR = '/data/raw'

def main():
    logger.info("Script de limpeza iniciado.")
    
    # Ler os dados brutos
    raw_data = read_raw_data(RAW_DATA_DIR)
    
    # Processar os dados
    processed_data = process_data(raw_data)
    
    # Enviar os dados ao servidor
    send_data_to_server(processed_data)

    logger.info("Script de limpeza concluído.")

if __name__ == "__main__":
    main()
