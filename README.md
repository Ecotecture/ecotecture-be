## Backend repository for Ecotecture, Hackfest 2024 project.

--- 

### Deskripsi Aplikasi
Ecotecture adalah sebuah aplikasi yang bertujuan memudahkan pemilik bangunan dan sektor real estate untuk mengurangi emisi karbon bangunan.

### Informasi Tim
Tim terdiri dari 4 anggota yaitu:
- Inaya Rahmanisa
- Maria Aurellia
- Fresty Tania Stearine
- Fahira Adindiah 

### API
- `https://us-central1-ecotecture-9ff06.cloudfunctions.net/api/calculate/`: Api untuk menghitung kalkulasi instalasi panel surya.
  request.body:
  `{
    "solar_hours": [integer],
    "electricity" : [integer],
    "power" : [integer]
}`
contoh response.body:
`{
    "solarArray": "0.00",
    "numPanels": "0",
    "areaOcuppied": "0.00",
    "price": [
        {
            "id": 1,
            "daya": 1300,
            "b_modul": 6818190,
            "b_inverter": 4624840,
            "b_struktur": 1530000,
            "b_aksesoris": 2040000,
            "b_instalsai": 2040000,
            "total": 17053030
        }
    ]
}`
- `https://us-central1-ecotecture-9ff06.cloudfunctions.net/api/renewable/`: Api untuk menghitung kalkulasi rekomendasi sumber daya terbarukan berdasarkan daerah di Indonesia.
  request.body:
  `{
    "id": "11"
  }`
  (id berdasarkan json file)
  contoh response.body:
  {
    "solarHours": 5.5,
    "windStrength": 3,
    "rainPower": "Moderate",
    "renewable_sources": {
        "high_list": [],
        "moderate_list": [
            "Panel Surya",
            "Turbin Angin",
            "Hydroelectric"
        ],
        "low_list": []
    }
}

