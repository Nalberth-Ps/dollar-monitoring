import pytz
from datetime import datetime

BRT = pytz.timezone('America/Sao_Paulo')

def process_data(data):
    timestamp_str, price, value_change = data
    
    # Converta a string de timestamp para um objeto datetime
    timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S').replace(tzinfo=pytz.utc).astimezone(BRT)
    formatted_date = timestamp.strftime('%Y-%m-%d %H:%M:%S')

    # Limpar e converter valores
    price = clean_value(price)
    value_change = clean_value(value_change)

    # Calcular a porcentagem alterada
    percent_change = calculate_percent_change(price, value_change)

    # Criar dicionário de dados
    return {
        'date': formatted_date,
        'price': price,
        'valueChange': value_change,
        'percentChange': percent_change
    }

def clean_value(value):
    try:
        return float(value.replace(',', '.'))
    except ValueError:
        return None

def calculate_percent_change(price, value_change):
    if price and value_change:
        return (value_change / (price - value_change)) * 100
    return None
