# Siswa API Spec

## Create Siswa API

Endpoint : POST /api/siswa

Headers :

- Authorization : token

Request Body :

```json
{
  "NISN": "081318251213",
  "Nama": "Reza",
  "JK": "Laki -laki",
  "NIK": "3603051409010001"
}
```

Response Body Succes :

```json
{
  "data": {
    "id": 1,
    "NISN": "081318251213",
    "Nama": "Reza",
    "JK": "Laki -laki",
    "NIK": "3603051409010001"
  }
}
```

Response Body Error :

```json
{
  "errors": "NISN Tidak Terdaftar Di Kemendikbud"
}
```

## Update Siswa API

Endpoint : PUT /api/siswa/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "NISN": "081318251213",
  "Nama": "Reza",
  "JK": "Laki -laki",
  "NIK": "3603051409010001"
}
```

Response Body Succes :

```json
{
  "data": {
    "id": 1,
    "NISN": "081318251213",
    "Nama": "Reza",
    "JK": "Laki -laki",
    "NIK": "3603051409010001"
  }
}
```

Response Body Error :

```json
{
  "errors": "nama salah"
}
```

## Get Siswa API

Endpoint : GET /api/siswa

Headers :

- Authorization : token

Response Body Succes :

```json
{
  "data": {
    "id": 1,
    "NISN": "081318251213",
    "Nama": "Reza",
    "JK": "Laki -laki",
    "NIK": "3603051409010001"
  }
}
```

Response Body Error :

```json
{
  "errors": "siswa tidak ditemukan"
}
```

## Search Siswa API

Endpoint : GET /api/siswa/

Headers :

- Authorization : token

Query Params :

- nama : Search by nama, using like, optional
- NISN : Search by NISN using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Succes :

```json
{
  "data": [
    {
      "id": 1,
      "NISN": "081318251213",
      "Nama": "Reza",
      "JK": "Laki -laki",
      "NIK": "3603051409010001"
    },
    {
      "id": 1,
      "NISN": "081318251213",
      "Nama": "Reza",
      "JK": "Laki -laki",
      "NIK": "3603051409010001"
    }
  ],
  "paging" : {
    "page" : 1,
    "total_page" : 3,
    "total_item" : 10
  }
}
```

Response Body Error :

```json
{
    "errors" : " Item yang di cari tidak ditemukan " 
}
```

## Remove Siswa API

Endpoint : DELETE /api/siswa/:id

Headers :

- Authorization : token

Response Body Succes :

```json
{
  "data": "ok"
}
```

Response Body Error :

```json
{
  "errors": " siswa tidak ditemukan"
}
```
