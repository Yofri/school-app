# School App with Sequelize

`sqlz init`

Buatlah model baru bernama Teacher dengan field sebagai berikut, lakukan migrasi:
  * first_name : string
  * last_name : string

`sqlz model:create --name Teacher --attributes first_name:string,last_name:string`

`sqlz db:migrate`


Buat migrasi  untuk menambahkan field 'email: string' pada tabel Teachers, jangan lupa untuk memodifikasi model dan lakukan migrasi.

`sqlz migration:create --name add-email-to-Teacher`


Buat seeder untuk tabel Teachers, lalu lakukan seed.

`sqlz seed:create --name seed-teacher`

`sqlz db:seed:all`

Buat model baru dengan nama Subject, lakukan migrasi.

`sqlz model:create --name Subject --attributes subject_name:string`

`sqlz db:migrate`

Buat seeder untuk tabel Subject, lakukan seed.

`sqlz seed:create --name seed-subject`
`sqlz db:seed`

Buat aplikasi express mvc dengan routing:
  * /teachers - menampilkan semua data teacher
  * /subjects - menampilkan semua data subject

Buatlah model baru bernama Student dengan skema:
  * first_name : string
  * last_name : string
  * email: string

`sqlz model:create -- Student -- attributes first_name:string,last_name:string,email:string`

`sqlz db:migrate`

Buat aplikasi CRUD untuk tabel Student:
  * GET /students - menampilkan data semua student
  * POST /students/add - handle input dari form
  * GET /students/edit/:id - menampilkan form data student berdasarkan id
  * POST /students/edit/:id - menghandle input dari form saat update
  * GET /students/delete/:id - delete student berdasarkan id

Buatlah validasi model Student sesuai pola email dan tidak boleh duplikat.

Bila input tidak sesuai, munculkan pesan error di halaman web.

Buatlah instance method pada model student dengan nama getFullname yang mengembalikan `first_name` dan `last_name`. Tambahkan kolom `fullname` pada tabel dan gunakan method getFullname untuk mengisi kolom tersebut.

Relasi antara model Subject dan Teacher adalah one Subject has many Teacher. Asosiasikan model Subject dan Teacher dengan menambahkan field pada salah satu model untuk menampung referensi dari model lainnya. lakukan migrasi dan sesuaikan model dengan migrasi yang telah dilakukan.

Buatlah fitur CRUD untuk tabel Teachers. Ikuti bentuk CRUD untuk tabel Students dan samakan pola routing pada Student.

Pada laman yang menampilkan semua data Teacher, munculkan Subject yang ditentukan untuk Teacher tersebut. Bila belum ditentukan, munculkan tulisan 'unassigned'.

Pada route /subjects, tampilkan semua Subject dengan Teacher yang telah di assign untuk subject tersebut. Pada laman /edit Teacher, bila Teacher sudah ditentukan Subjectnya, pastikan Subject tersebut muncul di dropdown pilihan Subject.

Asosiasikan model Student dan model Subject yang relasinya _many-to-many_.