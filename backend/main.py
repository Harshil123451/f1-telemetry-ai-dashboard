from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware
import os
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_json(file):
    path = os.path.join(BASE_DIR, "..", "data", file)
    with open(path) as f:
        return json.load(f)

def generate_insights(lap_times):
    insights = []

    if lap_times[-1] < lap_times[-2]:
        insights.append("Driver is improving lap pace")

    if max(lap_times) - min(lap_times) > 2:
        insights.append("High lap time variation detected")

    return insights


@app.get("/")
def home():
    return {"message": "F1 Telemetry API running"}

@app.get("/laps")
def get_laps():
    return load_json("laps.json")

@app.get("/telemetry")
def get_telemetry():
    return load_json("telemetry.json")

@app.get("/meta")
def get_meta():
    return load_json("meta.json")

@app.get("/insights")
def get_insights():
    data = load_json("laps.json")
    lap_times = data["lap_times"]

    insights = []

    # ALWAYS define avg
    avg = sum(lap_times) / len(lap_times)

    if lap_times[-1] > lap_times[-2]:
        insights.append("Driver losing pace")

    if lap_times[-1] > avg:
        insights.append("Current lap slower than average")

    # add base insights
    insights.extend(generate_insights(lap_times))

    return {
        "driver": data["driver"],
        "insights": insights
    }

@app.get("/compare")
def compare():
    with open("data/laps_VER.json") as f:
        ver = json.load(f)
    with open("data/laps_HAM.json") as f:
        ham = json.load(f)

    return {
        "VER": ver,
        "HAM": ham
    }

@app.get("/delta")
def delta():
    try:
        with open("data/laps_VER.json") as f:
            ver = json.load(f)
        with open("data/laps_HAM.json") as f:
            ham = json.load(f)

        length = min(len(ver["lap_times"]), len(ham["lap_times"]))

        delta = [
            ver["lap_times"][i] - ham["lap_times"][i]
            for i in range(length)
        ]

        return {"delta": delta}

    except Exception as e:
        return {"error": str(e)}