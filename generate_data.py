import fastf1
import json

fastf1.Cache.enable_cache('cache')

session = fastf1.get_session(2023, 'Bahrain', 'R')
session.load()

laps = session.laps

drivers = ['VER', 'HAM']

for driver in drivers:
    driver_laps = laps.pick_driver(driver).dropna(subset=['LapTime'])

    lap_data = {
        "driver": driver,
        "lap_numbers": driver_laps['LapNumber'].tolist(),
        "lap_times": [t.total_seconds() for t in driver_laps['LapTime']]
    }

    with open(f'data/laps_{driver}.json', 'w') as f:
        json.dump(lap_data, f, indent=2)

print("✅ Multi-driver data generated")

driver_laps = laps.pick_driver(driver).dropna(subset=['LapTime'])

# ---------- LAP DATA ----------
lap_data = {
    "driver": driver,
    "lap_numbers": driver_laps['LapNumber'].tolist(),
    "lap_times": [t.total_seconds() for t in driver_laps['LapTime']]
}

with open('data/laps.json', 'w') as f:
    json.dump(lap_data, f, indent=2)

# ---------- TELEMETRY ----------
fastest_lap = driver_laps.pick_fastest()
telemetry = fastest_lap.get_car_data().add_distance()

telemetry_data = {
    "speed": telemetry['Speed'].tolist(),
    "throttle": telemetry['Throttle'].tolist(),
    "brake": telemetry['Brake'].tolist(),
    "distance": telemetry['Distance'].tolist()
}

with open('data/telemetry.json', 'w') as f:
    json.dump(telemetry_data, f, indent=2)

# ---------- META ----------
meta = {
    "event": "Bahrain GP 2023",
    "driver": driver,
    "total_laps": len(driver_laps)
}

with open('data/meta.json', 'w') as f:
    json.dump(meta, f, indent=2)

print("✅ Data generated successfully")