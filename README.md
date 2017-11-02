# School App with Sequelize

> sqlz init

1. Buatlah model baru bernama Teacher dengan field sebagai berikut, lakukan migrasi:
  * first_name : string
  * last_name : string
> sqlz model:create --name Teacher --attributes first_name:string,last_name:string
> sqlz db:migrate

2. Buat migrasi  untuk menambahkan field 'email: string' pada tabel Teachers, jangan lupa untuk memodifikasi model dan lakukan migrasi.
> sqlz migration:create --name add-email-to-Teacher

3. Buat seeder untuk tabel Teachers, lalu lakukan seed.
> sqlz seed:create --name seed-teacher
> sqlz db:seed:all

4. Buat model baru dengan nama Subject, lakukan migrasi.
> sqlz model:create --name Subject --attributes subject_name:string
> sqlz db:migrate

5. Buat seeder untuk tabel Subject, lakukan seed.
> sqlz seed:create --name seed-subject
> sqlz db:seed

6. Buat aplikasi express mvc dengan routing:
  * /teachers - menampilkan semua data teacher
  * /subjects - menampilkan semua data subject

7. Buatlah model baru bernama Student dengan skema:
  * first_name : string
  * last_name : string
  * email: string
> sqlz model:create -- Student -- attributes first_name:string,last_name:string,email:string
> sqlz db:migrate