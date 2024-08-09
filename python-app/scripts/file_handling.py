import os

def read_raw_data(data_dir):
    file_path = os.path.join(data_dir, 'data.txt')
    with open(file_path, 'r') as file:
        return file.read().strip().split('|')
