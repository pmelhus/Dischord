from threading import Timer

def timer(time):
  t = Timer(time, print(
      'POOOOOOOP==========================================================='))
  t.start()
