# 🌐 Pollify - Frontend

Pollify, kullanıcıların anket oluşturup oy verebildiği bir platformdur. Bu repo, Angular ile geliştirilen **frontend (kullanıcı arayüzü)** kısmını içermektedir.

Kullanıcılar sisteme giriş yapabilir, anket oluşturabilir, diğer kullanıcıların anketlerine oy verebilir ve sonuçları görüntüleyebilir. Admin paneli üzerinden kullanıcı ve anket yönetimi sağlanabilir. Ayrıca sistem, yapay zeka destekli anket sonucu analizi özelliğini de desteklemektedir.

Uygulama mobil uyumludur ve Spring Boot tabanlı backend servisiyle JWT üzerinden güvenli şekilde iletişim kurar.

## 👤 Kullanıcı Özellikleri

- Kayıt olma ve giriş yapma (JWT ile güvenli oturum)
- Anket oluşturma, soru ve seçenek ekleme
- Anketleri listeleme, güncelleme, silme (kendi anketleri)
- Diğer kullanıcıların anketlerine oy verebilme
- Oy sonuçlarını görüntüleme
- Anket sonuçlarını yapay zeka ile analiz ettirme

## 🛡️ Admin Paneli Özellikleri

- Tüm kullanıcıları ve anketleri görüntüleyebilme
- Kullanıcıları ve anketleri silme
- Giriş loglarını izleme
- Anket sonuçlarını yapay zeka ile analiz ettirme

## 🧰 Kullanılan Teknolojiler

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" width="50" alt="Angular"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="50" alt="TypeScript"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="50" alt="HTML5"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="50" alt="CSS3"/>
</p>

- **Angular 18** – Bileşen tabanlı modern frontend framework'ü
- **TypeScript** – JavaScript'e tip desteği getiren üst seviye dil
- **HTML5 & CSS3** – Sayfa yapısı ve stil düzenlemeleri
- **Angular Router** – Sayfa yönlendirme ve guard mekanizması
- **localStorage** – Oturum ve JWT token saklama
- **Standalone Component Yapısı**

  ## 🔧 Uygulamanın Kurulumu ve Çalıştırılması

1. Angular CLI’yi global olarak yükleyin:

npm install -g @angular/cli

2. Depoyu klonlayın:

git clone https://github.com/kullanici-adin/pollify-frontend.git
cd pollify-frontend

3. Proje bağımlılıklarını yükleyin:

npm install

4. Uygulamayı başlatın:

ng serve

Tarayıcıdan şu adrese giderek uygulamayı görüntüleyebilirsiniz:
http://localhost:4200

Not: Uygulamanın doğru çalışabilmesi için backend (http://localhost:8080) çalışır durumda olmalıdır.



## 📁 Proje Klasör Yapısı
```
src/app
│
├── components                   # Uygulamanın ana bileşen klasörü
│   ├── admin                    # Admin paneli (kullanıcı, anket, şikayet, log yönetimi)
│   ├── auth                     # Giriş ve kayıt bileşenleri
│   ├── complaint                # Şikayet oluşturma ve yönetim bileşeni
│   ├── header-navbar            # Navigasyon çubuğu ve üst menü
│   ├── home                     # Hoş geldiniz ve giriş sayfası
│   ├── option-manage            # Anket seçeneği yönetimi
│   ├── poll                     # Anket oluşturma, çözme, detay, sonuç gibi işlemler
│   │   ├── poll-create
│   │   ├── poll-detail
│   │   ├── poll-edit
│   │   ├── poll-result
│   │   ├── poll-solve
│   │   ├── poll-joined
│   │   ├── poll-detailed-result
│   │   ├── poll-ai-analysis
│   │   └── my-pools
│   ├── profile                  # Kullanıcı profil bileşeni
│   └── question-manage          # Soru yönetimi bileşeni
│
├── guards                       # Sayfa koruma mekanizmaları (JWT, Rol)
│   ├── auth.guard.ts
│   └── role.guard.ts
│
├── models                       # Uygulama veri modelleri (interface, enum, vs.)
├── services                     # Backend API ile iletişimi sağlayan servisler
│   ├── auth.service.ts
│   ├── poll.service.ts
│   ├── ai.service.ts
│   ├── user.service.ts
│   └── access-log.service.ts
│
├── app.component.ts/html/css    # Ana uygulama bileşeni
├── app.routes.ts                # Uygulama yönlendirme tanımları (routing)
├── app.config.ts                # Ortak yapılandırma dosyası
├── styles.css                   # Global stiller
```
Bu klasör yapısı, Angular'ın standalone bileşen yapısına ve modüler geliştirme yaklaşımına uygun olarak yapılandırılmıştır. Her klasör, uygulamanın belirli bir sorumluluğunu taşır ve bileşenler, servisler, guard yapıları net şekilde ayrılmıştır. Böylece kod okunabilirliği ve sürdürülebilirliği artırılmıştır.

## 🔐 Kimlik Doğrulama ve Guard Sistemi

Bu projede, JWT (JSON Web Token) kullanılarak güvenli oturum yönetimi yapılmaktadır. Kullanıcı giriş yaptıktan sonra backend tarafından dönen JWT token, `localStorage` içinde saklanır ve tüm API isteklerinde `Authorization` başlığıyla otomatik olarak gönderilir.

### 🧠 AuthService Yapısı

- `login(credentials)` → Giriş işlemi yapar, token alır.
- `logout()` → Token'ı siler, oturumu sonlandırır.
- `getToken()` → localStorage'daki token'ı döner.
- `getUserRole()` → JWT içinden kullanıcı rolünü çözümler.
- `isLoggedIn()` → Kullanıcının giriş yapıp yapmadığını kontrol eder.

### 🛡️ Guard Sistemi

Uygulamada iki farklı Guard yapısı kullanılmaktadır:

- **Auth Guard (`auth.guard.ts`)**  
  Kullanıcının giriş yapıp yapmadığını kontrol eder. Eğer oturum yoksa `welcome` sayfasına yönlendirir.

- **Role Guard (`role.guard.ts`)**  
  Kullanıcının sahip olduğu rolü kontrol eder (`USER`, `ADMIN` vs.). Uyuşmuyorsa yine `welcome` sayfasına yönlendirir.

### 📦 Token Kullanımı

Tüm yetkili isteklerde JWT token şu şekilde header'a eklenir:

```http
Authorization: Bearer <jwt-token>
```
## 🧭 Sayfa Yönlendirme (Routing) Mantığı

Pollify frontend uygulamasında sayfa yönlendirmeleri `app.routes.ts` dosyasında merkezi olarak tanımlanır. Her rota gerektiğinde `AuthGuard` ve `RoleGuard` ile korunur.

### 📌 Örnek Route Tanımı

```ts
 {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [roleGuard(['ADMIN'])]
    }
```



