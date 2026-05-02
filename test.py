import fastf1

fastf1.Cache.enable_cache('cache')  # stores data locally

session = fastf1.get_session(2023, 'Bahrain', 'R')
session.load()

laps = session.laps
print(laps[['Driver', 'LapTime']].head())
