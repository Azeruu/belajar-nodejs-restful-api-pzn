# Alamat API Spec

## Create Alamat API

Endpoint : POST /api/siswa/:siswaId/alamat

Headers :

- Authorization : token

Request Body :

```json
{
  "nama_jalan": "nama jalannya",
  "no_rumah": "nomor rumah",
  "desa": "nama Desanya",
  "kecamatan": " nama Kecamatan "
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "nama_jalan": "nama jalannya",
    "no_rumah": "nomor rumah",
    "desa": "nama Desanya",
    "kecamatan": " nama Kecamatan "
  }
}
```

Response Body Error :

```json
{
  "errors": "nama jalan harus diisi"
}
```

## Update Alamat API

Endpoint : PUT /api/siswa/:siswaId/alamat/:alamatId

Headers :

- Authorization : token

Request Body :

```json
{
  "nama_jalan": "nama jalannya",
  "no_rumah": "nomor rumah",
  "desa": "nama Desanya",
  "kecamatan": " nama Kecamatan "
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "nama_jalan": "nama jalannya",
    "no_rumah": "nomor rumah",
    "desa": "nama Desanya",
    "kecamatan": " nama Kecamatan "
  }
}
```

Response Body Error :

```json
{
  "errors": "nama jalan dibutuhkan"
}
```

## Get Alamat API

Endpoint : GET /api/siswa/:siswaId/alamat/:alamatId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "nama_jalan": "nama jalannya",
    "no_rumah": "nomor rumah",
    "desa": "nama Desanya",
    "kecamatan": " nama Kecamatan "
  }
}
```

Response Body Error :

```json
{
  "errors": "siswa tidak ditemukan"
}
```

## List Alamat API

Endpoint : GET /api/siswa/:siswaId/alamat

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "nama_jalan": "nama jalannya",
      "no_rumah": "nomor rumah",
      "desa": "nama Desanya",
      "kecamatan": " nama Kecamatan "
    },
    {
      "id": 2,
      "nama_jalan": "nama jalannya",
      "no_rumah": "nomor rumah",
      "desa": "nama Desanya",
      "kecamatan": " nama Kecamatan "
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": " siswa tidak ditemukan "
}
```

## Remove Alamat API

Endpoint : DELETE /api/siswa/:siswaId/alamat/:alamatId

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": " siswa tidak ditemukan"
}
```
