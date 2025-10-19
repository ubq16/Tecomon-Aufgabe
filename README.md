## 📦 Projektstruktur (Vorschlag)

```txt
/project-root
├── frontend/         → Next.js Frontend (Dashboard)
│   ├── pages/
│   ├── components/
│   └── utils/
├── backend/          → Node.js Backend (Express oder Fastify)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── services/     → Wetterdaten-Logik inkl. Caching
│   └── cache/        → optional: In-Memory oder File-basierter Cache
└── README.md
```

---

## 🚀 Setup-Anleitung

### Voraussetzungen:
- Node.js (v18+ empfohlen)
- MongoDB (lokal oder über MongoDB Atlas)
- NPM oder Yarn

### 1. Backend starten

```bash
# Ins Backend wechseln
cd backend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

> 💡 Beispiel `.env`-Datei:
```env
MONGODB_URI=mongodb://localhost:27017/widgets
PORT=5000
```

---

### 2. Frontend starten

```bash
# Ins Frontend wechseln
cd frontend

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

> 💡 Standardmäßig läuft das Frontend unter `http://localhost:3000`  
> 💡 Das Backend sollte unter `http://localhost:5000` erreichbar sein

---

## 🔍 Funktionale Anforderungen

### 🔹 Dashboard (Frontend)
- Benutzer kann mehrere Widgets erstellen, z. B. für:
  - Wetter in Berlin
  - Wetter in Hamburg
  - Wetter in Paris
- Jedes Widget zeigt live die Wetterdaten für den gewählten Ort
- Widgets können gelöscht werden
- Keine Authentifizierung notwendig

### 🔹 Backend (API + MongoDB)
- API zum Erstellen, Abrufen und Löschen von Widgets
- MongoDB speichert:
  - Widget-Daten (`_id`, `location`, `createdAt`)
  - (Optional: Benutzer-ID, falls später Auth hinzukommt)

### 🔹 Wetterdaten-Handling
- Wetterdaten werden bei Bedarf vom Backend über einen externen Wetterdienst abgerufen (z. B. open-meteo oder OpenWeather)
- Wenn für eine Stadt in den letzten **5 Minuten** bereits ein Abruf erfolgte, wird der **cached** Wert zurückgegeben (Memory oder einfache Cache-Datei)

---

## 🧾 API-Vorschlag

| Methode | Endpoint                 | Beschreibung                       |
|---------|--------------------------|------------------------------------|
| GET     | `/widgets`               | Liste aller gespeicherten Widgets |
| POST    | `/widgets`               | Neues Widget erstellen (`location`) |
| DELETE  | `/widgets/:id`           | Widget löschen                     |

---

## ☁️ Wetterdaten-API

Kostenlose APIs zur Auswahl:

- [https://open-meteo.com/](https://open-meteo.com/) (kein API-Key nötig)
- [https://openweathermap.org/api](https://openweathermap.org/api) (kostenlos, mit Key)

---

## 🧪 Ziel des Projekts

- Verständnis für API-Design, Next.js-Frontend und Microservice-Architektur
- Umgang mit externen APIs und Caching
- MongoDB-Datenmodellierung
- Trennung von Backend-Logik und Frontend-Komponenten
- saubere Code-Struktur, Modularität und Dokumentation

---

## 📄 Was soll eingereicht werden?

- `README.md` mit:
  - Setup-Anleitung
  - API-Beschreibung
  - Kurzer Architekturüberblick (z. B. mit Text oder Diagramm)

## JSON files used
  All german cities and their coordinates from here
  https://github.com/pensnarik/german-cities/blob/master/germany.json

  images from here based on weather interpretation code
  https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c

## Postman related curls

curl for creating widget

  curl --location 'http://localhost:5000/api/widgets' \
--header 'Content-Type: application/json' \
--data '{
"name": "Berlin",
"location":{
    "latitude": 52.53,
    "longitude" : 13.405
}
}'

curl for get widgets

curl --location 'http://localhost:5000/api/widgets'

curl for delete widgets 

curl --location --request DELETE 'http://localhost:5000/api/widgets/68f40f07fdd54c3263d9f277'


access UI on 

http://localhost:3000/widgets
