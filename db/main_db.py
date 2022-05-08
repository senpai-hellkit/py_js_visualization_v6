import pymysql
from pymysql.cursors import DictCursor
from typing import Dict, List, Union

from config import env


class DataBase:
    def __init__(self, host: str = env['host'], user: str = env['user'],
                 password: str = env['password'], db_name: str = env['db_name']):
        self.connect = pymysql.connect(
            host=host,
            user=user,
            password=password,
            db=db_name,
            charset='utf8mb4',
            cursorclass=DictCursor,
            autocommit=True
        )

    def get_data(self):
        self.connect.ping(reconnect=True)
        query: str = "select * from vd_tsmc"
        with self.connect.cursor() as cursor:
            cursor.execute(query)
            data: List[Dict[str, Union[str, int]]] = []
            for some_data in cursor.fetchall():
                some_data['dt'] = some_data['dt'].strftime("%m-%Y")
                data.append(some_data)
        return data[::-1]


db: DataBase = DataBase()
