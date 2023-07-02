# Kartodromo ESP32 Firmware

O Kartodromo ESP32 é um firmware em escrito em micropython desenvolvida para registro de campeonatos de corrida de automóveis. 
A ideia é que seja a interface de comunicação entre o microcontrolador, que captura os tempos de cada volta na pista, e a aplicação Web, que disponibiliza
esse dado de forma intuitiva para o usuário final.

## Tecnologias utilizadas
 * Python
 * MicroPython
 * HTTP
 * Pycharm

## Para executar localmente
 É necessário, inicialmente instalar o micropython na placa.
 Você pode este [link](https://micropython.org/download/esp32/) onde tem os passos de como fazer a instalação diretamente da ESPREISSF.
 Porém é necessário realizar a instalação da ferramenta [esptool](https://docs.espressif.com/projects/esptool/en/latest/esp32/) para fazer a gravação do micropython na placa.
 
## Embarcar
  Você pode utilizar qualquer programa de sua escolha para realizar o upload dos arquivos na placa, utilizei o Pycharm que tem um plugin embutido para mircopython.
 
### Pré-requisitos 
 Antes de abrir o projeto ou tentar instalar as dependências é necessário ter instalado:
  * [Micropython](https://micropython.org/download/esp32/)
  * [Python3](https://www.python.org/downloads/)
  * [esptool.py](https://docs.espressif.com/projects/esptool/en/latest/esp32/)

### Clonand o projeto
Clone o projeto 

  `$ git clone git@github.com:Evaldoes/Kart-esp32-cronomentro.git`
  
   `$ source venv/bin/activate'`
   
   `$ cd venv/lib/python3.9/site-packages/serial/tools/`
   
   `$ python3 -m miniterm /dev/ttyUSB0 115200`
   
### Executando
  Depois que realizar a gravação dos arquivos na placar, aperte o push button no esp32 e o boot será iniciado e script já estará sendo executado.
  
   `$ python3 -m miniterm /dev/ttyUSB0 115200`
   
   Para ver o logs do microcontrolador basta executar o comando acima.
